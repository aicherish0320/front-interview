<script setup>
import { onMounted, ref } from 'vue'
import { useUploadFile } from './hooks/useUploadFile'
import { useImageType } from './hooks/useImageType'
import SparkMD5 from 'spark-md5'

const CHUNK_SIZE = 1024 * 50

// 文件
const file = ref(null)
// 进度条
const uploadProgress = ref(0)
const hashProgress = ref(0)
// 拖拽框
const dragRef = ref(null)

const handleFileChange = (e) => {
  const [selectFile] = e.target.files
  if (selectFile) {
    file.value = selectFile
  }
}

const createFileChunk = (file, size = CHUNK_SIZE) => {
  const chunks = []
  let cur = 0
  while (cur < file.size) {
    chunks.push({
      index: cur,
      file: file.slice(cur, cur + size)
    })
    cur += CHUNK_SIZE
  }
  return chunks
}

const calculateHashWorker = (chunks) => {
  return new Promise((resolve) => {
    const worker = new Worker('/hash.js')
    worker.postMessage({ chunks })
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

  const chunks = createFileChunk(file.value)
  // const hash = await calculateHashWorker(chunks)
  // 023124c075fc91d598eac7bb0ad0bde9
  const hash = await calculateHashIdle(chunks)
  console.log('文件 hash >>> ', hash)
  return

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
    <div>
      <h3>上传进度</h3>
      <el-progress
        :percentage="uploadProgress"
        :text-inside="true"
        :stroke-width="40"
      />
    </div>
    <div>
      <h3>计算 hash 进度</h3>
      <el-progress
        :percentage="hashProgress"
        :text-inside="true"
        :stroke-width="40"
      />
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
</style>
