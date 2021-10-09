<template>
  <div class="h-screen bg-indigo-50 overflow-hidden flex">
    <sidebar :playlists="playlists" v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import useGetCloudSongs from './composables/useGetCloudSongs'
import useGetPlaylists from './composables/useGetPlaylists'
import useLoginStatus from './composables/useLoginStatus'
import { useRouter } from 'vue-router'

export default {
  components: {
    Sidebar,
  },

  setup() {
    const { getCloudSongs } = useGetCloudSongs()
    const { getMyPlayLists, playlists } = useGetPlaylists()
    const { isLoggedIn } = useLoginStatus()
    const router = useRouter()

    // 应用初始化后需要加载云盘数据以及歌单
    const bootstrapApp = async () => {
      if (!isLoggedIn.value) {
        return
      }

      await getMyPlayLists()
      await getCloudSongs()

      const hash = window.location.hash

      // 非歌单和云盘页面，都要跳转到第一个歌单页面
      if (!~hash.indexOf('#/playlists') && hash !== '#/cloud') {
        router.push({
          path: `/playlists/${playlists.value[0].id}`,
        })
      }
    }

    bootstrapApp()

    return {
      playlists,
      isLoggedIn,
    }
  },
}
</script>
