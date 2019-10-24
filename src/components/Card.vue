<template>
    <div @click="$emit('click', number)" class="all" :class="{turned: turned}">
        <p v-if="player" :class="{ hide: turned }">{{player}}</p>
        <div class="card front">
            <Switcher v-if="this.selected" v-on:click="hide = $event" storage="hide-pref" label="Hide" />
            {{num}}
        </div>
        <div class="card back"></div>
    </div>
</template>

<script>
const hiddenEmojis = ['🙈', '🙊', '💤', '🤫', '😑', '😌', '😎'];

export default {
    props: ['number', 'player', 'turned', 'selected'],
    data(){
        return{
            hide: false
        }
    },
    computed:{
        num(){
            if(this.hide && this.selected){
                return hiddenEmojis[Math.floor(Math.random()*hiddenEmojis.length)];
            }else{
                return this.number;
            }
        }
    },
    components: {
        Switcher: () => import('@/components/Switch')
    }
}
</script>

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

.card >>> .switch{
    position: absolute;
    top: 15px;
    left: 15px;
}
</style>