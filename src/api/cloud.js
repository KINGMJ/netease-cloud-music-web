import { get } from './api-client'

export default {
  getData({ limit = 200 }) {
    return get(`/user/cloud?limit=${limit}`)
  },

  getSongDetail({ song_id }) {
    return get(`/user/cloud/detail?id=${song_id}`)
  },

  // 云盘歌曲信息匹配
  matchSong({ uid, song_id, match_id }) {
    return get(`/cloud/match?uid=${uid}&sid=${song_id}&asid=${match_id}`)
  },
}
