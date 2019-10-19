<template>
  <div>
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
      <div class="x" @click="removeCard">X</div>
      <Card @click="removeCard" :number="selected" />
    </div>
  </div>
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
  created(){
      this.updateDB();
      const username = localStorage.getItem('username');
      if(username){
        this.name = username;
      }
      window.addEventListener('beforeunload', async e => {
        localStorage.setItem('username', this.name);
        const db = this.firebase.firestore();
        const uid = this.firebase.auth().currentUser.uid;
        await db.collection("rooms").doc(this.room).collection('players').doc(uid).delete();
      });
  },
  methods: {
    setCard(value) {
      this.selected = value;
      this.updateDB();
    },
    removeCard() {
      this.selected = '';
      this.updateDB();
    },
    async updateDB(){
      const db = this.firebase.firestore();
      const uid = this.firebase.auth().currentUser.uid;
      db.collection("rooms").doc(this.room).collection('players').doc(uid).set({player: this.name, value: this.selected});
    }
  },
  components: {
    Card: () => import('@/components/Card')
  }
}
</script>

<style scoped>
.cards {
  margin: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

input{
  width: calc(100% - 10px);
  margin: 5px;
  box-sizing: border-box;
  font-size: 1.2em;
  padding: 5px;
}

.x{
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  width: 80vw;
}

.sel{
  height: 100vh;
  background: rgba(128, 128, 128, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sel >>> .card{
  height: 80vh;
  width: 80vw;
  font-size: 8em;
}

@media (min-width: 1000px) { 
  .cards{
    margin: 10px 400px;
  }

  .cards >>> .card{
    min-height: 200px;
  }

  .sel >>> .card{
    width: 40vw;
  }

  .x{
    width: 40vw;
  }
}
</style>