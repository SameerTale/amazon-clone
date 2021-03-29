// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyClVCvY4Mm884WtU_m-lHD4yyLfsXLVhlc",
    authDomain: "challenge-c959f.firebaseapp.com",
    projectId: "challenge-c959f",
    storageBucket: "challenge-c959f.appspot.com",
    messagingSenderId: "542599135121",
    appId: "1:542599135121:web:62d91ad9f575d0424a2430",
    measurementId: "G-H1VQG6VETF"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  export {db, auth};