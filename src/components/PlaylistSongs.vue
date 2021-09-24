<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="overflow-y-auto">
          <table class="w-full whitespace-nowrap">
            <thead>
              <tr class="focus:outline-none h-8 w-full text-sm leading-none text-gray-800">
                <th v-for="(item, index) in tableCol" :key="index" scope="col" class="th">
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody class="w-full">
              <tr
                v-for="(item, index) in playlistSongs"
                :key="item.id"
                class="tr"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td class="td">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-900 group-hover:text-green-500 flex items-center">
                      <img class="h-9 w-9 rounded-lg mr-3" :src="item.al.picUrl" alt="" />
                      {{ index + 1 + '. ' + item.name }}
                      <!-- ({{ item.id }}) -->
                    </div>
                  </div>
                </td>
                <td class="td">
                  <div class="text-gray-900 group-hover:text-green-500">{{ item.ar[0].name }}</div>
                </td>
                <td class="td text-gray-500">
                  <span class="badge">
                    {{ item.inCloud ? '是' : '' }}
                  </span>
                </td>
                <td class="td text-gray-500 group-hover:text-green-500">
                  {{ fileSizeFormat(item.fileSize) }}
                </td>
                <td class="td text-gray-500 group-hover:text-green-500">
                  {{ fileTypeFormat(item.fileName) }}
                </td>
                <td class="td cursor-pointer group-hover:text-green-500">
                  <CloudUploadIcon
                    v-if="!item.inCloud"
                    class="w-5 h-5 opacity-0 group-hover:opacity-100"
                    @click="$emit('handle-click-upload', item)"
                  />
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
import { defineComponent } from 'vue'
import { CloudUploadIcon } from '@heroicons/vue/outline'
import useUtils from '../composables/useUtils'
export default defineComponent({
  components: {
    CloudUploadIcon,
  },
  props: {
    playlistSongs: {
      type: Array,
      required: true,
    },
  },
  emits: ['handle-click-upload'],
  setup(props) {
    const { fileSizeFormat, fileTypeFormat } = useUtils()
    const tableCol = ['歌曲', '歌手', '已上传云盘', '大小', '类型', '操作']
    return {
      tableCol,
      fileSizeFormat,
      fileTypeFormat,
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

.badge {
  @apply px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-left group-hover:text-green-500;
}

.td {
  @apply px-6 py-4 whitespace-nowrap text-left text-sm;
}
</style>
