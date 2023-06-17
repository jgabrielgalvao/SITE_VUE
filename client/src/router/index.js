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
    path: '/produto',
    name: 'Produto',
    component: () => import('@/views/Produto.vue'),

  },
  {
    path: '/produto/:id',
    name: 'produto-view',
    component: ProdutoView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
