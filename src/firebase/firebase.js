import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyARobhfa0SdCRqlsvfQStmbTqLlmmM2wnU",
  authDomain: "adotape-1a51a.firebaseapp.com",
  projectId: "adotape-1a51a",
  storageBucket: "adotape-1a51a.appspot.com",
  messagingSenderId: "725422321191",
  appId: "1:725422321191:web:edbc2fe3f38077b3d5a802"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);