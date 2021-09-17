<template>
  <input
    type="file"
    tabindex="-1"
    ref="fileUploadInput"
    style="visibility: hidden; position: absolute; top: 0px; left: 0px; height: 0px; width: 0px"
    @change="uploadFile"
  />
  <div class="mx-auto container flex">
    <div class="mx-auto container">
      <playlist-detail v-if="playlist" :playlist="playlist" />
      <playlist-songs v-if="playlist" :playlist-songs="playlistSongs" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '../api'
import _ from 'lodash'
import axios from 'axios'
import { onBeforeRouteUpdate } from 'vue-router'
import PlaylistDetail from '../components/PlaylistDetail.vue'
import playlistSongs from '../components/PlaylistSongs.vue'
import useGetCloudSongs from '../composables/useGetCloudSongs.js'

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
    // 用户id
    const uid = 372063478
    // 歌单详情
    const playlist = ref(null)
    // 歌单里所有歌曲
    const playlistSongs = ref([])

    const fileUploadInput = ref(null)

    // 要上传的歌曲
    const uploadSong = ref(null)

    let fileUpdateTime = {}

    //获取歌单详情
    const getPlayListDetail = async playlist_id => {
      console.group('云盘')
      console.log(cloudSongs)
      console.groupEnd()
      const res = await Api.PlayList.getSongs({ playlist_id })
      playlist.value = res.playlist
      // console.log(playlist.value)
      // 歌单所有的歌曲id，用于获取歌单歌曲详情
      const trackIds = playlist.value.trackIds
      const songIds = trackIds.map(o => o.id).join(',')

      // 获取歌单歌曲
      const res1 = await Api.Song.getDetail({ song_ids: songIds })
      playlistSongs.value = res1.songs

      res1.songs.forEach(song => {
        const songInCloud = _.find(cloudSongs.value, o => o.songId == song.id)
        if (songInCloud) {
          song.in_cloud = '是'
          song.size = (songInCloud.fileSize / 1000 / 1000).toFixed(1) + 'M'
          song.type = songInCloud.fileName.split('.').pop().toLowerCase()
        }
      })
    }

    const uploadFileByClick = item => {
      uploadSong.value = item
      const element = fileUploadInput.value
      element.value = ''
      element.click()
    }

    const uploadFile = event => {
      const files = event.target.files
      fileUpdateTime = {}
      console.group('上传的文件')
      console.log(files)
      console.groupEnd()

      let currentIndex = 0,
        fileLength = files.length
      for (const item of files) {
        currentIndex += 1
        upload(item, currentIndex, fileLength)
      }
    }

    const upload = (file, currentIndx, fileLength) => {
      const formData = new FormData()
      formData.append('songFile', file)
      axios({
        method: 'post',
        url: `http://localhost:3000/cloud?time=${Date.now()}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
        .then(res => {
          console.log(`${file.name} 上传成功`)
          console.log(res)
          if (currentIndx >= fileLength) {
            console.log('上传完毕')
            const cloudSongId = res.data.privateCloud.songId
            //上传完后的歌曲id
            console.log(cloudSongId)

            //上传完后对云盘歌曲进行
            if (cloudSongId != uploadSong.value.id) {
              matchSong(cloudSongId, uploadSong.value.id)
            }
          }
        })
        .catch(async err => {
          console.log(err)
          console.log(fileUpdateTime)
          fileUpdateTime[file.name] ? (fileUpdateTime[file.name] += 1) : (fileUpdateTime[file.name] = 1)
          if (fileUpdateTime[file.name] >= 4) {
            console.error(`丢，这首歌怎么都传不上：${file.name}`)
            return
          } else {
            console.error(`${file.name} 失败 ${fileUpdateTime[file.name]} 次`)
          }
          upload(file, currentIndx, fileLength)
        })
    }

    const matchSong = (cloud_song_id, match_song_id) => {
      Api.Cloud.matchSong({
        uid,
        cloud_song_id,
        match_song_id,
      }).then(res => {
        console.group('云盘歌曲信息纠错')
        console.log(res)
        console.groupEnd()
      })
    }

    setTimeout(() => {
      getPlayListDetail(props.playlistId)
    }, 3000)

    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.playlistId == from.params.playlistId) {
        return
      }
      getPlayListDetail(to.params.playlistId)
    })

    return {
      playlistSongs,
      getPlayListDetail,
      uploadFile,
      uploadFileByClick,
      fileUploadInput,
      matchSong,
      playlist,
      cloudSongs,
    }
  },
})
</script>
