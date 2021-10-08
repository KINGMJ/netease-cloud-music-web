<template>
  <div class="flex-1 w-0 flex flex-col">
    <main class="flex-1 relative overflow-y-auto focus:outline-none bg-white m-6 p-6 rounded-lg smart-scrollbar">
      <div class="px-4 sm:px-6 md:px-0">
        <div class="mx-auto container flex flex-col">
          <playlist-detail v-if="playlist" :playlist="playlist" @handle-click-filter="filterNotInCloudSongs" />
          <playlist-songs v-if="playlist" :playlist-songs="playlistSongs" @handle-click-upload="uploadSongByClick" />
          <input type="file" tabindex="-1" ref="fileUploadInput" class="file-input" @change="uploadSong" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '../api'
import _ from 'lodash'
import { onBeforeRouteUpdate } from 'vue-router'
import PlaylistDetail from '../components/PlaylistDetail.vue'
import playlistSongs from '../components/PlaylistSongs.vue'
import useGetCloudSongs from '../composables/useGetCloudSongs'
import useUploadSong from '../composables/useUploadSong'

export default defineComponent({
  name: 'Playlist',
  components: { PlaylistDetail, playlistSongs },
  props: {
    playlistId: {
      type: [Number, String],
      required: true,
    },
  },

  setup(props) {
    const { cloudSongs } = useGetCloudSongs()
    const { uploadSong, setUploadedSong } = useUploadSong()

    // 歌单详情
    const playlist = ref(null)
    // 歌单里所有歌曲
    const playlistSongs = ref([])
    // 上传文件的表单
    const fileUploadInput = ref(null)

    //获取歌单详情
    const getPlayListDetail = async playlist_id => {
      const res = await Api.PlayList.getSongs({ playlist_id })
      playlist.value = res.playlist
      // console.log(playlist.value)
      // 歌单所有的歌曲id，用于获取歌单歌曲详情
      const trackIds = playlist.value.trackIds
      const songIds = trackIds.map(o => o.id).join(',')

      // 获取歌单歌曲
      const res1 = await Api.Song.getDetail({ song_ids: songIds })
      playlistSongs.value = res1.songs

      // 如果歌曲在云盘中，追加云盘中歌曲的信息
      res1.songs.forEach(song => {
        const songInCloud = _.find(cloudSongs.value, o => o.songId == song.id)
        if (songInCloud) {
          song.inCloud = true
          song.fileSize = songInCloud.fileSize
          song.fileName = songInCloud.fileName
        }
      })
    }

    // 通过模拟点击去上传文件
    const uploadSongByClick = song => {
      setUploadedSong(song)
      const element = fileUploadInput.value
      element.value = ''
      element.click()
    }

    // 过滤出不在云盘中的歌曲
    const filterNotInCloudSongs = () => {
      playlistSongs.value = playlistSongs.value.filter(song => !song.inCloud)
    }

    setTimeout(() => {
      getPlayListDetail(props.playlistId)
    }, 1000)

    // 切换歌单后，重新加载
    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.playlistId == from.params.playlistId) {
        return
      }
      getPlayListDetail(to.params.playlistId)
    })

    return {
      playlistSongs,
      getPlayListDetail,
      fileUploadInput,
      playlist,
      cloudSongs,
      filterNotInCloudSongs,
      uploadSongByClick,
      uploadSong,
    }
  },
})
</script>

<style scoped>
.file-input {
  @apply invisible absolute w-0 h-0 top-0 left-0;
}
</style>
