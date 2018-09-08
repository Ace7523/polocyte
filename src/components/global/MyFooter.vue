<template>
  <div class="footer">
    <div class="container">
      <div class="foot-des">
        <div>
          <p @click="jumpComponyIntroduction()">集团简介</p>
          <p @click="jumpBrandIntroduction()">品牌故事</p>
          <p @click="jumpHonorIntroduction()">资历荣耀</p>
          <p>咨询公示</p>
          <p>活动促销</p>
        </div>
        <div>
          <p>分销系统</p>
          <p>商学院</p>
          <p>门店查询</p>
          <p>招商加盟</p>
          <p>检测报告真伪查询</p>
        </div>
        <div>
          <p>在线客服</p>
          <p>常见问题</p>
          <p>保养贴士</p>
        </div>
        <div>
          <p>湛江玛珥湖投资发展有限公司</p>
          <p>湛江高尔夫职业技术学校</p>
          <p>蔓陀妮官方网站</p>
        </div>
        <div>
          <p>400-678-4057</p>
          <p>传真 0759-2673308</p>
          <p>微信（二维码）</p>
          <p>微博（二维码）</p>
        </div>
      </div>
      <div class="copy">
        <span>关于保罗赛特</span>
        <span>品牌新闻</span>
        <span>客服中心</span>
        <span>联系我们</span>
        <span>网站地图</span>
        <!-- <div class="licensed">Licensed under <a href="https://choosealicense.com/licenses/gpl-3.0/">GPL-3.0</a> license.</div> -->
        <!-- <div class="powered">Powered by <a href="https://github.com/wmui/vueblog">VueBlog</a>. Theme by <a href="https://github.com/wmui">wmui</a></div> -->
      </div>
      <div class="for-copyright">
        <p class="banquansuoyou">Copyright©2012 - All Right Reserved - 保罗赛特 ; &nbsp;&nbsp;实木选择,100%正品保证 ; &nbsp;&nbsp;官网所有者 : 广东信威绿色家居产业集团有限公司</p>
        <p class="beianhao">粤ICP 11079316号</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data(){
    return{
    }
  },
  mounted () {
  },
  methods: {
    jumpComponyIntroduction(){
      this.$router.push({name:'companyintroduce'})
    },
    jumpBrandIntroduction(){
      this.$router.push({name:'brandintroduce'})
    },
    jumpHonorIntroduction(){
      this.$router.push({name:'honorintroduce'})
    },
  },
  components: {
  }
}
</script>