<template>
  <div>
    Home
    <Room v-if="room" :room="room" />
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    this.room = location.pathname.replace('/', '')
  },
  data(){
    return{
      room: ''
    }
  },
  components: {
    Room: () => import('@/components/Room')
  }
}
</script>

<style>
</style>
