<template>
  <div>11</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '../api'
import _ from 'lodash'
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  setup() {
    // 用户id
    const uid = ref(0)
    // 我的歌单
    const playlists = ref([])
    // 歌单里所有歌曲
    const playlistSongs = ref([])
    // 歌单里不在云盘的歌曲
    const playlistSongsNotInCloud = ref([])

    const fileUploadInput = ref(null)

    // 获取云盘歌曲
    const cloudSongs = ref([])

    // 要上传的歌曲
    const uploadSong = ref(null)

    let fileUpdateTime = {}

    const login = () => {
      Api.Login.phoneLogin({
        phone: '17621926566',
        password: 'mj13876210361',
      }).then(res => {
        console.group('登陆成功')
        console.log(res)
        console.groupEnd()
        uid.value = res.account.id
      })
    }

    // 获取我的歌单
    const getMyPlayList = () => {
      Api.User.getPlaylist({
        uid: uid.value,
      }).then(res => {
        playlists.value = res.playlist.map(o => {
          return {
            id: o.id,
            name: o.name,
            cover_image_url: o.coverImgUrl,
            track_count: o.trackCount,
          }
        })

        console.log(playlists.value)
      })
    }

    //获取歌单详情
    const getPlayListDetail = playlist_id => {
      Api.PlayList.getSongs({
        playlist_id: playlist_id,
      }).then(res => {
        const playlist = res.playlist
        const trackIds = playlist.trackIds

        const songIds = trackIds.map(o => o.id).join(',')

        Api.Song.getDetail({
          song_ids: songIds,
        }).then(res => {
          playlistSongs.value = res.songs
          playlistSongsNotInCloud.value = []
          res.songs.forEach(song => {
            const songInCloud = _.find(cloudSongs.value, o => {
              return o.songId == song.id
            })
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!songInCloud) {
              song.in_cloud = '是'
              song.size = (songInCloud.fileSize / 1000 / 1000).toFixed(1) + 'M'
              song.type = songInCloud.fileName.split('.').pop().toLowerCase()
            } else {
              playlistSongsNotInCloud.value.push(song)
            }
          })

          console.log(playlistSongs.value)
          console.log(playlistSongsNotInCloud.value)
        })
      })
    }

    // 获取云盘的音乐
    const getCloudData = () => {
      Api.Cloud.getData({
        limit: 1000,
      }).then(res => {
        cloudSongs.value = res.data
        console.log(res)
      })
    }

    const filterNotInCloudSongs = () => {
      playlistSongs.value = playlistSongsNotInCloud.value
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

    return {
      login,
      playlists,
      playlistSongs,
      cloudSongs,
      getMyPlayList,
      getPlayListDetail,
      getCloudData,
      filterNotInCloudSongs,
      uploadFile,
      uploadFileByClick,
      fileUploadInput,
      matchSong,
    }
  },
})
</script>
