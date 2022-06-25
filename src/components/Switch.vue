<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean,
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const prefers: boolean = JSON.parse(localStorage.getItem('hide-pref') ?? 'false')
if(prefers !== props.modelValue){
  emit('update:modelValue', prefers)
}

function toggle(checked: boolean){
  localStorage.setItem('hide-pref', checked.toString())
  emit('update:modelValue', checked)
}
</script>

<template>
    <label @click.stop class="switch">
        Hide
        <input 
          type="checkbox" 
          :checked="modelValue" 
          @change="toggle(($event.target as HTMLInputElement).checked)">
        <span class="slider round"></span>
    </label>
</template>

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