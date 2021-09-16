<template>
  <div class="flex ml-8 mb-8">
    <img class="w-60 h-60 rounded-lg mr-3" :src="playlist.coverImgUrl" alt="" />
    <div class="ml-4 mt-4 relative">
      <h1 class="text-3xl text-green-500">{{ playlist.name }}</h1>
      <p class="text-gray-400 mt-4 text-sm max-w-lg">
        {{ playlist.description }}
      </p>
      <p class="text-sm mt-6 text-gray-500">
        <span class="mr-4">{{ playlist.trackCount }} 首歌</span>
        <span class="mr-4 text-gray-300">|</span>
        <span>{{ parseDate(playlist.createTime) }} 创建</span>
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
</template>

<script>
import { defineComponent } from 'vue'
import useUtils from '../composables/useUtils'

export default defineComponent({
  name: 'PlaylistDetail',
  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { parseDate } = useUtils()

    return {
      parseDate,
    }
  },
})
</script>
