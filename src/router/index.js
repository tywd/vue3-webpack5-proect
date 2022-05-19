import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import Home from '../pages/Home.vue';
import Me from '../pages/Me.vue';
import RedPacketRain from '../pages/RedPacketRain.vue';

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: '首页' }
    },
    {
        path: '/me',
        name: 'Me',
        component: Me
    },
    {
        path: '/RedPacketRain',
        name: 'RedPacketRain',
        component: RedPacketRain
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;