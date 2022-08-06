import localforage from "localforage";
import firebase from "firebase/app";
import "firebase/messaging";

const firebaseCloudMessaging = {
    //checking whether token is available in indexed DB

    //initializing firebase app
    init: async function () {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDi1zLxboQaLQXOMtc_KYT-M0Bd9V_omzI",
                authDomain: "zawaj-337222.firebaseapp.com",
                projectId: "zawaj-337222",
                storageBucket: "zawaj-337222.appspot.com",
                messagingSenderId: "219826411729",
                appId: "1:219826411729:web:d596f1f783d4fa82ea8df0",
                measurementId: "G-X4NPFXYEYR"
            })
            console.log("Firebase")

            try {
                const messaging = firebase.messaging()

                const tokenInLocalForage = await localforage.getItem("fcm_token");
                // const tokenInLocalForage = await this.tokenInlocalforage()
                //if FCM token is already there just return the token
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage
                }
                //requesting notification permission from browser
                const status = await Notification.requestPermission()
                if (status && status === 'granted') {
                    //getting token from FCM
                    const fcm_token = await messaging.getToken({
                        vapidKey: 'BF3pFz1afVF7txs4-O_sGk2156uOCwRYfIvi1Lu4edxiNuFFr9lph0O6cZS9c_rMTHWltC0-f_Tghu_4wVY80jU'
                    })
                    if (fcm_token) {
                        //setting FCM token in indexed db using localforage
                        localforage.setItem('fcm_token', fcm_token)
                        console.log('fcm token', fcm_token)
                        //return the FCM token after saving it
                        return fcm_token
                    }
                }
            } catch (error) {
                console.error(error)
                return null
            }
        }
        console.error("null")
        return null;

    },
}
export { firebaseCloudMessaging }