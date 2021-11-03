import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../Home.vue'),
    },
    {
      path: '/posts/new',
      name: 'newPost',
      component: () => import('../components/NewPost.vue'),
    },
  ],
})
