import { createApp } from 'vue'
import App from './App.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

createApp(App).mount('#app')

useRegisterSW()