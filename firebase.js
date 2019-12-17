import { Platform } from "react-native";
import firebase from "react-native-firebase";

const iosConfig = {
  clientId:
    "520865910956-90kvvf9ghn22hnvlo3jdnc88sdh16gg6.apps.googleusercontent.com",
  appId: "x",
  apiKey: "AIzaSyAdtuSGu4KHztaqskP_84bMEeUG-ytGEt0",
  databaseURL: "https://sinotool-3973b.firebaseio.com",
  storageBucket: "sinotool-3973b.appspot.com",
  messagingSenderId: "520865910956",
  projectId: "sinotool-3973b",

  // enable persistence by adding the below flag
  persistence: true
};

const androidConfig = {
  clientId: "x",
  appId: "x",
  apiKey: "x",
  databaseURL: "x",
  storageBucket: "x",
  messagingSenderId: "x",
  projectId: "x",

  // enable persistence by adding the below flag
  persistence: true
};

const SinoToolApp = firebase.initializeApp(
  // use platform specific firebase config
  Platform.OS === "ios" ? iosConfig : androidConfig,
  // name of this app
  "SinoTool"
);

export default firebase;
