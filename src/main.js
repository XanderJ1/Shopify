import './assets/output.css'
import router from './router'
import { createPinia } from 'pinia';
import 'primeicons/primeicons.css';


import { createApp } from 'vue'
import App from './App.vue'
import "@fontsource/poppins"; 

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app')
