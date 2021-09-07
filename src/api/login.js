import { get } from './api-client'

export default {
  search() {
    return get('search?keywords=海阔天空')
  },

  list() {
    return get('top/playlist')
  },
}
