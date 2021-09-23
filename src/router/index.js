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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
