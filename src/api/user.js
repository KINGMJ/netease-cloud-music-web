import { get } from './api-client'

export default {
  getPlaylist({ uid }) {
    return get(`user/playlist?uid=${uid}`)
  },
}
