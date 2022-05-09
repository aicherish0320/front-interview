function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function () {
      resolve(this.responseText)
    })
    xhr.open('GET', url)
    xhr.send()
  })
}

ajax('/api/users').then((val) => {
  console.log(val)
})
