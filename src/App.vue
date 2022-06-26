<script setup lang="ts">
import Info from './components/Info.vue'
import Dashboard from './components/Dashboard.vue';
import Player from './components/Player.vue';

const [room, isDashboard] = location.pathname.replace('/', '').split('/')
</script>

<template>
    <Suspense>
      <Dashboard v-if="isDashboard" :room="room"/>
      <Player v-else-if="room" :room="room"/>
      <Info v-else />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

html, body, #app {
  height: 100%;
}

body {
  margin: 0;
  background-image: linear-gradient(90deg, #00312b 10%, #001714 100%);
  color: white;
  font-family: 'Nunito', sans-serif;
}

button {
  display: inline-block;
  padding: 0.5em 1.5em;
  border: 0.1em solid #FFFFFF;
  margin: 20px 25px 5px 25px;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #FFFFFF;
  text-align: center;
  background: transparent;
  transition: all 0.2s;
  cursor: pointer;
}

button:hover {
  color: #000000;
  background-color: #FFFFFF;
}

button,
input {
  font-family: inherit;
}
</style>
