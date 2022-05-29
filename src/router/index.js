import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
const commonRoutes = [{
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: "/:catchAll(.*)",
    name: 'Error404',
    component: () => import('pages/common/404.vue'),
}]
const globalRoutes = [{
        path: '/',
        name: 'Main',
        component: () => import('pages/common/Main.vue'),
        redirect: '/home',
        children: [{
                path: '/home',
                name: 'Home',
                component: () => import('pages/Home.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/me',
                name: 'Me',
                component: () => import('pages/Me.vue'),
            },
        ]
    },
    {
        path: '/RedPacketRain',
        name: 'RedPacketRain',
        component: () => import('pages/RedPacketRain.vue'),
    }
]
const routes = globalRoutes.concat(commonRoutes)
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;

// const _import = path => () => import(path)
// // const _import = file => require(file)

// const commonRoutes = [{
//     // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
//     path: "/:catchAll(.*)",
//     name: 'Error404',
//     component: _import('pages/common/404.vue')
// }]

// const globalRoutes = [{
//         path: '/',
//         name: 'Main',
//         component: Main,
//         children: [{
//                 path: '/home',
//                 name: 'Home',
//                 component: _import('pages/Home.vue'),
//                 meta: {
//                     title: '首页'
//                 }
//             },
//             {
//                 path: '/me',
//                 name: 'Me',
//                 component: _import('pages/Me.vue'),
//             },
//         ]
//     },
//     {
//         path: '/RedPacketRain',
//         name: 'RedPacketRain',
//         component: _import('pages/RedPacketRain.vue')
//     }
// ]

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes
// })