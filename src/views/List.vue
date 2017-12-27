<template>
  <div class="list">
    <my-header></my-header>

    <!-- <div class="my-banner">
      <my-banner></my-banner>
    </div>
    <div class="today-recommend-wrap">
      <today-recommend></today-recommend>
    </div> -->
    <!-- <div class="new-product-wrap">
      新品介绍
      <new-products></new-products>
    </div> -->
    
    <!-- <div class="photolist">
      <photo-list></photo-list>
    </div> -->

    <div class="container wrap">
      <article-list></article-list>
      <my-aside></my-aside>
    </div>
    
    <!-- <my-footer></my-footer> -->
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import MyAside from '../components/global/MyAside.vue'
import MyBanner from '../components/global/MyBanner.vue'
import PhotoList from '../components/global/PhotoList.vue'
import TodayRecommend from '../components/global/TodayRecommend.vue'
import NewProducts from '../components/global/NewProducts.vue'
import ArticleList from '../components/global/ArticleList.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: 'List',
  components: {
    MyHeader,
    MyAside,
    PhotoList,
    ArticleList,
    MyFooter,
    MyBanner,
    TodayRecommend,
    NewProducts
  }
}
</script>