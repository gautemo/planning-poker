<script setup lang="ts">
import { ref } from 'vue';

const url = location.hostname
const room = ref(Math.random().toString(36).substring(2, 6))
function create(){
    location.href = `${room.value}/dashboard`
}
function join(){
    location.href = room.value
}
</script>

<template>
    <main>
        <h1>Welcome to Planning Poker</h1>
        <div>
            <label for="room">Room id:</label>
            <div class="input">
                <input type="text" v-model="room" id="room">
                <div class="buttons">
                    <button @click="create">CREATE</button>
                    <button @click="join">JOIN</button>
                </div>
            </div>
        </div>
        <p>Tell every team member to open their browser and go to your room: <b><span>{{url}}/{{room}}</span></b></p>
    </main>
</template>

<style scoped>
main{
    margin: 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.3em;
}

label{
    display: block;
    margin: 2px;
}

.input{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    gap: 15px;
}

.buttons {
    display: flex;
    gap: 15px;
    flex: 1;
}

input, button{
    font-size: 1em;
    flex: 1;
}

button{
    margin: 0;
}
</style>