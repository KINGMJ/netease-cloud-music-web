import { get } from './api-client'

export default {
  getSongs({ playlist_id }) {
    return get(`playlist/detail?id=${playlist_id}`)
  },
}
