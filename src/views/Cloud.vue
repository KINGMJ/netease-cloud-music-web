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
        <button
          class="btn"
          :class="filterOn ? 'filter-on' : ''"
          title="过滤出不在歌单中的歌曲"
          @click="filterOn = !filterOn"
        >
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
                <component
                  :is="item.icon"
                  class="text-gray-500 w-5 h-5 inline cursor-pointer ml-1"
                  @click="item.event()"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filteredSongs"
              :key="item.songId"
              class="tr"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            >
              <td class="td font-medium text-gray-900 group-hover:text-green-500" :title="item.songName">
                {{ item.songName }}
                <!-- {{ item.songId }} -->
              </td>
              <td class="td text-gray-900 group-hover:text-green-500">{{ item.artist }}</td>
              <td class="td text-gray-500 group-hover:text-green-500">{{ fileSizeFormat(item.fileSize) }}</td>
              <td class="td text-gray-500 group-hover:text-green-500">{{ fileTypeFormat(item.fileName) }}</td>
              <td class="td text-gray-500 group-hover:text-green-500">
                <p v-for="playlist in item.playlists" :key="playlist.id" class="mb-1 text-xs">{{ playlist.name }}</p>
              </td>
              <td class="td text-gray-500 group-hover:text-green-500">{{ timeFormat(item.addTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import _ from 'lodash'
import { computed, defineComponent, ref } from 'vue'
import { PencilAltIcon, CogIcon, FilterIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/vue/outline'
import useGetCloudSongs from '../composables/useGetCloudSongs'
import useUtils from '../composables/useUtils'
import useSortSongs from '../composables/useSortSongs'

export default defineComponent({
  components: {
    PencilAltIcon,
    CogIcon,
    FilterIcon,
  },
  setup() {
    // 云盘歌曲
    const { cloudSongs } = useGetCloudSongs()
    const { timeFormat, fileTypeFormat, fileSizeFormat } = useUtils()
    const { sortSequence, sortBySize, sortByType } = useSortSongs()

    const tableCol = computed(() => {
      return [
        { name: '歌曲' },
        { name: '歌手' },
        {
          name: '大小',
          icon: sortSequence.value ? SortAscendingIcon : SortDescendingIcon,
          event: () => sortBySize(filteredSongs.value),
        },
        {
          name: '类型',
          icon: sortSequence.value ? SortAscendingIcon : SortDescendingIcon,
          event: () => sortByType(filteredSongs.value),
        },
        { name: '所在歌单' },
        { name: '上传时间' },
      ]
    })

    // 所有我创建的歌单的歌曲
    const allPlayListSongs = ref([])
    // 是否开启过滤
    const filterOn = ref(false)
    // 云盘歌曲，包含歌单信息
    const cloudSongsWithPlaylist = ref([])
    // 不在歌单中的云盘歌曲
    const notInPlaylistSongs = ref([])
    const uid = 372063478

    // 获取云盘的音乐
    const getCloudData = () => {
      cloudSongsWithPlaylist.value = cloudSongs.value.map(item => {
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
    }

    // 云盘歌曲过滤，过滤出不在歌单中的歌曲
    const filteredSongs = computed(() => {
      return filterOn.value ? notInPlaylistSongs.value : cloudSongsWithPlaylist.value
    })

    // 获取我创建的歌单里的所有歌曲
    const getAllPlayListSongs = async () => {
      const res = await Api.User.getPlaylist({ uid })
      // 获取我创建的歌单
      const playlistIds = res.playlist.reduce((prev, current) => {
        if (current.creator.userId == uid) {
          prev.push(current.id)
        }
        return prev
      }, [])

      for (let id of playlistIds) {
        const res = await Api.PlayList.getSongs({ playlist_id: id })
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
      }
    }

    const bootstrap = () => {
      getAllPlayListSongs()
      setTimeout(() => {
        getCloudData()
      }, 2000)
    }

    bootstrap()

    return {
      tableCol,
      filteredSongs,
      filterOn,
      timeFormat,
      fileTypeFormat,
      fileSizeFormat,
    }
  },
})
</script>

<style scoped>
.th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.tr {
  @apply focus:outline-none h-6 text-sm leading-none border-b border-t border-gray-100 group;
}

.btn {
  @apply mr-2 p-2 text-gray-500 border-transparent border bg-gray-100 hover:bg-gray-200 rounded focus:outline-none;
}

.btn.filter-on {
  @apply bg-green-400 hover:bg-green-500 text-white;
}

.td {
  @apply px-6 py-4 whitespace-nowrap text-left max-w-xs truncate;
}
</style>
