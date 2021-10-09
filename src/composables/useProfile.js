import { reactive, readonly, toRefs } from 'vue'

//用户属性
const initProfile = reactive({
  uid: null,
  nickname: '',
  avatarUrl: '',
})

const profile = readonly(initProfile)

export default function useProfile() {
  const setProfile = ({ userId, nickname, avatarUrl }) => {
    initProfile.uid = userId
    initProfile.nickname = nickname
    initProfile.avatarUrl = avatarUrl
  }

  return {
    ...toRefs(profile),
    setProfile,
  }
}
