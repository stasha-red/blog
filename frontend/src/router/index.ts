import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/users',
      component: () => import('../views/UsersView.vue'),
      meta: {
        requireAdmin: true,
      },
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/post',
      component: () => import('../views/NewArticleView.vue'),
      meta: {
        requireAdmin: true,
      },
    },
    {
      path: '/post/:id',
      component: () => import('../views/ArticleView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
