<template>
  <div>
    <h1>云盘数据展示</h1>
    <span class="relative z-0 inline-flex shadow-sm rounded-md">
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
        @click="getAllPlayListSongs"
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
        云盘数据加载
      </button>

      <button @click="filterNotInPlaylistSongs">过滤</button>
    </span>

    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  标题
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  歌手
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span>大小</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    @click="sortSongsBySize"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span>类型</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    @click="sortSongsByType"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  是否在歌单
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  所在歌单
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  上传时间
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in cloudSongs"
                :key="item.songId"
                class="text-left"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                @click="getCloudSongDetail(item.songId)"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate"
                  :title="item.songName"
                >
                  {{ item.songName }}
                  ({{ item.songId }})
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.artist }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ (item.fileSize / 1000 / 1000).toFixed(1) + 'M' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ item.fileName.split('.').pop().toLowerCase() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    {{ item.inPlaylist ? '是' : '否' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <p v-for="playlist in item.playlists" :key="playlist.id">{{ playlist.name }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ parseAddTime(item.addTime) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '../api'
import _ from 'lodash'
import dayjs from 'dayjs'

export default defineComponent({
  setup() {
    // 获取云盘歌曲
    const cloudSongs = ref([])
    // 获取所有我创建的歌单的歌曲
    const allPlayListSongs = ref([])
    // 获取不在歌单中的歌曲
    const notInPlaylistSongs = ref([])

    const uid = 372063478

    // 获取云盘的音乐
    const getCloudData = () => {
      cloudSongs.value = []
      Api.Cloud.getData({
        limit: 1000,
      }).then(res => {
        cloudSongs.value = res.data.map(item => {
          const index = _.findIndex(allPlayListSongs.value, o => {
            return o.id == item.songId
          })
          if (~index) {
            return {
              songId: item.songId,
              songName: item.songName,
              artist: item.artist,
              fileSize: item.fileSize,
              fileName: item.fileName,
              addTime: item.addTime,
              inPlaylist: true,
              playlists: allPlayListSongs.value[index].playlist,
            }
          } else {
            const song = {
              songId: item.songId,
              songName: item.songName,
              artist: item.artist,
              fileSize: item.fileSize,
              fileName: item.fileName,
              addTime: item.addTime,
              inPlaylist: false,
              playlists: [],
            }
            notInPlaylistSongs.value.push(song)
            return song
          }
        })
        console.log(cloudSongs.value)
      })
    }

    const getCloudSongDetail = songId => {
      Api.Cloud.getSongDetail({
        song_id: songId,
      }).then(res => {
        console.log(res)
      })
    }

    const sortSongsBySize = () => {
      cloudSongs.value.sort((a, b) => {
        return a.fileSize - b.fileSize
      })
    }

    const sortSongsByType = () => {
      cloudSongs.value.sort((a, b) => {
        const nameA = a.fileName.split('.').pop().toLowerCase()
        const nameB = b.fileName.split('.').pop().toLowerCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
    }

    // 获取我创建的歌单里的所有歌曲
    const getAllPlayListSongs = () => {
      allPlayListSongs.value = []
      Api.User.getPlaylist({
        uid: uid,
      }).then(res => {
        // 获取我创建的歌单
        const playlistIds = res.playlist.reduce((prev, current) => {
          if (current.creator.userId == uid) {
            prev.push(current.id)
          }
          return prev
        }, [])

        for (let id of playlistIds) {
          Api.PlayList.getSongs({
            playlist_id: id,
          }).then(res => {
            console.log(res)
            const playlist = res.playlist
            const trackIds = playlist.trackIds

            for (let item of trackIds) {
              const index = _.findIndex(allPlayListSongs.value, o => {
                return o.id == item.id
              })
              if (~index) {
                allPlayListSongs.value[index].playlist.push({ id: playlist.id, name: playlist.name })
              } else {
                allPlayListSongs.value.push({ id: item.id, playlist: [{ id: playlist.id, name: playlist.name }] })
              }
            }
            console.log(allPlayListSongs.value)
          })
        }
      })
    }

    // 过滤出不在歌单中的歌曲
    const filterNotInPlaylistSongs = () => {
      cloudSongs.value = notInPlaylistSongs.value
    }

    const parseAddTime = time => {
      console.log(time)

      console.log(dayjs(new Date(time)).format('YYYY-MM-ddTHH:mm:ss'))
      return dayjs(new Date(time)).format('YYYY-MM-DD HH:mm')
    }

    return {
      cloudSongs,
      allPlayListSongs,
      getCloudData,
      getCloudSongDetail,
      sortSongsBySize,
      sortSongsByType,
      getAllPlayListSongs,
      filterNotInPlaylistSongs,
      parseAddTime,
    }
  },
})
</script>
