<script setup lang="ts">
import { computed, ref } from 'vue';
import Switcher from './Switch.vue'

const hiddenEmojis = ['🙈', '🙊', '💤', '🤫', '😑', '😌', '😎'];

defineEmits<{
  (e: 'click'): void
}>()

const props = defineProps<{
  number: string,
  selected?: boolean,
}>()

const hide = ref(false)
const num = computed(() => {
  if (hide.value && props.selected) {
    return hiddenEmojis[Math.floor(Math.random() * hiddenEmojis.length)]
  }
  return props.number
})
</script>

<template>
  <div @click="$emit('click')" class="card">
    <Switcher v-if="selected" v-model="hide" />
    {{ num }}
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
  border: 2px solid black;
  font-size: 3em;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: white;
  color: rgb(29, 29, 29);
  position: relative;
}

.card :deep(.switch) {
  position: absolute;
  top: 15px;
  left: 15px;
}
</style>