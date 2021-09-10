<template>
  <div class="home">网易云盘测试</div>
  <span class="relative z-0 inline-flex shadow-sm rounded-md">
    <button
      type="button"
      class="
        relative
        inline-flex
        items-center
        px-4
        py-2
        rounded-l-md
        border border-gray-300
        bg-white
        text-sm
        font-medium
        text-gray-700
        hover:bg-gray-50
        focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
      "
      @click="login"
    >
      登陆测试
    </button>
    <button
      type="button"
      class="
        -ml-px
        relative
        inline-flex
        items-center
        px-4
        py-2
        border border-gray-300
        bg-white
        text-sm
        font-medium
        text-gray-700
        hover:bg-gray-50
        focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
      "
      @click="getMyPlayList"
    >
      获取我的歌单
    </button>
    <button
      type="button"
      class="
        -ml-px
        relative
        inline-flex
        items-center
        px-4
        py-2
        border border-gray-300
        bg-white
        text-sm
        font-medium
        text-gray-700
        hover:bg-gray-50
        focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
      "
      @click="getCloudData"
    >
      获取云盘数据
    </button>

    <button
      type="button"
      class="
        -ml-px
        relative
        inline-flex
        items-center
        px-4
        py-2
        border border-gray-300
        bg-white
        text-sm
        font-medium
        text-gray-700
        hover:bg-gray-50
        focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
      "
      @click="getCloudSongDetail"
    >
      获取云盘音乐详情
    </button>
  </span>

  <br /><br />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
    <div class="mr-4">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="item in playlists" :key="item.id" @click="getPlayListDetail(item.id)" class="py-4 flex">
          <img class="h-10 w-10 rounded-full" :src="item.cover_image_url" alt="" />
          <div class="ml-3 text-left">
            <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
            <p class="text-sm text-gray-500">{{ item.track_count }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    歌曲标题
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    歌手
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    在云盘
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    大小
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    类型
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span @click="filterNotInCloudSongs">过滤</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(item, index) in playlistSongs" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ index + 1 + '. ' + item.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ item.ar[0].name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      {{ item.in_cloud }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.size }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">{{ item.type }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="item in cloudSongs" :key="item.songId" class="py-4 flex">
          <div class="ml-3 text-left">
            <p class="text-sm font-medium text-gray-900">{{ item.songName }}</p>
            <p class="text-sm text-gray-500">{{ item.songId }}</p>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '../api'
import _ from 'lodash'

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

    // 获取云盘歌曲
    const cloudSongs = ref([])

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
            // console.group('song in cloud')
            // console.log(songInCloud)
            // console.groupEnd()

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

    const getCloudSongDetail = () => {
      Api.Cloud.getSongDetail({
        song_id: 27646196,
      }).then(res => {
        console.log(res)
      })
    }

    const filterNotInCloudSongs = () => {
      playlistSongs.value = playlistSongsNotInCloud.value
    }

    return {
      login,
      playlists,
      playlistSongs,
      cloudSongs,
      getMyPlayList,
      getPlayListDetail,
      getCloudData,
      getCloudSongDetail,
      filterNotInCloudSongs,
    }
  },
})
</script>
