import { onSnapshot, collection, Unsubscribe, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, watch } from "vue";
import { db } from './firebase'
import { PlayerData } from "./types";

const room = ref<string | null>(null)
const cards = ref<Map<string, PlayerData>>(new Map())
let unsubscribeDB: Unsubscribe | null = null

watch(room, () => {
  if (unsubscribeDB) unsubscribeDB()
  if (room.value) {
    unsubscribeDB = onSnapshot(collection(db, 'rooms', room.value, 'players'), snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added' || change.type === 'modified') {
          cards.value.set(change.doc.id, change.doc.data() as PlayerData)
        }
        if (change.type === 'removed') {
          cards.value.delete(change.doc.id)
        }
      })
    })
  }
})

function enterRoom(id: string) {
  room.value = id
}

function clearCards() {
  const roomId = room.value
  if (roomId) {
    cards.value.forEach((_, uid) => {
      updateDoc(doc(db, 'rooms', roomId, 'players', uid), { value: '' })
    })
  }
}

function kickPlayer(uid: string) {
  const roomId = room.value
  if (roomId) {
    deleteDoc(doc(db, 'rooms', roomId, 'players', uid))
  }
}

export { enterRoom, clearCards, cards, kickPlayer }