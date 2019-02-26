<template>
  <div class="item-detail">
    <my-header></my-header>
    <div class="item-detail-wrap">
      <!-- {{itemData}} -->
      <div class="top-wrap">
        <div class="left-wrap">
          <img :src="imgUrl" alt="">
        </div>

        <div class="right-wrap">
          <div class="for-center">

            <p class="title">【{{itemData.itemName}}】</p>
            <p v-if="itemData.brand"><span class="title1">品牌 : </span>{{itemData.brand}}</p>
            <p v-if="itemData.series"><span class="title1">系列 : </span>{{itemData.series}}</p>
            <p v-if="itemData.itemNo"><span class="title1">货号 : </span>{{itemData.itemNo}}</p>
            <p v-if="itemData.status"><span class="title1">适用空间 : </span>{{itemData.status}}</p>
            <p v-if="itemData.klass"><span class="title1">类别 : </span>{{itemData.klass}}</p>
            <p v-if="itemData.material"><span class="title1">材质 : </span>{{itemData.material}}</p>
            <p v-if="itemData.standard"><span class="title1">规格 : </span>{{itemData.standard}}</p>
            <p v-if="itemData.styles"><span class="title1">风格 : </span>{{itemData.styles}}</p>
            <p v-if="itemData.color"><span class="title1">颜色 : </span>{{itemData.color}}</p>
            <p v-if="itemData.paint"><span class="title1">油漆性质 : </span>{{itemData.paint}}</p>
            <p v-if="itemData.feature1"><span class="title1">实木 : </span>{{itemData.feature1}}</p>
            <p v-if="itemData.feature2"><span class="title1">结构 : </span>{{itemData.feature2}}</p>
            <p v-if="itemData.isCanPersonal"><span class="title1">是否可定制 : </span>{{itemData.isCanPersonal}}</p>
            <p v-if="itemData.feature3"><span class="title1">甲醛释放量 : </span>{{itemData.feature3}}</p>
            <p v-if="itemData.productLoc"><span class="title1">产地 : </span>{{itemData.productLoc}}</p>
            
          </div>
          
        </div>
      </div>

      <div class="main-content">
        <div class="main-content-wrap">

          <p class="desc">
            <span>商品描述 : </span> 
            {{itemData.featuredesc}}
          </p>

          <div v-for="(item,index) in itemData.imageList" :key="index" class="img-list">
            <img :src="item" alt="">
          </div>
          <div v-if="itemData && itemData.imageList && itemData.imageList.length == 1" class="img-list">
            <img :src="imgUrl" alt="">
          </div>
          <div v-if="itemData && itemData.imageList && itemData.imageList.length == 1" class="img-list">
            <img :src="imgUrl" alt="">
          </div>

        </div>
      </div>
      
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: 'itemDetail',
  data(){
    return{
      itemData:{},
      imgUrl:''
     
    }
  },
  mounted () {
    if(localStorage['itemDetail']){
      let data = JSON.parse(localStorage['itemDetail']);
      this.itemData = data

      this.imgUrl = this.itemData.imageList[0]
    }
  },
  components: {
    MyHeader,
    MyFooter
  }
}
</script>