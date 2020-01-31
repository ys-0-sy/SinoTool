import * as firebase from "firebase";
import "firebase/firestore";
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

type Event = {
  id: string;
  endDate: firebase.firestore.Timestamp;
  image: string;
  isGuerrilla: boolean;
  name: string;
  startDate: firebase.firestore.Timestamp;
};

type ErrorObj = {
  err: string;
};

export const fetchDb = async (
  collection: string
): Promise<{ snapshot: Event[] } | ErrorObj> => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection(collection)
      .get();

    let events: Event[] = [];
    snapshot.forEach(event => {
      const newEvent = event.data() as Event;
      events.push({ ...newEvent, id: event.id });
    });
    return {
      snapshot: events
    };
  } catch (err) {
    console.warn("Error getting documents", err);
    throw { err };
  }
};

export const fetchImgUrl = async (
  imgPath: string
): Promise<{ url: string; err?: string }> => {
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
    return { url: cacheUri };
  } catch (err) {
    throw { err };
  }
};
