import { accountService } from '../_services';

const facebookAppId = 527949172355502;// process.env.facebook;

export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v13.0'
            });

            // auto authenticate with the api if already logged in with facebook
            /*     window.FB.getLoginStatus(({ authResponse }) => {
                     console.log("authResponse"); console.log(authResponse);
                     if (authResponse) {
                         //    accountService.loginFacebook(authResponse.accessToken).then(resolve);
                     } else {
                         resolve();
                     }
                 });*/

            resolve();
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}