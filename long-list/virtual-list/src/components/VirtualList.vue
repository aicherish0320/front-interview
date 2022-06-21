<template>
  <!-- 能滚动的盒子 -->
  <div class="viewport" ref="viewport">
    <!-- 自己做一个滚动条 -->
    <div class="scroll-bar" ref="scrollBar"></div>
    <!-- 真实渲染的内容 -->
    <div class="scroll-list">
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
      end: this.remain
    }
  },
  computed: {
    visibleLists() {
      return this.lists.slice(this.start, this.end)
    }
  },
  mounted() {
    this.$refs.viewport.style.height = this.size * this.remain + 'px'
    this.$refs.scrollBar.style.height = this.size * this.lists.length + 'px'
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
