import { ref } from 'vue'

/**
 * 侧边栏的 navigation active 状态
 */
export default function useActiveNavigation() {
  const activeNavigation = ref(0)

  const setActiveNavigation = url => {
    activeNavigation.value = url
  }

  return {
    activeNavigation,
    setActiveNavigation,
  }
}
