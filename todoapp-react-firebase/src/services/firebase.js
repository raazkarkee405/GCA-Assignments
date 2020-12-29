import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-database'

const config = {
    apiKey: "AIzaSyBP_xpZMnpjTRne1s0ST3S_ln9_TW2W1Ms",
    authDomain: "todoapp-40774.firebaseapp.com",
    projectId: "todoapp-40774",
    storageBucket: "todoapp-40774.appspot.com",
    messagingSenderId: "987776281201",
    appId: "1:987776281201:web:7188ef6e9e9fd3e6a6c9d0",
    measurementId: "G-VTT33RLL06"
  };

  firebase.initializeApp(config);

  export default firebase;