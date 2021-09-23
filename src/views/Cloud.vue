<template>
  <div class="mx-auto container flex flex-col">
    <div class="flex ml-4 mb-8">
      <div class="flex items-center bottom-1">
        <button class="btn">
          <PencilAltIcon class="w-4 h-4" />
        </button>
        <button class="btn">
          <CogIcon class="w-4 h-4" />
        </button>
        <button class="btn" title="过滤出不在云盘中的歌曲" @click="$emit('handle-click-filter')">
          <FilterIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div class="-my-2 overflow-x-auto">
      <div class="align-middle inline-block min-w-full overflow-y-auto">
        <table class="w-full whitespace-nowrap">
          <thead>
            <tr class="focus:outline-none h-8 w-full text-sm leading-none text-gray-800">
              <th v-for="(item, index) in tableCol" :key="index" scope="col" class="th">
                <span>{{ item.name }}</span>
                <component :is="item.icon" class="text-gray-500 w-5 h-5 inline cursor-pointer ml-1" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in cloudSongs"
              :key="item.songId"
              class="tr"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              @click="getCloudSongDetail(item.songId)"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-900 max-w-xs truncate"
                :title="item.songName"
              >
                {{ item.songName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-900 max-w-xs truncate">
                {{ item.artist }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                {{ (item.fileSize / 1000 / 1000).toFixed(1) + 'M' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                {{ item.fileName.split('.').pop().toLowerCase() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                <p v-for="playlist in item.playlists" :key="playlist.id">{{ playlist.name }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                {{ parseAddTime(item.addTime) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { PencilAltIcon, CogIcon, FilterIcon, SortAscendingIcon } from '@heroicons/vue/outline'
import Api from '../api'
import _ from 'lodash'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    PencilAltIcon,
    CogIcon,
    FilterIcon,
    // SortAscendingIcon,
  },
  setup() {
    const tableCol = [
      { name: '歌曲' },
      { name: '歌手' },
      { name: '大小', icon: SortAscendingIcon },
      { name: '类型', icon: SortAscendingIcon },
      { name: '所在歌单' },
      { name: '上传时间' },
    ]

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

    getAllPlayListSongs()

    setTimeout(() => {
      getCloudData()
    }, 2000)

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
      tableCol,
    }
  },
})
</script>

<style scoped>
.th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.tr {
  @apply focus:outline-none h-6 text-sm leading-none text-gray-800  border-b border-t border-gray-100 group;
}

.badge {
  @apply px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-left group-hover:text-green-500;
}

.btn {
  @apply mr-2 p-2 text-gray-500 border-transparent border bg-gray-100 hover:bg-gray-200 rounded focus:outline-none;
}
</style>
