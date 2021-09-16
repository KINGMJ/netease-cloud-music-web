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
        <button class="btn">
          <PencilAltIcon class="w-4 h-4" />
        </button>
        <button class="btn">
          <CogIcon class="w-4 h-4" />
        </button>
        <button class="btn" title="过滤出不在云盘中的歌曲">
          <FilterIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useUtils from '../composables/useUtils'
import { PencilAltIcon, CogIcon, FilterIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'PlaylistDetail',
  components: {
    PencilAltIcon,
    CogIcon,
    FilterIcon,
  },
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

<style scoped>
.btn {
  @apply mr-2 p-2 text-gray-500 border-transparent border bg-gray-100 hover:bg-gray-200 rounded focus:outline-none;
}
</style>
