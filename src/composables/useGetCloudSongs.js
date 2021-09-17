import { ref, computed } from 'vue'
import Api from '../api'
import Constant from '../constant'

const cloudSongs = ref([])

/**
 * 云盘数据加载
 */
export default function useGetCloudSongs() {
  // 获取云盘的音乐
  const getCloudSongs = async () => {
    const res = await Api.Cloud.getData({ limit: Constant.CLOUD_SONG_LIMIT })
    cloudSongs.value = res.data
  }

  return {
    getCloudSongs,
    cloudSongs: computed(() => cloudSongs.value),
  }
}
