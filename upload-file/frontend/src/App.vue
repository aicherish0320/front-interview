<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const file = ref(null)

const handleFileChange = (e) => {
  const [selectFile] = e.target.files
  if (selectFile) {
    file.value = selectFile
  }
}

const uploadFile = async () => {
  const form = new FormData()
  form.append('name', 'file')
  form.append('file', file.value)

  await axios.post('http://localhost:3001/upload_file', form, {
    onUploadProgress: (progress) => {
      uploadProgress.value = Number(
        ((progress.loaded / progress.total) * 100).toFixed(2)
      )
    }
  })
}

const dragRef = ref(null)
const bindEvents = () => {
  const dragRegValue = dragRef.value
  dragRegValue.addEventListener('dragover', (e) => {
    dragRegValue.style.borderColor = 'red'
    e.preventDefault()
  })
  dragRegValue.addEventListener('drop', (e) => {
    e.preventDefault()
    const { files } = e.dataTransfer
    dragRegValue.style.borderColor = '#ccc'
    file.value = files[0]
    uploadFile()
  })
  dragRegValue.addEventListener('dragleave', (e) => {
    dragRegValue.style.borderColor = '#ccc'
    e.preventDefault()
  })
}
onMounted(() => {
  bindEvents()
})

// 进度条
const uploadProgress = ref(0)
</script>

<template>
  <div class="app">
    <div ref="dragRef" class="drag">
      <input name="file" type="file" @change="handleFileChange" />
    </div>
    <button @click="uploadFile">上传</button>
    <el-progress
      :percentage="uploadProgress"
      :text-inside="true"
      :stroke-width="40"
    />
  </div>
</template>

<style>
.drag {
  border: 2px dashed #ccc;
  width: 600px;
  height: 200px;
  line-height: 100px;
  text-align: center;
}
</style>
