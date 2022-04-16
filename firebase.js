
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDKLVzbIFNaJam7dYo-Y0nLljgyopgyq20",
  
    authDomain: "kuryeapp-423fe.firebaseapp.com",
  
    projectId: "kuryeapp-423fe",
  
    storageBucket: "kuryeapp-423fe.appspot.com",
  
    messagingSenderId: "191243886490",
  
    appId: "1:191243886490:web:6016496e2f1acd473e2423",
  
    measurementId: "G-8HNY3XL9B4",
  };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const firestore = app.firestore();
const auth = firebase.auth();

export { firestore, auth,firebase };