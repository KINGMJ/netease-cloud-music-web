import { ref } from 'vue'
import Api from '../api'
import Constant from '../constant'

/**
 *
 * 云盘数据加载
 */
export default function useGetCloudSongs() {
  const cloudSongs = ref([])

  // 获取云盘的音乐
  const getCloudSongs = async () => {
    const res = await Api.Cloud.getData({ limit: Constant.CLOUD_SONG_LIMIT })
    cloudSongs.value = res.data
  }

  return {
    cloudSongs,
    getCloudSongs,
  }
}
