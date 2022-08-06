import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter, Router } from 'next/router';
import 'styles/globals.css';
import 'styles/mystyle.css';
import 'react-toastify/dist/ReactToastify.css';

import { PublicNav, Alert, HeaderNav, Footer } from 'components';

import { appWithTranslation } from 'next-i18next'
import { accountService } from '../src/_services/account.service';

import ProgressBar from "@badrap/bar-of-progress";
import getConfig from 'next/config';
import DefaultLayout from 'components/layout/DefaultLayout';
import { alertService } from '/src/_services';
import { ToastContainer } from 'react-toastify';


const { publicRuntimeConfig } = getConfig();



const baseUrl = `${publicRuntimeConfig.imgUrl}`;

export default appWithTranslation(Appr);


const progress = new ProgressBar({
    size: 4,
    color: "#ffca2a ",
    className: "bar-of-progress",
    delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);



function Appr({ Component, pageProps }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [userData, setUserData] = useState(false);

    const [pageTitle, setPageTitle] = useState({ path: "/", name: "main" });

    const { locale } = useRouter();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

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
        path: "/profile/[id]",
        name: "main"
    },

    {
        path: "/login",
        name: "login"
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



        setUserData(accountService.accountValue);


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

    function pageChange(e) {
        const uSession = localStorage.getItem('user');
        console.log("pageChange Apps", uSession)
        const jsonsesson = JSON.parse(uSession)
        if (jsonsesson) {

            setUserData(jsonsesson);
        }
        // setUserData(data)
        //console.log("Form    > ", data);

    }


    function authCheck(newUrl) {
        //const loggedIn = localStorage.getItem("user");
        const url = router.asPath
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/', '/en', '/login'];
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
        const accountValue = accountService.accountValue

        if (accountValue) {
            console.log("stopHubConnection")
            accountService.createHubConnection(accountValue.token);
            return () => { accountService.stopHubConnection(); }

            // accountService.stopHubConnection()


        }
    }, [])
    const PageLayout = Component.PageLayout || DefaultLayout;
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
            </Head>



            <div className="app-container bg-light">
                {userData ? <HeaderNav userData={userData} /> : <PublicNav />}







                <Alert />
                <ToastContainer />

                <PageLayout>
                    {authorized &&

                        <Component title={pageTitle.name} urlImage={baseUrl} pageChange={(e) => { pageChange(e) }}
                            {...pageProps}
                        />

                    }
                </PageLayout>

            </div>

            {/* credits */}
            <div className="text-center mt-4">
                <p>
                    <a href="https://jasonwatmore.com/post/2021/04/20/next-js-10-crud-example-with-react-hook-form" target="_top">Next.js 10 - CRUD Example with React Hook Form</a>
                </p>
                <p>
                    <a href="https://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                </p>
            </div>
            <Footer title={pageTitle.path} />

        </>
    );
}
