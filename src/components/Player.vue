<script setup lang="ts">
import PlayerCard from './PlayerCard.vue'
import { db, signIn } from '../firebase'
import { setDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { ref } from 'vue';
import { PlayerData } from '../types'

const props = defineProps<{ room: string }>()

const selected = ref('')
const name = ref(localStorage.getItem('username') ?? 'Anonym')

await signIn();
const uid = getAuth().currentUser!.uid;
const playerDoc = doc(db, 'rooms', props.room, 'players', uid)
onSnapshot(playerDoc, (doc) => {
    const data = doc.data() as PlayerData
    if(data.value !== selected.value) selected.value = data.value
});

function updateDB() {
  setDoc(playerDoc, { player: name.value, value: selected.value })
}
updateDB()

window.addEventListener('beforeunload', async e => {
  localStorage.setItem('username', name.value);
  await deleteDoc(playerDoc)
});

function setCard(value: string) {
  selected.value = value
  updateDB()
}

function removeCard() {
  selected.value = ''
  updateDB()
}

const options = [
  '0',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '21',
  '40',
  '80',
  '100',
  '?',
]
</script>

<template>
  <section>
    <input type="text" v-model="name" />
    <div v-if="!selected" class="cards">
      <PlayerCard v-for="option of options" :key="option" @click="setCard(option)" :number="option"/>
    </div>
    <div v-else class="selected">
      <div class="content">
        <div class="x" @click="removeCard">X</div>
        <PlayerCard @click="removeCard" :number="selected" :selected="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 15px;
  gap: 5px;
  box-sizing: border-box;
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
}

input {
  box-sizing: border-box;
  font-size: 1.2em;
  padding: 5px;
}

.x {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 1.2rem;
}

.selected {
  height: 100vh;
  background: rgba(128, 128, 128, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  height: 80%;
  width: 80%;
  max-width: 720px;
  display: grid;
  grid-template-rows: auto 1fr;
  font-size: 3em;
}
</style>