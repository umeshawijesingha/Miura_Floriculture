import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq_RLB1dHDT2Yjt_gyI4652nMunvZKY88",
  authDomain: "miura-flora.firebaseapp.com",
  projectId: "miura-flora",
  storageBucket: "miura-flora.appspot.com",
  messagingSenderId: "1082267921479",
  appId: "1:1082267921479:web:38bbb222088518be8d9562",
  measurementId: "G-28HNTRFFNN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default app;
export { db }