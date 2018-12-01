<template>
  <div class="list">
    <my-header></my-header>
    <div class="my-banner" v-if="showBanner">
      <my-banner2></my-banner2>
    </div>
    <div class="today-recommend-wrap">
      <today-recommend></today-recommend>
    </div>
    <div class="new-product-wrap">
      <new-products></new-products>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import MyBanner2 from '../components/global/MyBanner2.vue'
import TodayRecommend from '../components/global/TodayRecommend.vue'
import NewProducts from '../components/global/NewProducts.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: 'List',
  data(){
    return {
      showBanner: false
    }
  },
  mounted() {
    this.showBanner = true
  },
  components: {
    MyHeader,
    MyFooter,
    TodayRecommend,
    NewProducts,
    MyBanner2
  }
}
</script>