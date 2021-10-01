import firebase from "firebase";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyDI7daEnaggwnYWya0qljarhooNi2C-4lE",
  authDomain: "catalog-electronic-29a46.firebaseapp.com",
  projectId: "catalog-electronic-29a46",
  storageBucket: "catalog-electronic-29a46.appspot.com",
  messagingSenderId: "554658104955",
  appId: "1:554658104955:web:2ac5da0f41d41b237344de",
  measurementId: "G-R0STJQ30LH",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
