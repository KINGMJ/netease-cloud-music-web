import { ref } from 'vue'
import dayjs from 'dayjs'
/**
 * 一些工具函数，替代mixins
 */
export default function useUtils() {
  const parseDate = time => {
    return dayjs(new Date(time)).format('YYYY-MM-DD')
  }

  const parseTime = time => {
    return dayjs(new Date(time)).format('YYYY-MM-DD HH:mm')
  }

  return {
    parseDate,
    parseTime,
  }
}
