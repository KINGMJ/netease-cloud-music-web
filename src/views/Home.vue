<template>
  <div class="home">网易云盘测试</div>

  <button @click="login">登陆测试</button>
  <button @click="getMyPlayList">获取我的歌单</button>
  <button @click="getPlayListDetail">获取歌单详情</button>
  <button @click="getSongsDetail">获取歌单里的歌曲</button>
  <button @click="getCloudData">获取云盘数据</button>
  <button @click="getCloudSongDetail">获取云盘音乐详情</button>

  <br /><br />

  <div class="playlist-container">
    <ul>
      <li v-for="item in playlists" :key="item.id">
        <span>{{ item.name }}</span>
        <small>{{ item.track_count }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import Api from '../api'

export default defineComponent({
  name: 'Home',
  setup() {
    // 用户id
    const uid = ref(0)

    const playlists = ref([])

    // 歌单里所有歌曲id
    const songIds = ref('')

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

    const getMyPlayList = () => {
      Api.User.getPlaylist({
        uid: uid.value,
      }).then(res => {
        console.log(res)
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

    const getCloudData = () => {
      Api.Cloud.getData({
        limit: 1000,
      }).then(res => {
        console.log(res)
      })
    }

    const getCloudSongDetail = () => {
      Api.Cloud.getSongDetail({
        song_id: 27646196,
      }).then(res => {
        console.log(res)
      })
    }

    onMounted(() => {})

    return {
      login,
      playlists,
      getMyPlayList,
      getPlayListDetail,
      getSongsDetail,
      getCloudData,
      getCloudSongDetail,
    }
  },
})
</script>

<style scoped>
.playlist-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.playlist-container ul {
  list-style: none;
  text-align: left;
}

.playlist-container ul li span {
  margin-right: 12px;
}

.playlist-container ul li {
  color: #42b983;
  cursor: pointer;
}
.playlist-container ul li:hover {
  text-decoration: underline;
}
</style>
