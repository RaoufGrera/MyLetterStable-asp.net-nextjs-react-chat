
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


self.addEventListener('notificationclick', function (event) {
  console.log("notificationclick", event.notification.data.FCM_MSG.data)
  let url = event.notification.data.FCM_MSG.data.pathname;
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDi1zLxboQaLQXOMtc_KYT-M0Bd9V_omzI",
    authDomain: "zawaj-337222.firebaseapp.com",
    projectId: "zawaj-337222",
    storageBucket: "zawaj-337222.appspot.com",
    messagingSenderId: "219826411729",
    appId: "1:219826411729:web:d596f1f783d4fa82ea8df0",
    measurementId: "G-X4NPFXYEYR"
  });

  const messaging = firebase.messaging();

  //background notifications will be received here
  messaging.setBackgroundMessageHandler((payload) =>
    console.log('payload', payload));


  messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

  });
  messaging.onnotificationclick = function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow('/');
    }));
  };
  //Code for adding event on click of notification


}
