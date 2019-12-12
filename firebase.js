import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCaBK5yrFrfEHV6SzSnLHF5gYSvv9UaZ4w",
  authDomain: "sinotool-3973b.firebaseapp.com",
  databaseURL: "https://sinotool-3973b.firebaseio.com",
  projectId: "sinotool-3973b",
  storageBucket: "sinotool-3973b.appspot.com",
  messagingSenderId: "520865910956",
  appId: "1:520865910956:web:50762910a995aa9d124f09",
  measurementId: "G-86WWLVLCDP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
