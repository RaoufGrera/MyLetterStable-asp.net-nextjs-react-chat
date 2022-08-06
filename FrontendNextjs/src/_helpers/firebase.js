import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseCloudMessaging = {

  init: async function () {
    const app = initializeApp({
      apiKey: "AIzaSyDi1zLxboQaLQXOMtc_KYT-M0Bd9V_omzI",
      authDomain: "zawaj-337222.firebaseapp.com",
      projectId: "zawaj-337222",
      storageBucket: "zawaj-337222.appspot.com",
      messagingSenderId: "219826411729",
      appId: "1:219826411729:web:d596f1f783d4fa82ea8df0",
      measurementId: "G-X4NPFXYEYR"
    });
    const messaging = getMessaging(app)

    const fetchToken = () => {
      return getToken(messaging, { vapidKey: 'BF3pFz1afVF7txs4-O_sGk2156uOCwRYfIvi1Lu4edxiNuFFr9lph0O6cZS9c_rMTHWltC0-f_Tghu_4wVY80jU' }).then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // setTokenFound(true);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          console.log('No registration token available. Request permission to generate one.');
          //  setTokenFound(false);
          // shows on the UI that permission is required 
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
      });
    }

  }

}
export { firebaseCloudMessaging }

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });