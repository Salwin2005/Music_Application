import { initializeApp } from "firebase/app";

//authentication services from firebase
import { getAuth } from "firebase/auth";

//databasw servises from firebase
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa7n08J1bfMkikKWtgsy-xzt8_hoiYqhs",
  authDomain: "music-application-7b9cc.firebaseapp.com",
  projectId: "music-application-7b9cc",
  storageBucket: "music-application-7b9cc.firebasestorage.app",
  messagingSenderId: "130758534783",
  appId: "1:130758534783:web:f313b920beb46d652c814a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH=getAuth(firebaseApp);
export let __DB=getFirestore(firebaseApp);

export default firebaseApp;
