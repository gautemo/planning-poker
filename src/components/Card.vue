<script setup lang="ts">
import { computed, ref } from 'vue';
import Switcher from './Switch.vue'

const hiddenEmojis = ['🙈', '🙊', '💤', '🤫', '😑', '😌', '😎'];

defineEmits<{
  (e: 'click'): void
}>()

const props = defineProps<{
    number: string,
    player?: string,
    turned?: boolean,
    selected?: boolean,
}>()

const hide = ref(false)
const num = computed(() => {
    if(hide.value && props.selected){
        return hiddenEmojis[Math.floor(Math.random()*hiddenEmojis.length)]
    }
    return props.number
})
</script>

<template>
    <div @click="$emit('click')" class="all" :class="{turned: turned}">
        <p v-if="player" :class="{ hide: turned }">{{player}}</p>
        <div class="card front">
            <Switcher v-if="selected" v-model="hide" />
            {{num}}
        </div>
        <div class="card back"></div>
    </div>
</template>

<style scoped>
.turned{
    transform: rotateY(180deg);
}

.all{
    transition: transform 0.6s;
    transform-style: preserve-3d;
    height: 20vh;
}

.card{
    height: calc(100% - 30px);
    width: 100%;
    border-radius: 10px;
    border: 2px solid black;
    backface-visibility: hidden;
}

.back{
    transform: rotateY(180deg);
    background-color:#17BEBB;
    display: none;
}

.front{
    font-size: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: white;
}

p{
    text-align: center;
    margin: 5px;
    font-size: 1.5em;
    color: white;
    font-weight: bold;
    transition: opacity 1s ease-in-out;
}

.hide{
    opacity: 0;
}

.card :deep(.switch){
    position: absolute;
    top: 15px;
    left: 15px;
}
</style>