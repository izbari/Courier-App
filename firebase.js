
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyA-e91uvT1QujmKBmCNpsZcqOow_zA5kcg",

  authDomain: "kuryepp.firebaseapp.com",

  projectId: "kuryepp",

  storageBucket: "kuryepp.appspot.com",

  messagingSenderId: "506334613063",

  appId: "1:506334613063:web:b22e9e5afd877fb6202b62",

  measurementId: "G-3RRJBXPVP5"

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