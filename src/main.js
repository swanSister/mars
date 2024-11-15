import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import './assets/fontello.css'
import Datepicker from "vue3-datepicker";
import mitt from 'mitt'
import VueCryptojs from 'vue-cryptojs'
import router from './router'

const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.component('Datepicker', Datepicker)
app.use(router,VueCryptojs).mount('#app')
