import { ref } from 'vue'
import dayjs from 'dayjs'

/**
 * 一些工具函数，替代mixins
 */
export default function useUtils() {
  const dateFormat = time => {
    return dayjs(new Date(time)).format('YYYY-MM-DD')
  }

  const timeFormat = time => {
    return dayjs(new Date(time)).format('YYYY-MM-DD HH:mm')
  }

  const fileSizeFormat = fileSize => {
    if (!fileSize) {
      return ''
    }
    return (fileSize / 1000 / 1000).toFixed(1) + 'M'
  }

  const fileTypeFormat = fileName => {
    if (!fileName) {
      return ''
    }
    return fileName.split('.').pop().toLowerCase()
  }

  return {
    dateFormat,
    timeFormat,
    fileSizeFormat,
    fileTypeFormat,
  }
}
