<template>
  <div class="home">网易云盘测试</div>

  <button @click="login">登陆测试</button>
  <button @click="getMyPlayList">获取我的歌单</button>
  <button @click="getPlayListDetail">获取歌单详情</button>
  <button @click="getSongsDetail">获取歌单里的歌曲</button>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import Api from '../api'

export default defineComponent({
  name: 'Home',
  setup() {
    // 用户id
    const uid = ref(0)

    // 歌单里所有歌曲id
    const songIds = ref('')

    const login = () => {
      Api.Login.phoneLogin({
        phone: '17621926566',
        password: 'mj13876210361',
      }).then(res => {
        console.log(res)
        uid.value = res.account.id
      })
    }

    const getMyPlayList = () => {
      Api.User.getPlaylist({
        uid: uid.value,
      }).then(res => {
        console.log(res)
      })
    }

    const getPlayListDetail = () => {
      Api.PlayList.getSongs({
        playlist_id: 526276431,
      }).then(res => {
        const playlist = res.playlist
        const trackIds = playlist.trackIds

        songIds.value = trackIds.map(o => o.id).join(',')
        console.log(songIds.value)
      })
    }

    const getSongsDetail = () => {
      Api.Song.getDetail({
        song_ids: songIds.value,
      }).then(res => {
        console.log(res)
      })
    }

    onMounted(() => {})
    return {
      login,
      getMyPlayList,
      getPlayListDetail,
      getSongsDetail,
    }
  },
})
</script>
