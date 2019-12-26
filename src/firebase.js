import { put, call, takeEvery } from "redux-saga/effects";

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
      return { snapshot };
    })
    .catch(err => {
      console.log("Error getting documents", err);
      return { err };
    });
};

function* fetchEvents(action) {
  const { snapshot, err } = yield call(fetchDb, "events");
  if (snapshot) {
    yield* snapshot.forEach(function*(event) {
      const newEvent = event.data();
      newEvent.endDate = new Date(event.data().endDate.seconds * 1000);
      yield put({ type: "SET_EVENT", event: newEvent });
    });
  } else {
    console.log(err);
  }
}

function* mySaga() {
  yield takeEvery("FETCH_EVENTS", fetchEvents);
}

export default mySaga;
