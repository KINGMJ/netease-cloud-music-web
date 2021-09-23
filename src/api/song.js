import { get } from './api-client'

export default {
  getDetail({ song_ids }) {
    return get(`song/detail?ids=${song_ids}`)
  },
}
