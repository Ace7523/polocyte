<template>
  <div class="new-product">
    <div class="new-product-content">
        <div class="title">
          <p><span style="color:#555">|</span>&nbsp;&nbsp;新品推荐&nbsp;&nbsp;<span style="color:#555">|</span></p>
        </div>
        <div class="content-middle">
          <div class="left">
            
          </div>
          <div class="right">
            <div class="content">
               <h3>{{title2}}</h3>
               <p>{{desc2}}</p>
            </div>
          </div>
        </div>
        <div class="content-top">
          <div class="left">

          </div>
          <div class="middle">
            <div class="content">
              <h3>{{title1}}</h3>
              <p>{{desc1}}</p>
            </div>
          </div>
          <div class="right">

          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TodayRecommend',
  data () {
    return {
      title1:'',
      title2:'',
     
      desc1:'',
      desc2:'',
    
    }
  },
  computed: {
    
  },
   mounted () {
      this.axios.get(`/uploadimagedesc2`).then((data) => {
        let length = data.data.result.length;
        let result = data.data.result[length-1];
        this.title1 = result.title1;
        this.title2 = result.title2;
        
        this.desc1 = result.desc1;
        this.desc2 = result.desc2;
       
      })
  }
}
</script>
<style>
/* 左上角图片 */
.new-product .content-middle .left{
  height: 100%;
  background: url(../../../public/photoList/05.jpg) no-repeat;
  background-size: 100% 100%;
}
/* 中间左侧的图片 */
.new-product .content-top .left{
  height: 100%;
  background: url(../../../public/photoList/06.jpg) no-repeat;
  background-size: 100% 100%;
}
/* 中间右侧图片 */
.new-product .content-top .right{
  height: 100%;
  background: url(../../../public/photoList/07.jpg) no-repeat;
  background-size: 100% 100%;
}

</style>
