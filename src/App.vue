<template>
  <div class="h-screen bg-indigo-50 overflow-hidden flex">
    <sidebar :playlists="playlists" v-if="isLoggedIn()" />
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import useGetCloudSongs from './composables/useGetCloudSongs'
import useProfile from './composables/useProfile'
import useGetPlaylists from './composables/useGetPlaylists'

export default {
  components: {
    Sidebar,
  },

  setup() {
    const router = useRouter()
    const { getCloudSongs } = useGetCloudSongs()
    const { isLoggedIn } = useProfile()
    const { getMyPlayLists, playlists } = useGetPlaylists()

    // 跳转到第一个歌单页面
    const redirectToFirstPlaylist = playlist => {
      router.push({
        path: `/playlists/${playlist.id}`,
      })
    }

    // 应用初始化后需要加载云盘数据以及歌单
    const bootstrapApp = async () => {
      if (!isLoggedIn()) {
        return
      }
      await getMyPlayLists()
      if (playlists.value.length == 0) {
        return
      }
      await getCloudSongs()
      if (window.location.hash == '#/') {
        redirectToFirstPlaylist(playlists.value[0])
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
