import { ref, computed } from 'vue'
import Api from '../api'
import Constant from '../constant'
import useProfile from '../composables/useProfile'

// 要上传的歌单歌曲
const uploadedSong = ref(null)

/**
 * 上传歌曲
 */
export default function useUploadSong() {
  const { uid } = useProfile()
  let fileUpdateTime = {}

  const uploadSong = event => {
    const files = event.target.files
    fileUpdateTime = {}
    let currentIndex = 0,
      fileLength = files.length
    for (const item of files) {
      currentIndex += 1
      upload(item, currentIndex, fileLength)
    }
  }

  const upload = async (file, currentIndx, fileLength) => {
    try {
      const res = await Api.Cloud.uploadSong({ file })
      handleUploadSuccess(res, file, currentIndx, fileLength)
    } catch (err) {
      handleUploadError(err, file, currentIndx, fileLength)
    }
  }

  const handleUploadSuccess = (res, file, currentIndx, fileLength) => {
    console.log(`${file.name} 上传成功`)
    if (currentIndx >= fileLength) {
      console.log('上传完毕')
      //上传完后的歌曲id
      const cloudSongId = res.privateCloud.songId
      //上传完后对云盘歌曲进行
      if (cloudSongId != uploadSong.value.id) {
        matchSong(cloudSongId, uploadSong.value.id)
      }
    }
  }

  const handleUploadError = (err, file, currentIndx, fileLength) => {
    fileUpdateTime[file.name] ? (fileUpdateTime[file.name] += 1) : (fileUpdateTime[file.name] = 1)
    if (fileUpdateTime[file.name] >= 4) {
      console.error(`丢，这首歌怎么都传不上：${file.name}`)
      return
    } else {
      console.error(`${file.name} 失败 ${fileUpdateTime[file.name]} 次`)
    }
    upload(file, currentIndx, fileLength)
  }

  const matchSong = async (cloud_song_id, match_song_id) => {
    await Api.Cloud.matchSong({ uid: uid.value, cloud_song_id, match_song_id })
  }

  const setUploadedSong = song => {
    uploadedSong.value = song
  }

  return {
    uploadSong,
    setUploadedSong,
    uploadedSong: computed(() => uploadedSong.value),
  }
}
