<script setup lang="ts">
import Player from './Player.vue'
import Dashboard from './Dashboard.vue'
import { signIn } from '../firebase'
import { ref } from 'vue';

defineProps<{room: string}>()

await signIn();

const isPlayer = ref(false)
const turned = ref(false)
</script>

<template>
    <main>
        <button v-if="!isPlayer" @click="turned = !turned" class="left">
            <span v-if="turned">Hide</span>
            <span v-else>Show</span>
        </button>
        <button v-if="!isPlayer" @click="isPlayer = true" class="right">Join as player</button>
        <Player v-if="isPlayer" :room="room" class="whole" />
        <Dashboard v-else :room="room" :manual-turned="turned" class="whole" />
    </main>
</template>

<style scoped>
main {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.whole {
    grid-column: 1 /-1;
}

.left {
    justify-self: start;
}

.right {
    justify-self: end;
}
</style>