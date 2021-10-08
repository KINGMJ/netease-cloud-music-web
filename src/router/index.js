import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/playlists/:playlistId',
    name: 'Playlists',
    props: true,
    component: () => import('../views/Playlist.vue'),
  },
  {
    path: '/cloud',
    name: 'Cloud',
    component: () => import('../views/Cloud.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
