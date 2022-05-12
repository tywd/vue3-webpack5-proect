import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import Home from '../pages/Home.vue';
import Me from '../pages/Me.vue';

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
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;