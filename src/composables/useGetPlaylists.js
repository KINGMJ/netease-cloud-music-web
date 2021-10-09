import { ref, computed } from 'vue'
import Api from '../api'
import Constant from '../constant'
import useProfile from '../composables/useProfile'

const playlists = ref([])

export default function useGetPlaylists() {
  const { uid } = useProfile()

  // 获取我的歌单
  const getMyPlayLists = async () => {
    const res = await Api.User.getPlaylists({ uid: uid.value })
    playlists.value = res.playlist.map(o => {
      return {
        id: o.id,
        name: o.name,
        cover_image_url: o.coverImgUrl,
        track_count: o.trackCount,
        url: `#/playlists/${o.id}`,
      }
    })
  }

  return {
    playlists: computed(() => playlists.value),
    getMyPlayLists,
  }
}
