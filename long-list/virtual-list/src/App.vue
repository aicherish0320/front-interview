<template>
  <div id="app">
    <!-- size: 列表每一项有多高，因为需要根据 size 算出一个滚动条 -->
    <VirtualList :size="40" :remain="8" :lists="lists">
      <ListItem slot-scope="{ item }" :item="item"></ListItem>
    </VirtualList>
  </div>
</template>
``
<script>
import VirtualList from './components/VirtualList.vue'
import ListItem from './components/ListItem.vue'
const lists = []
for (let i = 0; i < 1000; i++) {
  lists.push({
    id: i,
    value: i
  })
}

export default {
  name: 'App',
  components: {
    VirtualList,
    ListItem
  },
  data() {
    return {
      lists
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
