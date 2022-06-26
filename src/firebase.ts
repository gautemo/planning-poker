import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFqmrdvOrcBu9OaO_64u9ymYchEr5510Y",
  authDomain: "planning-poker-w.firebaseapp.com",
  databaseURL: "https://planning-poker-w.firebaseio.com",
  projectId: "planning-poker-w",
  storageBucket: "planning-poker-w.appspot.com",
  messagingSenderId: "507474016233",
  appId: "1:507474016233:web:4732296a22beba186c7d78",
  measurementId: "G-6T63225PL9"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)

async function signIn(){
  if(!auth.currentUser){
    await signInAnonymously(auth);
  }
}

export { signIn, db }