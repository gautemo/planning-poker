<script setup lang="ts">
import { computed, ref } from 'vue';
import { signIn } from '../firebase';
import { enterRoom, cards, clearCards } from '../roomDB';
import DashboardCard from './DashboardCard.vue';
import DashboardKickPlayer from './DashboardKickPlayer.vue';

await signIn();

const props = defineProps<{ room: string }>()

const manuelTurned = ref(false)

enterRoom(props.room)

const sortedCards = computed(() => {
    return [...cards.value.values()].filter(c => c.value).sort((a, b) => {
        if (a.value === b.value) {
            return 0;
        }
        if (a.value === '?') {
            return 1;
        }
        if (b.value === '?') {
            return -1;
        }
        return Number(a.value) - Number(b.value);
    })
})

const turned = computed(() => manuelTurned.value || (cards.value.size > 0 && [...cards.value.values()].every(c => c.value)))
const avg = computed(() => {
    const numbers = [...cards.value.values()].filter(c => c.value !== '' && c.value !== '?').map(c => Number(c.value));
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length
    return parseFloat(avg.toFixed(1));
})
const most = computed(() => {
    let numbers = [...cards.value.values()].filter(c => c.value !== '' && c.value !== '?').map(c => Number(c.value));
    numbers.sort((a, b) => numbers.filter(v => v === b).length - numbers.filter(v => v === a).length);
    let single = [...new Set(numbers)];
    single = single.filter(n => numbers.filter(v => v === numbers[0]).length === numbers.filter(v => v === n).length);
    if (single.length === 1) {
        return single[0];
    }
    return single;
})

const path = `${location.host}/${props.room}`
const joinAsPlayer = () => location.href = `/${props.room}` 

const kicking = ref(false)
</script>

<template>
    <div class="actions">
        <button @click="manuelTurned = !manuelTurned">
            <span v-if="manuelTurned">Hide</span>
            <span v-else>Show</span>
        </button>
        <button @click="clearCards">Clear cards</button>
        <button @click="kicking = !kicking">Kick player</button>
        <button @click="joinAsPlayer">Join as player</button>
    </div>
    <DashboardKickPlayer v-if="kicking" @kicked="kicking = false"/>
    <div class="stats">
        <div :class="{ hide: !turned }">
            <p>Most voted: <b>{{ most }}</b></p>
            <p>Average: <b>{{ avg }}</b></p>
        </div>
        <div class="right">
            <p>{{ cards.size }} players</p>
            <p>Go to {{ path }} to join</p>
        </div>
    </div>
    <div class="grid">
        <DashboardCard 
            v-for="(card, i) in sortedCards" :key="i" 
            :number="card.value" 
            :player="card.player"
            :turned="!turned" 
        />
    </div>
</template>

<style scoped>
button {
    min-width: 100px;
}

.grid {
    margin: 2px 25px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}

.grid :deep(.card) {
    position: absolute;
}

.grid :deep(.back) {
    display: block;
}

.stats {
    display: flex;
    justify-content: space-between;
    font-size: 2.5em;
    margin-bottom: 15px;
}

.stats p {
    margin: 5px 25px;
}

.right {
    text-align: end;
}

.stats > div {
    transition: opacity 0.2s ease-in-out;
}

.hide {
    opacity: 0;
}

.no {
    margin-left: 25px;
}

@media (max-width: 650px) {
    .stats {
        font-size: 1em;
    }
}
</style>