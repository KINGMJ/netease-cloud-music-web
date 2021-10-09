import { reactive, readonly, toRefs } from 'vue'
import Cookies from 'js-cookie'
import Constant from '../constant'

// 从cookie中取出用户profile
let profileFromCookie = Cookies.get(Constant.COOKIE_PROFILE_KEY)
// eslint-disable-next-line no-extra-boolean-cast
profileFromCookie = !!profileFromCookie
  ? JSON.parse(profileFromCookie)
  : {
      uid: null,
      nickname: '',
      avatarUrl: '',
    }

//用户属性
const initProfile = reactive(profileFromCookie)

const profile = readonly(initProfile)

export default function useProfile() {
  const setProfile = ({ userId, nickname, avatarUrl }) => {
    initProfile.uid = userId
    initProfile.nickname = nickname
    initProfile.avatarUrl = avatarUrl
    Cookies.set(
      Constant.COOKIE_PROFILE_KEY,
      JSON.stringify({
        uid: userId,
        nickname,
        avatarUrl,
      })
    )
  }

  return {
    ...toRefs(profile),
    setProfile,
  }
}
