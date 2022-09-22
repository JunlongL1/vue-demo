import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  // { path: '/', component: () => import('../App.vue') },
  { path: '/', component: () => import('../views/main/index.vue') },
  { path: '/line', component: () => import('../views/main/line.vue') },
  { path: '/bar', component: () => import('../views/main/bar.vue') },
  { path: '/form', component: () => import('../views/main/form.vue')},
  { path: '/words', component: () => import('../views/main/words.vue')},
  { path: '/graph', component: () => import('../views/main/graph.vue')}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router