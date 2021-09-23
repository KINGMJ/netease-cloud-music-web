import axios from 'axios'
import Constant from '../constant'

axios.defaults.baseURL = Constant.API_URL
axios.defaults.withCredentials = true

export function get(url, params) {
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

export function post(url, params) {
  const { payload, isUpload } = params

  console.log(isUpload)
  return new Promise((resolve, reject) => {
    const options = {
      headers: {},
      transformRequest: [
        data => {
          const formData = new FormData()
          for (const item in data) {
            formData.append(item, data[item])
          }
          return formData
        },
      ],
    }
    if (isUpload) {
      options.headers = { 'Content-Type': 'multipart/form-data' }
    }

    axios
      .post(url, payload, options)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function upload(url, params) {
  return post(url, { ...params, isUpload: true })
}
