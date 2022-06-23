<script setup>
import axios from 'axios'
import { ref } from 'vue'

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

  const ret = await axios.post('http://localhost:3001/upload_file', form)
  console.log('ret >>> ', ret)
}
</script>

<template>
  <div class="app">
    <input name="file" type="file" @change="handleFileChange" />
    <button @click="uploadFile">上传</button>
  </div>
</template>

<style></style>
