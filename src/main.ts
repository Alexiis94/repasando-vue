import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import './styles/main.css';
import { setupValidation } from './libs/validation';

const pinia = createPinia();
const app = createApp(App);

setupValidation(); // Principio de Responsabilidad Única: main.ts solo invoca.

app.use(router);
app.use(pinia);
app.mount('#app');
