<template>
    <label @click.stop="$emit('toggle')" class="switch">
        <label for="switch">{{label}}</label>
        <input id="switch" type="checkbox" v-model="checked">
        <span class="slider round"></span>
    </label>
</template>

<script>
export default {
    props: ['storage', 'label'],
    created(){
        const pref = JSON.parse(localStorage.getItem(this.storage));
        if(pref){
            this.checked = pref;
            this.$emit('click', pref);
        }
    },
    data(){
        return {
            checked: false
        }
    },
    watch: {
        checked: function(newVal){
            localStorage.setItem(this.storage, newVal);
            this.$emit('click', newVal);
        }
    }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: relative;
  cursor: pointer;
  height: 34px;
  width: 60px;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #00312b;
}

input:focus + .slider {
  box-shadow: 0 0 1px #00312b;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>