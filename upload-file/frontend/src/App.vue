<script setup>
import { onMounted, ref } from 'vue'
import { useUploadFile } from './hooks/useUploadFile'
import { useImageType } from './hooks/useImageType'
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
  const ret = await useImageType(file.value)
  if (!ret) {
    alert('上传文件格式不对')
    return
  }
  const { progressVal } = await useUploadFile(file.value)
  uploadProgress.value = progressVal.value
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
