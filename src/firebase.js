import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import {getFirestore,collection,addDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDLsPKe5n5XmGBfIBbtxAcOiSBv3bGkL6w",
  authDomain: "todo-with-react-2a200.firebaseapp.com",
  projectId: "todo-with-react-2a200",
  storageBucket: "todo-with-react-2a200.appspot.com",
  messagingSenderId: "378810723586",
  appId: "1:378810723586:web:6ddcd0d9508c916a30a61b",
  measurementId: "G-MV734D50ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getStorage,
  ref,
  uploadBytes,
  app,
  getDownloadURL,
  db,
  addDoc,
  collection,
  signInWithEmailAndPassword,
};
