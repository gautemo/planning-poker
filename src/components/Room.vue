<template>
    <main>
        <button @click="player = true">Join as player</button>
        <Player v-if="player" :firebase="firebase" :room="room"/>
        <Dashboard v-else />
    </main>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default {
    props: ['room'],
    async created(){
        await firebase.auth().signInAnonymously();
        const db = firebase.firestore();
        db.collection("rooms").doc(this.room).collection('players')
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log("New", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed", change.doc.data());
                }
            });
        });
    },
    data(){
        return {
            player: false,
            firebase: firebase
        }
    },
    components: {
        Player: () => import('@/components/Player'),
        Dashboard: () => import('@/components/Dashboard')
    }
}
</script>