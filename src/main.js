// src/main.js
import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible/flexible'; // 移动端适配解决方案
import '@/scss/index.scss' // 引入初始化样式

createApp(App).use(router).use(store).mount('#app')