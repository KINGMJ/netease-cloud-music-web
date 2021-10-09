import { createRouter, createWebHashHistory } from 'vue-router'
import useProfile from '../composables/useProfile'

const { isLoggedIn } = useProfile()

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
    beforeEnter: (_to, _from) => {
      if (isLoggedIn()) {
        router.push('/')
      }
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 除了Login之外的所有路由需判断用户是否登录，如果没有登录，重定向到登录页面
router.beforeEach((to, from) => {
  if (to.path == '/login' || from.path == '/login') {
    return
  }
  if (!isLoggedIn()) {
    router.push('/login')
  }
})

export default router
