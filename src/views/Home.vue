<template>
  <div class="home">网易云盘测试</div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import Api from '../api'

export default defineComponent({
  name: 'Home',
  setup() {
    onMounted(() => {
      console.log('213')
      Api.Login.list().then(res => {
        console.log(res)
      })
    })
  },
})
</script>
