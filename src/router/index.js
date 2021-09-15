import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/playlists/:playlistId',
    name: 'Playlists',
    props: true,
    component: () => import('../views/Playlist.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/upload',
    name: 'FileUpload',
    component: () => import('../views/FileUpload.vue'),
  },
  {
    path: '/home1',
    name: 'Home1',
    component: () => import('../views/Home1.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
