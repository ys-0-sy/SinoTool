import firebase from "firebase";
import firestore from "@firebase/firestore";
import * as FileSystem from "expo-file-system";

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

export const fetchDb = async collection => {
  return firebase
    .firestore()
    .collection(collection)
    .get()
    .then(snapshot => {
      console.log("get snapshot");
      let events = [];
      snapshot.forEach((event, index) => {
        const newEvent = event.data();
        events.push({ ...newEvent, id: event.id });
      });
      return events;
    })
    .then(snapshot => {
      return { snapshot };
    })
    .catch(err => {
      console.warn("Error getting documents", err);
      return { err };
    });
};

export const fetchImgUrl = async imgPath => {
  try {
    const cacheUri = `${FileSystem.cacheDirectory + imgPath}`;
    const fileInfo = await FileSystem.getInfoAsync(cacheUri);
    if (!fileInfo.exists) {
      const folder = `${FileSystem.cacheDirectory}${imgPath
        .split("/")
        .slice(0, -1)}`;

      const folderInfo = await FileSystem.getInfoAsync(folder);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folder, {
          intermediates: true
        });
      }
      const downloadUrl = await firebase
        .storage()
        .ref()
        .child(imgPath)
        .getDownloadURL();
      await FileSystem.downloadAsync(downloadUrl, cacheUri);
    }
    const url = cacheUri;
    return { url };
  } catch (err) {
    throw { err };
  }
};
