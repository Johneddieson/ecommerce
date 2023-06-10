importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');
firebase.initializeApp({
    apiKey: 'AIzaSyCkwW8YBuDVVAVczXR9b4HsITlR17fiU8U',
    authDomain: 'thesisamatugue.firebaseapp.com',
    projectId: 'thesisamatugue',
    storageBucket: 'thesisamatugue.appspot.com',
    messagingSenderId: '412207897516',
    appId: '1:412207897516:web:3f353ca8a23f46df653809',
    measurementId: 'G-949B7C6RY3',
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });