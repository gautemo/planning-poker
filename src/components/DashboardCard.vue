<script setup lang="ts">
defineProps<{
    number: string,
    player: string,
    turned: boolean,
}>()
</script>

<template>
    <div class="all" :class="{turned: turned}">
        <p :class="{ hide: turned }">{{player}}</p>
        <div class="card front">
            {{number}}
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
    background: white;
    color: rgb(29, 29, 29);
}

p{
    text-align: center;
    margin: 5px;
    font-size: 1.5em;
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