<template>
  <div class="article">
    <my-header></my-header>
    <div class="container wrap">
      <news-detail></news-detail>
      <news-aside></news-aside>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import NewsAside from '../components/global/NewsAside.vue'
import NewsDetail from '../components/global/NewsDetail.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: '',
  components: {
    MyHeader,
    NewsAside,
    NewsDetail,
    MyFooter
  }
}
</script>