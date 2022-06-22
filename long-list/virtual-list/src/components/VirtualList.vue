<template>
  <!-- 能滚动的盒子 -->
  <div class="viewport" ref="viewport" @scroll="handleScroll">
    <!-- 自己做一个滚动条 -->
    <div class="scroll-bar" ref="scrollBar"></div>
    <!-- 真实渲染的内容 -->
    <div
      class="scroll-list"
      :style="{ transform: `translate3d(0, ${this.offset}px,0)` }"
    >
      <div v-for="item in visibleLists" :key="item.id">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList',
  props: ['size', 'remain', 'lists'],
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: ''
    }
  },
  computed: {
    visibleLists() {
      let start = this.start - this.prevCount
      let end = this.end + this.nextCount
      return this.lists.slice(start, end)
    },
    prevCount() {
      return Math.min(this.start, this.remain)
    },
    nextCount() {
      return Math.min(this.remain, this.lists.length - this.end)
    }
  },
  mounted() {
    this.$refs.viewport.style.height = this.size * this.remain + 'px'
    this.$refs.scrollBar.style.height = this.size * this.lists.length + 'px'
  },
  methods: {
    handleScroll() {
      // 算出来当前滚过去几个，当前应该从第几个开始显示
      const scrollTop = this.$refs.viewport.scrollTop
      this.start = Math.floor(scrollTop / this.size)
      this.end = this.start + this.remain
      // 显示区的偏移量 定位当前可视区域
      this.offset = this.start * this.size - this.size * this.prevCount
    }
  }
}
</script>

<style lang="scss" scoped>
.viewport {
  overflow-y: auto;
  position: relative;
  background: #b6efef;
  .scroll-bar {
  }
  .scroll-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
