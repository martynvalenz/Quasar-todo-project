// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBx6dwVnmuxQ-Lj5LzzNCHrAqgQRUMRvPk",
  authDomain: "awesome-todo-f6af8.firebaseapp.com",
  databaseURL: "https://awesome-todo-f6af8.firebaseio.com",
  projectId: "awesome-todo-f6af8",
  storageBucket: "awesome-todo-f6af8.appspot.com",
  messagingSenderId: "897843524243",
  appId: "1:897843524243:web:78d4a8f1672ff9af9ad366",
  measurementId: "G-WY10HNM04Z"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDB = firebaseApp.database()
export {firebaseAuth, firebaseDB}
// firebase.analytics();