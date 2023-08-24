// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ProdutoView from '../views/ProdutoView.vue';
import gb from '@/controller/globalVariables';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')

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
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      // Verificar se o usuário está autenticado      
      if (gb.usuarioLogado) {
        next();
      } else {
        alert('você não está logado!');
        next("/login");
      }
    }

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
      next('/login'); // Redirecionar para a página de login se não houver um token válido
  } else {
      next();
  }
});

export default router
