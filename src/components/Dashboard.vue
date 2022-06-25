<script setup lang="ts">
import { computed, ref } from 'vue';
import Card from './Card.vue'
import { db } from '../firebase'
import { onSnapshot, collection } from 'firebase/firestore';

const props = defineProps<{ room: string, manualTurned: boolean }>()

interface PlayerCard { player: string, value: string }

const cards = ref<Map<string, PlayerCard>>(new Map())
onSnapshot(collection(db, 'rooms', props.room, 'players'), snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added' || change.type === 'modified') {
            cards.value.set(change.doc.id, change.doc.data() as PlayerCard)
        }
        if (change.type === 'removed') {
            cards.value.delete(change.doc.id)
        }
    })
})

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

const turned = computed(() => props.manualTurned || (cards.value.size > 0 && [...cards.value.values()].every(c => c.value)))
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

const path = location.host + location.pathname
</script>

<template>
    <div>
        <div class="stats">
            <div class="left" :class="{ hide: !turned }">
                <p>Most voted: <b>{{ most }}</b></p>
                <p>Average: <b>{{ avg }}</b></p>
            </div>
            <div class="right">
                <p>{{ cards.size }} players</p>
                <p>Go to {{ path }} to join</p>
            </div>
        </div>
        <div class="grid">
            <Card v-for="(card, i) in sortedCards" :key="i" :number="card.value" :player="card.player"
                :turned="!turned" />
        </div>
    </div>
</template>

<style scoped>
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
    margin: 0 25px;
}

.stats p {
    margin: 10px 20px 0 0;
}

.left,
.right {
    flex: 1;
}

.stats {
    transition: opacity 1s ease-in-out;
    font-size: 2.5em;
    margin-bottom: 15px;
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