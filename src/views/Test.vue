<template>
  <input type="text" placeholder="云盘歌曲id" class="border rounded px-2 py-1 my-4 block" v-model="cloudSongId" />
  <input type="text" placeholder="歌单歌曲id" class="border rounded px-2 py-1 my-4 block" v-model="playlistSongId" />
  <button class="btn" @click="matchSong">云盘信息纠错</button>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '../api'
import useProfile from '../composables/useProfile'

export default defineComponent({
  setup() {
    const { uid } = useProfile()
    const cloudSongId = ref(null)
    const playlistSongId = ref(null)

    const matchSong = async () => {
      const res = await Api.Cloud.matchSong({
        uid: uid.value,
        cloud_song_id: cloudSongId.value,
        match_song_id: playlistSongId.value,
      })
      console.log(res)
    }

    return {
      matchSong,
      cloudSongId,
      playlistSongId,
    }
  },
})
</script>

<style scoped>
.btn {
  @apply mr-2 p-2 text-gray-500 border-transparent border bg-gray-100 hover:bg-gray-200 rounded focus:outline-none;
}
</style>
