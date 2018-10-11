import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);


const AllContainer = () => import('./views/allcontainer');
const Building = () => import('./views/building');

export const constantRouterMap = [
    {
        path: '/',
        name: '/',
        redirect: {
            name: 'index'
        },
        meta: {
            title: '首页'
        },
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页',
            menu_name: 'index'
        },
        component: AllContainer,
    },
    {
        // 功能开发中
        path: '*',
        name: '404',
        meta: {
            title: '404 功能建设中',
        },
        component: Building,
    },
]


// 路由配置
const RouterConfig = {
    mode: 'history',
    base: '/admin/',
    routes: constantRouterMap
};

export default new VueRouter(RouterConfig);

// // 异步addRouter路由
// export const asyncRouterMap = []