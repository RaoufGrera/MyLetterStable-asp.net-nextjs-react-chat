import React, { useEffect, useState } from 'react';
import { accountService } from 'src/_services';

import { GoogleLogin } from 'react-google-login';
import { initFacebookSdk } from 'src/_helpers';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
//import { signIn, signOut, useSession } from "next-auth/react"

function ShowLogin() {
    const { t } = useTranslation()
    const router = useRouter()
    const [IsEnabled, setIsEnabled] = useState(false);
    useEffect(() => {
        if (accountService.accountValue) {
            router.push("/")
        }
        console.log("Before Facebook Inital")

        initFacebookSdk().then(x => {
            console.log("After Facebook Inital")
        }
        );
    }, []);
    function responseGoogle(response) {
        if (response.accessToken) {
            accountService.loginGoogle(response.accessToken);
        }
    }


    return (
        <div className='container-modal  page-login open '>
            <Head>
                <title>{t('login')}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>



            <section className='px-0'>

                <div className="auth-types">

                    <div className="facebook">
                        <button disabled={IsEnabled ? true : false} onClick={accountService.login}><span><svg className="app-icon external-facebook" viewBox="0 0 96 96"><path d="M86 48C86 27.013 68.987 10 48 10C27.013 10 10 27.013 10 48C10 66.967 23.896 82.688 42.063 85.538V58.984H32.414V48H42.063V39.628C42.063 30.104 47.736 24.844 56.416 24.844C60.573 24.844 64.922 25.586 64.922 25.586V34.938H60.130C55.410 34.938 53.938 37.867 53.938 40.872V48H64.477L62.792 58.984H53.938V85.538C72.104 82.688 86 66.967 86 48Z"></path>
                        </svg>{t('login_facebook')}</span></button>
                        <p className="error"></p>
                    </div>
                    <GoogleLogin
                        clientId="219826411729-5tcdro8a9958r0u9rd14npffv2rckv9k.apps.googleusercontent.com"
                        buttonText={t('login_google')}
                        isSignedIn={false}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}

                    />


                </div>

            </section>




        </div>

    );
}

export default ShowLogin;