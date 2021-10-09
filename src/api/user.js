import { get } from './api-client'

export default {
  getPlaylists({ uid }) {
    return get(`user/playlist?uid=${uid}`)
  },
}
