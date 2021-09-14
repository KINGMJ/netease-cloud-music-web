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
  </span>

  <br /><br />

  <div class="max-w-7xl mx-auto container px-4 sm:px-6 lg:px-8 flex">
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

    <div class="mx-auto container bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded">
      <div class="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
        <div class="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
          <div class="flex items-center">
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
        <div class="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
          <div class="lg:ml-6 flex items-center">
            <button
              class="
                bg-gray-200
                transition
                duration-150
                ease-in-out
                focus:outline-none
                border border-transparent
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700
                hover:bg-gray-300
                rounded
                text-indigo-700
                px-5
                h-8
                flex
                items-center
                text-sm
              "
              @click="filterNotInCloudSongs"
            >
              过滤
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
              <table class="w-full whitespace-nowrap">
                <thead class="">
                  <tr class="focus:outline-none h-16 w-full text-sm leading-none text-gray-800">
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
                      h-20
                      text-sm
                      leading-none
                      text-gray-800
                      bg-white
                      hover:bg-gray-100
                      border-b border-t border-gray-100
                    "
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                      <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900">
                          {{ index + 1 + '. ' + item.name }}
                          ({{ item.id }})
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                      <div class="text-sm text-gray-900">{{ item.ar[0].name }}</div>
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
                        "
                      >
                        {{ item.in_cloud }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{{ item.size }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-left">
                      {{ item.type }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-xs text-left cursor-pointer">
                      <svg
                        v-if="!item.in_cloud"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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

    return {
      login,
      playlists,
      playlistSongs,
      cloudSongs,
      getMyPlayList,
      getPlayListDetail,
      getCloudData,
      filterNotInCloudSongs,
    }
  },
})
</script>
