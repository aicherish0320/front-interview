<script setup>
import { computed, onMounted, ref } from 'vue'
import { useUploadFile } from './hooks/useUploadFile'
import { useImageType } from './hooks/useImageType'
import SparkMD5 from 'spark-md5'
import axios from 'axios'

const CHUNK_SIZE = 1024 * 50

// 文件
const file = ref(null)
// 进度条
// const uploadProgress = ref(0)
const hashProgress = ref(0)
// 分片数据
const chunks = ref([])
// 拖拽框
const dragRef = ref(null)

const handleFileChange = (e) => {
  const [selectFile] = e.target.files
  if (selectFile) {
    file.value = selectFile
  }
}

const createFileChunk = (file, size = CHUNK_SIZE) => {
  let cur = 0
  while (cur < file.size) {
    chunks.value.push({
      index: cur,
      file: file.slice(cur, cur + size)
    })
    cur += CHUNK_SIZE
  }
}

const calculateHashWorker = (chunks) => {
  return new Promise((resolve) => {
    const worker = new Worker('/hash.js')
    worker.postMessage({ chunks: chunks.value })
    worker.onmessage = (e) => {
      const { progress, hash } = e.data
      console.log('progress >>> ', progress)
      hashProgress.value = Number(progress.toFixed(2))
      if (hash) {
        resolve(hash)
      }
    }
  })
}
// requestIdleCallback，此函数将在浏览器空闲时期被调用
const calculateHashIdle = (chunks) => {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer()
    let count = 0

    const appendToSpark = async (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = (e) => {
          spark.append(e.target.result)
          resolve()
        }
      })
    }

    const workLoop = async (deadLine) => {
      while (count < chunks.length && deadLine.timeRemaining() > 1) {
        await appendToSpark(chunks[count].file)
        count++
        if (count < chunks.length) {
          hashProgress.value = Number(
            ((100 * count) / chunks.length).toFixed(2)
          )
        } else {
          hashProgress.value = 100
          resolve(spark.end())
        }
      }
      requestIdleCallback(workLoop)
    }

    requestIdleCallback(workLoop)
  })
}

const uploadFile = async () => {
  // const ret = await useImageType(file.value)
  // if (!ret) {
  //   alert('上传文件格式不对')
  //   return
  // }

  createFileChunk(file.value)
  // const hash = await calculateHashWorker(chunks.value)
  // 023124c075fc91d598eac7bb0ad0bde9
  const hash = await calculateHashIdle(chunks.value)

  chunks.value = chunks.value.map((chunk, index) => ({
    hash,
    name: hash + '-' + index,
    index,
    chunk: chunk.file
  }))
  await uploadChunks(chunks.value)
  console.log('chunks >>> ', chunks.value)
  // const { progressVal } = await useUploadFile(file.value)
  // uploadProgress.value = progressVal.value
}

const uploadChunks = async (chunks) => {
  const requests = chunks
    .map((chunk, index) => {
      const form = new FormData()
      form.append('chunk', chunk.chunk)
      form.append('hash', chunk.hash)
      form.append('name', chunk.name)
      return form
    })
    .map((form, index) =>
      axios.post('http://localhost:3301/upload_file', form, {
        onUploadProgress: (progress) => {
          chunks[index].progress = Number(
            ((progress.loaded / progress.total) * 100).toFixed(2)
          )
        }
      })
    )

  await Promise.all(requests)
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

const cubeWidth = computed(() => {
  return Math.ceil(Math.sqrt(chunks.value.length)) * 36
})
const uploadProgress = computed(() => {
  if (!file.value || chunks.value.length) {
    return 0
  }
  const loaded = chunks
    .map((item) => item.chunk.size * item.progress)
    .reduce((acc, cur) => acc + cur, 0)
  return parseInt(((loaded * 100) / file.size).toFixed(2))
})
</script>

<template>
  <div class="app">
    <div ref="dragRef" class="drag">
      <input name="file" type="file" @change="handleFileChange" />
    </div>
    <button @click="uploadFile">上传</button>
    <!-- <div>
      <h3>上传进度</h3>
      <el-progress
        :percentage="uploadProgress"
        :text-inside="true"
        :stroke-width="40"
      />
    </div> -->
    <div>
      <h3>计算 hash 进度</h3>
      <el-progress
        :percentage="hashProgress"
        :text-inside="true"
        :stroke-width="40"
      />
    </div>
    <div>
      <div class="cube-container" :style="{ width: cubeWidth + 'px' }">
        <div class="cube" v-for="chunk in chunks" :key="chunk.name">
          <div
            :class="{
              uploading: chunk.progress > 0 && chunk.progress < 100,
              success: chunk.progress === 100,
              error: chunk.progress < 0
            }"
            :style="{ height: chunk.progress + '%' }"
          >
            <b v-if="chunk.progress > 0 && chunk.progress < 100">loading</b>
          </div>
        </div>
      </div>
    </div>
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
.cube-container {
}
.cube-container .cube {
  width: 32px;
  height: 32px;
  line-height: 30px;
  border: 1px solid red;
  background: #eee;
  float: left;
}
.cube-container .cube .success {
  background: green;
}
.cube-container .cube .error {
  background: red;
}
.cube-container .cube .uploading {
  background: blue;
}
</style>
