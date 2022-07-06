<template>
  <div class="home">
    <VueLazyLoad></VueLazyLoad>
  </div>
</template>

<script>
import VueLazyLoad from '@/components/LazyLoad.vue'
export default {
  name: 'HomeView',
  components: { VueLazyLoad }
}
</script>
