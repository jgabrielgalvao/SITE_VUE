// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ProdutoView from '../views/ProdutoView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),

  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: () => import('@/views/Home.vue'),

  },
  {
    path: '/produto',
    name: 'Produto',
    component: () => import('@/views/Produto.vue'),

  },
  {
    path: '/produto/:id',
    name: 'produto-view',
    component: ProdutoView,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginCad.vue'),

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
