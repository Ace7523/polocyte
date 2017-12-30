<template>
  <div class="today-recommend">
    <div class="today-recommend-content">
        <div class="title">
          <p><span style="color:#555">|</span>&nbsp;&nbsp;今日推荐&nbsp;&nbsp;<span style="color:#555">|</span></p>
        </div>
        <!-- 今日推荐顶部 -->
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
        <!-- 今日推荐中间 -->
        <div class="content-middle">
          <div class="left">
            <div class="content">
               <h3>{{title2}}</h3>
               <p>{{desc2}}</p>
            </div>
          </div>
          <div class="right">

          </div>
        </div>
        <!-- 今日推荐底部 -->
        <div class="content-bottom">
          <div class="middle">
            <div class="content">
              <h3>{{title3}}</h3>
              <p>{{desc3}}</p>
            </div>
          </div>
          <div class="bottom">

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
      title3:'',
      desc1:'',
      desc2:'',
      desc3:''
    }
  },
  computed: {
    
  },
   mounted () {
      this.axios.get(`/uploadimagedesc`).then((data) => {
        let length = data.data.result.length;
        let result = data.data.result[length-1];
        this.title1 = result.title1;
        this.title2 = result.title2;
        this.title3 = result.title3;
        this.desc1 = result.desc1;
        this.desc2 = result.desc2;
        this.desc3 = result.desc3;
      })
  }
}
</script>
<style>
/* 左上角的图片 */
.today-recommend .content-top .left{
  height: 100%;
  background: url(../../../public/photoList/01.jpg) no-repeat;
  background-size: 100% 100%;
}
/* 右上角图片 */
.today-recommend .content-top .right{
  height: 100%;
  background: url(../../../public/photoList/02.jpg) no-repeat;
  background-size: 100% 100%;
}
/* 中间右侧图片 */
.today-recommend .content-middle .right{
  height: 100%;
  background: url(../../../public/photoList/03.jpg) no-repeat;
  background-size: 100% 100%;
}
/* 下边的大图 */
.today-recommend .content-bottom .bottom{
  height: 100%;
  background: url(../../../public/photoList/04.jpg) no-repeat;
  background-size: 100% 100%;
}
</style>
