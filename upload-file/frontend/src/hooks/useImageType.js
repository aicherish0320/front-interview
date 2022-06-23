export const useImageType = async (file) => {
  // const isImage = async (file) => {

  // }
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

  return (await isGif(file)) || (await isPng(file)) || (await isJpg(file))
}
