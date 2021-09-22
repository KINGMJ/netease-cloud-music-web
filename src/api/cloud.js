import { get, upload } from './api-client'

export default {
  getData({ limit = 200 }) {
    return get(`/user/cloud?limit=${limit}`)
  },

  getSongDetail({ song_id }) {
    return get(`/user/cloud/detail?id=${song_id}`)
  },

  //云盘歌曲信息匹
  matchSong({ uid, cloud_song_id, match_song_id }) {
    return get(`/cloud/match?uid=${uid}&sid=${cloud_song_id}&asid=${match_song_id}`)
  },

  // 云盘歌曲上传
  uploadSong({ file }) {
    return upload(`/cloud?time=${Date.now()}`, { payload: { songFile: file } })
  },
}
