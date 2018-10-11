<template>
  <div class="list">
    <my-header></my-header>

    <div class="container wrap">
      <news-list></news-list>
      <news-aside></news-aside>
    </div>
    
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import NewsAside from '../components/global/NewsAside.vue'
import MyBanner from '../components/global/MyBanner.vue'
import PhotoList from '../components/global/PhotoList.vue'
import TodayRecommend from '../components/global/TodayRecommend.vue'
import NewProducts from '../components/global/NewProducts.vue'
import ArticleList from '../components/global/ArticleList.vue'
import NewsList from '../components/global/NewsList.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: '',
  components: {
    MyHeader,
    NewsAside,
    PhotoList,
    ArticleList,
    MyFooter,
    MyBanner,
    TodayRecommend,
    NewProducts,
    NewsList
  }
}
</script>