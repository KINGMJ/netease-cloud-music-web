import { get } from './api-client'

export default {
  phoneLogin({ phone, password }) {
    return get(`/login/cellphone?phone=${phone}&password=${password}`)
  },
}
