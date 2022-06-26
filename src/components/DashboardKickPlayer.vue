<script setup lang="ts">
import { computed } from 'vue';
import { cards, kickPlayer } from '../roomDB';

const emit = defineEmits<{
  (e: 'kicked'): void
}>()

const players = computed(() => {
  return [...cards.value.entries()].map(([uid, data]) => ({ uid, name: data.player}))
})

function kick(uid: string){
  kickPlayer(uid)
  emit('kicked')
}
</script>

<template>
  <section>
    Kick:
    <ul>
      <li v-for="player of players" :key="player.uid">
        <button @click="kick(player.uid)">{{player.name}}</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  margin: 0 25px;
  gap: 10px;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

button {
  margin: 0;
}

button:hover {
  color: white;
  background-color: #b30101;
}
</style>