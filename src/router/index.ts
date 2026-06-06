import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('@/views/games/index.vue')
  },
  {
    path: '/goods-list/:gameId',
    name: 'GoodsList',
    component: () => import('@/views/goods/list.vue')
  },
  {
    path: '/goods-detail/:goodsId',
    name: 'GoodsDetail',
    component: () => import('@/views/goods/detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
