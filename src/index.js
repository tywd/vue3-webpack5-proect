// src/index.js
console.log('test webpack')
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import 'lib-flexible/flexible';

createApp(App).use(router).use(store).mount('#app')

