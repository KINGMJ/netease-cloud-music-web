import { reactive, readonly, toRefs } from 'vue'
import Api from '../api'
import Constant from '../constant'
import Cookies from 'js-cookie'

//用户属性
const initProfile = reactive({
  uid: null,
  nickname: '',
  avatarUrl: '',
})

const profile = readonly(initProfile)

export default function useProfile() {
  const isLoggedIn = () => {
    return !!Cookies.get(Constant.COOKIE_KEY)
  }

  const setProfile = ({ userId, nickname, avatarUrl }) => {
    initProfile.uid = userId
    initProfile.nickname = nickname
    initProfile.avatarUrl = avatarUrl
  }

  return {
    ...toRefs(profile),
    isLoggedIn,
    setProfile,
  }
}
