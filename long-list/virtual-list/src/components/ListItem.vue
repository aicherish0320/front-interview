<template>
  <div style="height: 40px; border-bottom: 1px solid red">{{ item.value }}</div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['item']
}
</script>

<style lang="scss" scoped></style>
