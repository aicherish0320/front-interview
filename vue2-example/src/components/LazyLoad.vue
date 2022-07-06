<template>
  <ul class="box">
    <li v-for="list in lists" :key="list.id">
      <img v-lazy="list" alt="img" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LazyLoad',
  data() {
    return {
      lists: []
    }
  },
  mounted() {
    this.getLists()
  },
  methods: {
    async getLists() {
      const ret = await fetch('http://localhost:3001/list')
      const data = await ret.json()
      this.lists = data
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 400px;
  overflow-y: scroll;
  li {
    margin-bottom: 10px;
  }
  img {
    width: 200px;
    height: 140px;
  }
}
</style>
