<script setup lang="ts">
import Room from './components/Room.vue'
import Info from './components/Info.vue'

const room = location.pathname.replace('/', '')
</script>

<template>
  <div>
    <Suspense>
      <Room v-if="room" :room="room" />
      <Info v-else />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

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
