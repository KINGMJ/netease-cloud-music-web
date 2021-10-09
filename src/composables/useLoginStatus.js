import { ref, computed } from 'vue'
import Cookies from 'js-cookie'
import Constant from '../constant'

const isLoggedIn = ref(!!Cookies.get(Constant.COOKIE_KEY))

const setIsLoggedIn = () => {
  isLoggedIn.value = !!Cookies.get(Constant.COOKIE_KEY)
}

export default function useLoginStatus() {
  return {
    isLoggedIn: computed(() => isLoggedIn.value),
    setIsLoggedIn,
  }
}
