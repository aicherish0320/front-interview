import { ref } from 'vue'
import axios from 'axios'

export const useUploadFile = async (file) => {
  const form = new FormData()
  form.append('name', 'file')
  form.append('file', file)

  const progressVal = ref(0)

  await axios.post('http://localhost:3001/upload_file', form, {
    onUploadProgress: (progress) => {
      progressVal.value = Number(
        ((progress.loaded / progress.total) * 100).toFixed(2)
      )
    }
  })

  return {
    progressVal
  }
}
