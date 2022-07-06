export default {
  install(Vue, options) {
    const LazyClass = lazy(Vue)
    const instance = new LazyClass(options)

    Vue.directive('lazy', {
      bind: instance.add.bind(instance),
      unbind: instance.unbind.bind(instance)
    })
  }
}

function lazy(Vue) {
  function getScrollParent(el) {
    let parent = el.parentNode
    while (parent) {
      if (/(scroll)|(auto)/.test(getComputedStyle(parent)['overflow'])) {
        return parent
      }
      parent = parent.parentNode
    }
    return null
  }

  function render(imgListener, state) {
    const el = imgListener.el
    switch (state) {
      case 'loading':
        el.src = imgListener.options.loading
        break
      case 'loaded':
        el.src = imgListener.src
        break
      default:
        break
    }
  }

  function loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.src = src
      img.onload = resolve
      img.onerror = reject
    })
  }

  class ReactiveListener {
    constructor(el, src, options) {
      this.el = el
      this.src = src
      this.options = options
      this.state = {
        loading: false
      }
    }
    checkInView() {
      const { top } = this.el.getBoundingClientRect()
      return top < window.innerHeight * this.options.preLoad
    }
    load() {
      render(this, 'loading')

      loadImg(this.src)
        .then(() => {
          this.state.loading = true
          render(this, 'loaded')
        })
        .catch(() => {
          this.state.loading = true
        })
    }
  }

  return class LazyClass {
    constructor(options) {
      this.options = options
      this.hasScrollHandler = false
      this.queue = []
    }
    lazyLoadHandler() {
      this.queue.forEach((imgListener) => {
        if (imgListener.state.loading) return
        imgListener.checkInView() && imgListener.load()
      })
    }
    add(el, binding, vNode) {
      Vue.nextTick(() => {
        const imgListener = new ReactiveListener(
          el,
          binding.value,
          this.options
        )
        this.queue.push(imgListener)
        if (!this.hasScrollHandler) {
          const ele = getScrollParent(el)
          ele.addEventListener('scroll', this.lazyLoadHandler.bind(this), {
            passive: true
          })
          this.hasScrollHandler = true
        }
        this.lazyLoadHandler()
      })
    }
    unbind(el) {}
  }
}
