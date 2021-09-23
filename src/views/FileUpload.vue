<template>
  <input type="file" multiple @change="uploadFile" />

  <button @click="uploadFileByClick">上传测试</button>

  <input
    type="file"
    class="dz-hidden-input"
    tabindex="-1"
    ref="testInput"
    style="visibility: hidden; position: absolute; top: 0px; left: 0px; height: 0px; width: 0px"
    @change="uploadFile"
  />
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  setup() {
    // const uid = 372063478
    let fileUpdateTime = {}
    const testInput = ref(null)

    const uploadFile = event => {
      const files = event.target.files
      fileUpdateTime = {}
      console.group('上传的文件')
      console.log(files)
      console.groupEnd()

      let currentIndex = 0,
        fileLength = files.length
      for (const item of files) {
        currentIndex += 1
        upload(item, currentIndex, fileLength)
      }
    }

    const upload = (file, currentIndx, fileLength) => {
      const formData = new FormData()
      formData.append('songFile', file)
      axios({
        method: 'post',
        url: `http://localhost:3000/cloud?time=${Date.now()}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
        .then(res => {
          console.log(`${file.name} 上传成功`)
          console.log(res)
          if (currentIndx >= fileLength) {
            console.log('上传完毕')

            //上传完后的歌曲id
            console.log(res.data.privateCloud.songId)
          }
        })
        .catch(async err => {
          console.log(err)
          console.log(fileUpdateTime)
          fileUpdateTime[file.name] ? (fileUpdateTime[file.name] += 1) : (fileUpdateTime[file.name] = 1)
          if (fileUpdateTime[file.name] >= 4) {
            console.error(`丢，这首歌怎么都传不上：${file.name}`)
            return
          } else {
            console.error(`${file.name} 失败 ${fileUpdateTime[file.name]} 次`)
          }
          upload(file, currentIndx, fileLength)
        })
    }

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(testInput.value) // <div>This is a root element</div>
    })
    const uploadFileByClick = () => {
      const element = testInput.value
      console.log(element)
      element.value = ''
      element.click()
    }

    return { uploadFile, uploadFileByClick, testInput }
  },
})
</script>
