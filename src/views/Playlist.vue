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
      <div class="flex ml-8 mb-8" v-if="playlist">
        <img class="w-60 h-60 rounded-lg mr-3" :src="playlist.coverImgUrl" alt="" />
        <div class="ml-4 mt-4 relative">
          <h1 class="text-3xl text-green-500">{{ playlist.name }}</h1>
          <p class="text-gray-400 mt-4 text-sm max-w-lg">
            {{ playlist.description }}
          </p>
          <p class="text-sm mt-6 text-gray-500">
            <span class="mr-4">{{ playlist.trackCount }} 首歌</span>
            <span class="mr-4 text-gray-300">|</span>
            <span>{{ parseAddTime(playlist.createTime) }} 创建</span>
          </p>
          <div class="flex items-center absolute bottom-1">
            <button
              class="
                text-gray-600
                dark:text-gray-400
                p-2
                border-transparent border
                bg-gray-100
                dark:hover:bg-gray-600 dark:bg-gray-700
                hover:bg-gray-200
                cursor-pointer
                rounded
                focus:outline-none focus:border-gray-800 focus:shadow-outline-gray
              "
              aria-label="Edit Table"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon cursor-pointer icon-tabler icon-tabler-edit"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"></path>
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"></path>
                <line x1="16" y1="5" x2="19" y2="8"></line>
              </svg>
            </button>
            <button
              class="
                text-gray-600
                dark:text-gray-400
                mx-2
                p-2
                border-transparent border
                bg-gray-100
                dark:hover:bg-gray-600 dark:bg-gray-700
                hover:bg-gray-200
                cursor-pointer
                rounded
                focus:outline-none focus:border-gray-800 focus:shadow-outline-gray
              "
              aria-label="table settings"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon cursor-pointer icon-tabler icon-tabler-settings"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button
              class="
                text-gray-600
                dark:text-gray-400
                mr-2
                p-2
                border-transparent border
                bg-gray-100
                dark:hover:bg-gray-600 dark:bg-gray-700
                hover:bg-gray-200
                cursor-pointer
                rounded
                focus:outline-none focus:border-gray-800 focus:shadow-outline-gray
              "
              aria-label="Bookmark"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-bookmark"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
              </svg>
            </button>
            <button
              class="
                text-gray-600
                dark:text-gray-400
                mr-2
                p-2
                border-transparent border
                bg-gray-100
                dark:hover:bg-gray-600 dark:bg-gray-700
                hover:bg-gray-200
                cursor-pointer
                rounded
                focus:outline-none focus:border-gray-800 focus:shadow-outline-gray
              "
              aria-label="copy table"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-copy"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <rect x="8" y="8" width="12" height="12" rx="2"></rect>
                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
              </svg>
            </button>
            <button
              class="
                text-red-500
                p-2
                border-transparent border
                bg-gray-100
                dark:bg-gray-700 dark:hover:bg-gray-600
                hover:bg-gray-200
                cursor-pointer
                rounded
                focus:outline-none focus:border-gray-800 focus:shadow-outline-gray
              "
              aria-label="delete table"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon cursor-pointer icon-tabler icon-tabler-trash"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto">
          <div class="align-middle inline-block min-w-full">
            <div class="overflow-y-auto">
              <table class="w-full whitespace-nowrap">
                <thead class="">
                  <tr class="focus:outline-none h-8 w-full text-sm leading-none text-gray-800">
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      歌曲
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
                      已上传云盘
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <span>操作</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="w-full">
                  <tr
                    v-for="(item, index) in playlistSongs"
                    :key="item.id"
                    class="
                      focus:outline-none
                      h-8
                      text-sm
                      leading-none
                      text-gray-800
                      bg-white
                      border-b border-t border-gray-100
                      group
                    "
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                      <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900 group-hover:text-green-500 flex items-center">
                          <img class="h-9 w-9 rounded-lg mr-3" :src="item.al.picUrl" alt="" />
                          {{ index + 1 + '. ' + item.name }}
                          <!-- ({{ item.id }}) -->
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                      <div class="text-sm text-gray-900 group-hover:text-green-500">{{ item.ar[0].name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="
                          px-2
                          inline-flex
                          text-xs
                          leading-5
                          font-semibold
                          rounded-full
                          bg-green-100
                          text-green-800 text-left
                          group-hover:text-green-500
                        "
                      >
                        {{ item.in_cloud }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left group-hover:text-green-500">
                      {{ item.size }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-left group-hover:text-green-500">
                      {{ item.type }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-left cursor-pointer group-hover:text-green-500">
                      <svg
                        v-if="!item.in_cloud"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        @click="uploadFileByClick(item)"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '../api'
import _ from 'lodash'
import axios from 'axios'
import { onBeforeRouteUpdate } from 'vue-router'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'Playlist',
  props: {
    playlistId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    // 用户id
    const uid = 372063478
    // 歌单详情
    const playlist = ref(null)
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

    //获取歌单详情
    const getPlayListDetail = async playlist_id => {
      const res = await Api.PlayList.getSongs({ playlist_id })
      playlist.value = res.playlist
      console.log(playlist.value)
      // 歌单所有的歌曲id，用于获取歌单歌曲详情
      const trackIds = playlist.value.trackIds
      const songIds = trackIds.map(o => o.id).join(',')

      // 获取歌单歌曲
      const res1 = await Api.Song.getDetail({ song_ids: songIds })
      playlistSongs.value = res1.songs
      playlistSongsNotInCloud.value = []

      res1.songs.forEach(song => {
        const songInCloud = _.find(cloudSongs.value, o => o.songId == song.id)
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!songInCloud) {
          song.in_cloud = '是'
          song.size = (songInCloud.fileSize / 1000 / 1000).toFixed(1) + 'M'
          song.type = songInCloud.fileName.split('.').pop().toLowerCase()
        } else {
          playlistSongsNotInCloud.value.push(song)
        }
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

    getCloudData()

    setTimeout(() => {
      getPlayListDetail(props.playlistId)
    }, 3000)

    onBeforeRouteUpdate(async (to, from) => {
      console.log('123')
      if (to.params.id == from.params.id) {
        return
      }
      console.log('执行了吗')
      getPlayListDetail(to.params.id)
    })

    const parseAddTime = time => {
      return dayjs(new Date(time)).format('YYYY-MM-DD')
    }

    console.log(props.playlistId)
    return {
      playlistSongs,
      cloudSongs,
      getPlayListDetail,
      getCloudData,
      filterNotInCloudSongs,
      uploadFile,
      uploadFileByClick,
      fileUploadInput,
      matchSong,
      playlist,
      parseAddTime,
    }
  },
})
</script>
