<script setup lang="ts">
const url = location.hostname
const room = Math.random().toString(36).substring(2, 6)
function go(){
    location.href = room
}
</script>

<template>
    <main>
        <h1>Welcome to Planning Poker</h1>
        <div>
            <p>Create/join room:</p>
            <div class="input">
                <input type="text" v-model="room" @keyup.enter="go">
                <button @click="go">START</button>
            </div>
        </div>
        <p>Tell every team member to open their browser and go to your room: <b><span>{{url}}<i>/your-room</i></span></b></p>
    </main>
</template>

<style scoped>
main{
    margin: 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.3em;
}

p{
    margin: 2px;
}

.input{
    display: flex;
    margin-bottom: 30px;
}

input, button{
    font-size: 1em;
}

button{
    margin: 0 15px;
}

@media (max-width: 650px) { 
  input{
      width: 150px;
  }
}
</style>