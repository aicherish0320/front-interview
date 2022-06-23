<script setup>
import { onMounted, ref } from 'vue'
import { useUploadFile } from './hooks/useUploadFile'
// 文件
const file = ref(null)
// 进度条
const uploadProgress = ref(0)
// 拖拽框
const dragRef = ref(null)

const handleFileChange = (e) => {
  const [selectFile] = e.target.files
  if (selectFile) {
    file.value = selectFile
  }
}

const uploadFile = async () => {
  const ret = await isImage(file.value)
  if (!ret) {
    alert('上传文件格式不对')
    return
  }
  const { progressVal } = await useUploadFile(file.value)
  uploadProgress.value = progressVal.value
}

const isImage = async (file) => {
  return (await isGif(file)) || (await isPng(file)) || (await isJpg(file))
}
const isGif = async (file) => {
  // '47 49 46 38 39 61'(GIF89a) 或者 '47 49 46 38 37 61'(GIF87a)
  const ret = await blobToString(file.slice(0, 6))
  return ['47 49 46 38 39 61', '47 49 46 38 37 61'].includes(ret)
}
const isPng = async (file) => {
  // '89 50 4E 47 0D 0A 1A 0A'(GIF89a)
  const ret = await blobToString(file.slice(0, 8))
  return ['89 50 4E 47 0D 0A 1A 0A'].includes(ret)
}
const isJpg = async (file) => {
  const start = await blobToString(file.slice(0, 2))
  const tail = await blobToString(file.slice(-2, file.size))
  return start === 'FF D8' && tail === 'FF D9'
}

const blobToString = async (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      // reader.result: GIF89a
      const ret = reader.result
        .split('')
        .map((v) => v.charCodeAt())
        .map((v) => v.toString(16).toUpperCase())
        .map((v) => v.padStart(2, '0'))
        .join(' ')
      resolve(ret)
    }
    reader.readAsBinaryString(blob)
  })
}

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
