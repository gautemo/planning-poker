<script setup lang="ts">
import Card from './Card.vue'
import { db } from '../firebase'
import { setDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { ref } from 'vue';

const props = defineProps<{ room: string }>()
const selected = ref('')
const name = ref(localStorage.getItem('username') ?? 'Anonym')

function updateDB() {
  const uid = getAuth().currentUser!.uid;
  setDoc(doc(db, 'rooms', props.room, 'players', uid), { player: name.value, value: selected.value })
}
updateDB()

window.addEventListener('beforeunload', async e => {
  localStorage.setItem('username', name.value);
  const uid = getAuth().currentUser!.uid;
  await deleteDoc(doc(db, 'rooms', props.room, 'players', uid))
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
  <div>
    <input type="text" v-model="name" />
    <div v-if="!selected" class="cards">
      <Card v-for="option of options" :key="option" @click="setCard(option)" :number="option"/>
    </div>
    <div v-else class="sel">
      <div class="x" @click="removeCard">X</div>
      <Card @click="removeCard" :number="selected" :selected="true" />
    </div>
  </div>
</template>

<style scoped>
.cards {
  margin: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

input {
  width: calc(100% - 10px);
  margin: 5px;
  box-sizing: border-box;
  font-size: 1.2em;
  padding: 5px;
}

.x {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  width: 80vw;
}

.sel {
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

.sel :deep(.card) {
  width: 80vw;
  font-size: 8em;
}

.sel :deep(.all) {
  height: 80vh;
}

@media (min-width: 1000px) {
  .cards {
    margin: 10px 400px;
  }

  .cards :deep(.card) {
    min-height: 200px;
  }

  .sel :deep(.card) {
    width: 40vw;
  }

  .x {
    width: 40vw;
  }
}
</style>