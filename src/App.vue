<template>
  <div class="h-screen bg-indigo-50 overflow-hidden flex">
    <sidebar :playlists="playlists" />
    <div class="flex-1 w-0 flex flex-col">
      <main class="flex-1 relative overflow-y-auto focus:outline-none bg-white m-6 p-6 rounded-lg">
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
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    Sidebar,
  },
  setup() {
    // 我的歌单
    const playlists = ref([])
    const uid = 372063478

    // 获取我的歌单
    const getMyPlayList = () => {
      Api.User.getPlaylist({
        uid: uid,
      }).then(res => {
        playlists.value = res.playlist.map(o => {
          if (o.name == 'Maple_Joyous喜欢的音乐') {
            o.current = true
          } else {
            o.current = false
          }
          return {
            id: o.id,
            name: o.name,
            cover_image_url: o.coverImgUrl,
            track_count: o.trackCount,
            current: o.current,
          }
        })
      })
    }

    getMyPlayList()

    return {
      getMyPlayList,
      playlists,
    }
  },
}
</script>
