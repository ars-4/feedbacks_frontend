import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let mainapp = createApp(App)
mainapp.use(router).mount('#app')
