import { get } from './api-client'

export default {
  getData({ limit = 200 }) {
    return get(`/user/cloud?limit=${limit}`)
  },
}
