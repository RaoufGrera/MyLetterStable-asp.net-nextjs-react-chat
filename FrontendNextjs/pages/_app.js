import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter, Router } from 'next/router';
import 'styles/globals.css';
import 'styles/mystyle.css';
import 'react-toastify/dist/ReactToastify.css';
//import { firebaseCloudMessaging, onMessageListener } from '../src/_helpers/firebase';

import { PublicNav, Alert, HeaderNav, Footer } from 'components';

import { appWithTranslation } from 'next-i18next'
import { accountService } from '../src/_services/account.service';

import ProgressBar from "@badrap/bar-of-progress";
import getConfig from 'next/config';
import DefaultLayout from 'components/layout/DefaultLayout';
import { alertService } from '/src/_services';
import { ToastContainer } from 'react-toastify';
import useFirebaseMessaging from '../hooks/useFirebaseMessaging';


const { publicRuntimeConfig } = getConfig();



const baseUrl = `${publicRuntimeConfig.imgUrl}`;

if (process.env.NODE_ENV === 'production') console.log = function () { };


const progress = new ProgressBar({
    size: 4,
    color: "#ffca2a ",
    className: "bar-of-progress",
    delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);



const App = ({ Component, pageProps }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [userData, setUserData] = useState(null);

    const tit = "nonn"
    const [pageTitle, setPageTitle] = useState({ path: "/", name: "main" });
    const [account, setAccount] = useState(null)
    const { locale } = useRouter();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [isTokenFound, setTokenFound] = useState(false);

    useFirebaseMessaging()

    const updateMsg = () => {


        onMessageListener().then(payload => {
            setNotification({ title: payload.notification.title, body: payload.notification.body })
            //  setShow(true);

            toast.info(payload.notification.title, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
            console.log(payload);
        }).catch(err => console.log('failed: ', err));
    }

    const onShowNotificationClicked = () => {
        setNotification({ title: "Notification", body: "This is a test notification" })
        // setShow(true);
    }
    const routeNames = [{
        path: "/edit",
        name: "edit"
    },
    {
        path: "/en",
        name: "main"
    },
    {
        path: "/",
        name: "main"
    },
    {
        path: "/privacy",
        name: "Privacy"
    },

    {
        path: "/profile/[id]",
        name: "main"
    },

    {
        path: "/login",
        name: "login"
    },
    {
        path: "/box",
        name: "Box"
    },
    {
        path: "/chat",
        name: "Chat"
    },
    {
        path: "/chat/[id]",
        name: "Messages"
    },

    {
        path: "/users",
        name: "Users"
    },

    ];


    useEffect(() => {
        // updateMsg()
        // subscribe to home component messages
        const subscription = accountService.account.subscribe(p => setUserData(p));
        // return unsubscribe method to execute when component unmounts

        return () => {
            subscription.unsubscribe;
        }
    }, []);



    useEffect(() => {


        if (accountService.accountValue) {
            if (accountService.accountValue.gender == null)
                router.push("/complete")
        }


        authCheck(router.pathname);

        //fillPath(router.asPath);
        // set authorized to false to hide page content while changing routes
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // run auth check on route change
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
            // subscription.unsubscribe();

        }


    }, [router.events]);



    useEffect(() => {
        document.documentElement.dir = dir;
    }, [dir]);




    function authCheck(newUrl) {
        //const loggedIn = localStorage.getItem("user");
        const url = router.asPath
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/', '/en', '/login', '/privacy', '/test'];
        //const arr = arr.map(function(e) {return router.locale + e});



        // new url
        let newPath = newUrl.split('?')[0];

        const regex = /\en\/|\bar\//; //  const regex =/\/en|\/ar/;  // delete en/ or ar/ from path 

        newPath = newPath.replace(regex, '')
        console.log("newPath", newPath)



        //end new url

        let path = url.split('?')[0];

        //const regex =  /\en\/|\bar\//; //  const regex =/\/en|\/ar/;  // delete en/ or ar/ from path 

        path = path.replace(regex, '')
        console.log("old path", path)

        console.log("routeNames", routeNames)
        const objPage = Object.assign({}, routeNames.find(vendor => vendor.path === path));
        console.log("objPage", objPage);
        console.log("pageTitle", pageTitle);
        const { id } = router.query
        if (objPage) {
            objPage.path = newPath
        }
        if (id) {

            objPage.path = path
            console.log("objPage.path === newPath", objPage);

        }
        console.log("after objPage", objPage);
        setPageTitle(objPage);


        //let pageTitle = objPage.name;
        // console.log(magenicVendors.name)

        console.log("accountService  accountValue", accountService.accountValue);
        const loggedIn = accountService.accountValue
        if (!loggedIn && !publicPaths.includes(path)) {//!loggedIn &&
            setAuthorized(false);
            router.push('/', null, { shallow: true })

        } else {
            setAuthorized(true);
        }
    }

    useEffect(() => {
        console.log("UserData S", userData)


        if (accountService.accountValue) {
            console.log("stopHubConnection")
            accountService.createHubConnection(accountService.accountValue.token);
            const uSession = JSON.parse(localStorage.getItem('user'));

            accountService.redis().then(p => {
                if (p.likes) {
                    uSession.likes = p.likes;
                    uSession.messsages = p.messsages;

                    accountService.updateAccount(uSession)
                }
                // pageChange();
            })

            return () => { accountService.stopHubConnection(); }

            // accountService.stopHubConnection()


        }
    }, [])
    const PageLayout = Component.PageLayout || DefaultLayout;
    return (
        <>


            <div className="app-container bg-light">


                {!accountService.accountValue && !userData ?
                    <PublicNav />
                    : userData && <HeaderNav userData={userData} />
                }



                <Alert />
                <ToastContainer
                    position="bottom-center"
                    autoClose={1200}
                    hideProgressBar={true}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <PageLayout>
                    {authorized &&

                        <Component title={pageTitle.name} urlImage={baseUrl}
                            {...pageProps}
                        />

                    }
                </PageLayout>

            </div>





        </>
    );

    // <Footer title={pageTitle.path} />
}
export default appWithTranslation(App);
