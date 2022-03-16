import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAkkmxGzhJJZxYaXjEZhFa6xGPk6RwJIS4",
    authDomain: "lazy-chat-34f69.firebaseapp.com",
    projectId: "lazy-chat-34f69",
    storageBucket: "lazy-chat-34f69.appspot.com",
    messagingSenderId: "187400672593",
    appId: "1:187400672593:web:5a6979e8b80030b5912f70",
    measurementId: "G-THXDZVPLLE"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider, db};