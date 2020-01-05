import { put, call, take } from "redux-saga/effects";

import firebase from "firebase";
import firestore from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaBK5yrFrfEHV6SzSnLHF5gYSvv9UaZ4w",
  authDomain: "sinotool-3973b.firebaseapp.com",
  databaseURL: "https://sinotool-3973b.firebaseio.com",
  projectId: "sinotool-3973b",
  storageBucket: "sinotool-3973b.appspot.com",
  messagingSenderId: "520865910956",
  appId: "1:520865910956:web:004ed1a141a3b273124f09",
  measurementId: "G-XNNMMNP599"
};

firebase.initializeApp(firebaseConfig);

fetchDb = collection => {
  firebase
    .firestore()
    .collection(collection)
    .get()
    .then(snapshot => {
      console.log("get snapshot");
      snapshot.map(event => {
        const newEvent = event.data();
        newEvent.endDate = new Date(event.data().endDate.seconds * 1000);
        return newEvent;
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      return { err };
    });
};
