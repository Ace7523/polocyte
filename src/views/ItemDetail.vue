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
            <p>品牌 : {{itemData.brand}}</p>
            <p>系列 : {{itemData.series}}</p>
            <p>货号 : {{itemData.itemNo}}</p>
            <p>适用空间 : {{itemData.status}}</p>
            <p>类别 : {{itemData.klass}}</p>
            <p>材质 : {{itemData.material}}</p>
            <p>规格 : {{itemData.standard}}</p>
            <p>风格 : {{itemData.styles}}</p>
            <p>颜色 : {{itemData.color}}</p>
            <p>油漆性质 : {{itemData.paint}}</p>
            <p>实木 : {{itemData.feature1}}</p>
            <p>结构 : {{itemData.feature2}}</p>
            <p>是否可定制 : {{itemData.isCanPersonal}}</p>
            <p>甲醛释放量 : {{itemData.feature3}}</p>
            <p>产地 : {{itemData.productLoc}}</p>
            
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
          <div v-if="itemData.imageList.length == 1" class="img-list">
            <img :src="imgUrl" alt="">
          </div>
          <div v-if="itemData.imageList.length == 1" class="img-list">
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