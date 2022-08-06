import { useEffect } from "react";
import firebase from "firebase/app";
import 'firebase/messaging';

import { firebaseCloudMessaging } from "../webPush";
import { toast } from "react-toastify";

const useFirebaseMessaging = () => {
  useEffect(() => {
    const setToken = async () => {
      try {
        const token = await firebaseCloudMessaging.init() || "";
        if (token) {
          getMessage(token);
          console.log("token", token);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getMessage = () => {
      // console.log('Token: ', token)

      const messaging = firebase.messaging();
      messaging.onMessage((message) => {
        console.log("foreground", message)
        toast.info(message.notification.title, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

        });
      });
    };



    setToken();
  }, []);
};
export default useFirebaseMessaging;
