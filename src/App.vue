<template>
  <div class="h-screen bg-indigo-50 overflow-hidden flex">
    <sidebar :playlists="playlists" />
    <div class="flex-1 w-0 flex flex-col">
      <main class="flex-1 relative overflow-y-auto focus:outline-none bg-white m-6 p-6 rounded-lg smart-scrollbar">
        <div class="px-4 sm:px-6 md:px-0">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Api from '@/api'
import { useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import useGetCloudSongs from './composables/useGetCloudSongs'

export default {
  components: {
    Sidebar,
  },

  setup() {
    const router = useRouter()
    const { getCloudSongs } = useGetCloudSongs()

    // 我的歌单
    const playlists = ref([])
    const uid = 372063478

    // 获取我的歌单
    const getMyPlayList = async () => {
      const res = await Api.User.getPlaylist({ uid })
      playlists.value = res.playlist.map(o => {
        return {
          id: o.id,
          name: o.name,
          cover_image_url: o.coverImgUrl,
          track_count: o.trackCount,
          current: o.current,
        }
      })
    }

    // 跳转到第一个歌单页面
    const redirectToFirstPlaylist = playlist => {
      router.push({
        path: `/playlists/${playlist.id}`,
      })
    }

    // 应用初始化后需要加载云盘数据以及歌单
    const bootstrapApp = async () => {
      await getMyPlayList()
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
    }
  },
}
</script>
