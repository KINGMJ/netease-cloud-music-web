import axios from 'axios'
import Constant from '../constant'

axios.defaults.baseURL = Constant.API_URL

/**
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
