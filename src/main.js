import './assets/output.css'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'
import "@fontsource/poppins"; 


const app = createApp(App);
app.use(router);
app.mount('#app')
