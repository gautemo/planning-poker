<template>
    <div @click="$emit('click', number)" class="all" :class="{turned: turned}">
        <p v-if="player" :class="{ hide: turned }">{{player}}</p>
        <div class="card front">
            {{number}}
        </div>
        <div class="card back"></div>
    </div>
</template>

<script>
export default {
    props: ['number', 'player', 'turned']
}
</script>

<style scoped>
.turned{
    transform: rotateY(180deg);
}

.all{
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.card{
    min-height: 35vw;
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
</style>