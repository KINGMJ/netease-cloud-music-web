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


  return {
    dateFormat,
    timeFormat,
  }
}
