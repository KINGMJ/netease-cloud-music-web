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
    songs.sort((a, b) => {
      return sortSequence.value ? a.fileSize - b.fileSize : b.fileSize - a.fileSize
    })
    setSortSequence()
  }

  // 按类型排序
  const sortByType = songs => {
    songs.value.sort((a, b) => {
      const nameA = a.fileName.split('.').pop().toLowerCase()
      const nameB = b.fileName.split('.').pop().toLowerCase()
      if (nameA == nameB) {
        return 0
      }
      if (sortSequence.value) {
        return nameA > nameB ? 1 : -1
      }
      return nameA > nameB ? -1 : 1
    })
    setSortSequence()
  }

  // 按歌曲名排序
  const sortByName = songs => {
    songs.value.sort((a, b) => {
      const nameA = a.songName.toLowerCase()
      const nameB = b.songName.toLowerCase()
      if (nameA == nameB) {
        return 0
      }
      if (sortSequence.value) {
        return nameA > nameB ? 1 : -1
      }
      return nameA > nameB ? -1 : 1
    })
    setSortSequence()
  }

  const setSortSequence = () => {
    sortSequence.value = !sortSequence.value
  }

  return {
    sortSequence: computed(() => sortSequence.value),
    sortBySize,
    sortByType,
    sortByName,
  }
}
