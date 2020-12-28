import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "krissstream-4cf1a.firebaseapp.com",
  projectId: "krissstream-4cf1a",
  storageBucket: "krissstream-4cf1a.appspot.com",
  messagingSenderId: "321444258567",
  appId: "1:321444258567:web:dc38696d95838b96ea9ba2",
  measurementId: "G-7FXRKR0S08",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
