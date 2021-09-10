<template>
  <div class="flex flex-col">
    <h1>云盘数据展示</h1>
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

export default defineComponent({
  setup() {
    // 获取云盘歌曲
    const cloudSongs = ref([])

    // 获取云盘的音乐
    const getCloudData = () => {
      Api.Cloud.getData({
        limit: 1000,
      }).then(res => {
        cloudSongs.value = res.data
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

    getCloudData()

    return {
      cloudSongs,
      getCloudData,
      getCloudSongDetail,
      sortSongsBySize,
      sortSongsByType,
    }
  },
})
</script>
