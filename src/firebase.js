import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArRqGTcf4j2KxZRkMQG6IXXi32h_ofd_E",
    authDomain: "bt3103-week-6-cc3b9.firebaseapp.com",
    projectId: "bt3103-week-6-cc3b9",
    storageBucket: "bt3103-week-6-cc3b9.appspot.com",
    messagingSenderId: "92934382962",
    appId: "1:92934382962:web:bb3fc34f0b4ffa20b2a9eb",
    measurementId: "G-1MN4RCE0GC"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;