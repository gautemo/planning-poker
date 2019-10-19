<template>
    <main>
        <button v-if="!player" @click="toggleTurn" class="left">{{turnText}}</button>
        <button v-if="!player" @click="player = true" class="right">Join as player</button>
        <Player v-if="player" :firebase="firebase" :room="room" class="whole"/>
        <Dashboard v-else :cards="playerCards" :turn="turn" class="whole"/>
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
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    this.playerCards.push({id: change.doc.id, ...change.doc.data()});
                }
                if (change.type === "modified") {
                    this.playerCards = this.playerCards.map(c => {
                        if(c.id === change.doc.id){
                            return {id: change.doc.id, ...change.doc.data()}
                        }
                        return c;
                    });
                }
                if (change.type === "removed") {
                    this.playerCards = this.playerCards.filter(c => c.id !== change.doc.id);
                }
            });
        });
    },
    data(){
        return {
            player: false,
            firebase: firebase,
            playerCards: [],
            turn: true,
            turnText: 'Show'
        }
    },
    methods: {
        toggleTurn(){
            this.turn = !this.turn;
            if(this.turn){
                this.turnText = 'Show';
            }else{
                this.turnText = 'Hide';
            }
        }
    },
    components: {
        Player: () => import('@/components/Player'),
        Dashboard: () => import('@/components/Dashboard')
    }
}
</script>

<style scoped>
main{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.whole{
    grid-column: 1 /-1;
}

.left{
    justify-self: start;
}

.right{
    justify-self: end;
}
</style>