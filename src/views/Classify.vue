<template>
  <div class="article">
    
    <div class="container wrap" style="margin-top:40px">
      <h4>这是分类汇总页</h4>
      <my-navigation></my-navigation>
      <my-classify></my-classify>
    </div>
  </div>
</template>
<script>
import MyNavigation from '../components/global/MyNavigation.vue'
import MyClassify from '../components/global/MyClassify.vue'
export default {
  name: 'Search',
  components: {
    MyNavigation,
    MyClassify
  }
}
</script>