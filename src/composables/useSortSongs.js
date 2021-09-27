import { ref, computed } from 'vue'
import Api from '../api'
import Constant from '../constant'

//默认升序排列
const sortSequence = ref(true)

/**
 * 歌曲排序
 */
export default function useSortSongs() {
  // 按文件大小排序
  const sortBySize = songs => {
    console.log(sortSequence.value)
    songs.sort((a, b) => {
      return sortSequence.value ? a.fileSize - b.fileSize : b.fileSize - a.fileSize
    })
    setSortSequence()
  }

  const setSortSequence = () => {
    sortSequence.value = !sortSequence.value
  }

  return {
    sortSequence: computed(() => sortSequence.value),
    sortBySize,
  }
}
