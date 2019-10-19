<template>
  <main>
    <input type="text" v-model="name" />
    <div v-if="!selected" class="cards">
      <Card v-on:click="setCard($event)" number="0" />
      <Card v-on:click="setCard($event)" number="1" />
      <Card v-on:click="setCard($event)" number="2" />
      <Card v-on:click="setCard($event)" number="3" />
      <Card v-on:click="setCard($event)" number="5" />
      <Card v-on:click="setCard($event)" number="8" />
      <Card v-on:click="setCard($event)" number="13" />
      <Card v-on:click="setCard($event)" number="21" />
      <Card v-on:click="setCard($event)" number="40" />
      <Card v-on:click="setCard($event)" number="80" />
      <Card v-on:click="setCard($event)" number="100" />
      <Card v-on:click="setCard($event)" number="?" />
    </div>
    <div v-else class="sel">
      <div @click="removeCard">X</div>
      <Card @click="removeCard" :number="selected" />
    </div>
  </main>
</template>

<script>
export default {
  props: ['firebase', 'room'],
  data() {
    return {
      name: 'Anonym',
      selected: ''
    }
  },
  methods: {
    async setCard(value) {
      this.selected = value;
      const db = this.firebase.firestore();
      const uid = this.firebase.auth().currentUser.uid;
      db.collection("rooms").doc(this.room).collection('players').doc(uid).set({value: value});
    },
    async removeCard() {
      this.selected = ''
      db.collection("rooms").doc(this.room).collection('players').doc(uid).set({value: ''});
    }
  },
  components: {
    Card: () => import('@/components/Card')
  }
}
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>