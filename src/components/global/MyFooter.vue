<template>
  <div class="footer">
    <div class="container">
      <div class="foot-des">
        <div>
          <p @click="jumpComponyIntroduction()">集团简介</p>
          <p @click="jumpBrandIntroduction()">品牌故事</p>
          <p @click="jumpHonorIntroduction()">资历荣耀</p>
          <p @click="jumpzxgs()">咨询公示</p>
        </div>
        <div>
          <p @click='jump5()'>分销系统</p>
          <p @click='jumpShangxueyuan()'>商学院</p>
          <p @click='jumpmendian()'>门店查询</p>
          <p @click='joinus()'>招商加盟</p>
        </div>
        <div>
          <p @click='jump4()'>检测报告真伪查询</p>
          <p @click='jumpwenti()'>常见问题</p>
          <p @click='jumpbaoyang()'>保养贴士</p>
        </div>
        <div class="img-wrap">
          <p v-on:mouseenter="showwx = true" v-on:mouseleave="showwx = false">微信(二维码)</p>
          <p v-on:mouseenter="showwb = true" v-on:mouseleave="showwb = false">微博(二维码)</p>
          <p @click="jump3()">蔓陀妮官方网站</p>
          <div class="wx" v-if="showwx"></div>
          <div class="wb" v-if="showwb"></div>
        </div>
        <div>
          <p>电话 400-678-4057</p>
          <p>传真 0759-2673308</p>
        </div>
      </div>
      <!-- <div class="copy">
        <span>关于保罗赛特</span>
        <span>品牌新闻</span>
        <span>客服中心</span>
        <span>联系我们</span>
        <span>网站地图</span> -->
        <!-- <div class="licensed">Licensed under <a href="https://choosealicense.com/licenses/gpl-3.0/">GPL-3.0</a> license.</div> -->
        <!-- <div class="powered">Powered by <a href="https://github.com/wmui/vueblog">VueBlog</a>. Theme by <a href="https://github.com/wmui">wmui</a></div> -->
      <!-- </div> -->
      <div class="for-copyright">
        <p class="banquansuoyou">Copyright©2012 - All Right Reserved - 保罗赛特 ; &nbsp;&nbsp;实木选择,100%正品保证 ; &nbsp;&nbsp;官网所有者 : 广东信威绿色家居产业集团有限公司</p>
        <p class="beianhao">粤ICP 11079316号</p>
        <iframe src="http://wljg.gdgs.gov.cn/lz.ashx?vie=41BEF320E537FBF5AF4B33C338D85F06DAC5E7E55E66F6C3048BE2CE769324252F7F46CC5CDF24E1392CCA6D906BC53C" scrolling="no" style="overflow:hidden;padding-left:180px" frameborder="0" allowtransparency="true"></iframe>        
      </div>
    </div>
    <div class="mask" v-if="showMask">
      <div class="content">
        <div class="close-wrap"  @click="showMask = false">
          <div class="close"></div>
        </div>
        <h3>财富之路</h3>
        <p>请您留下联系方式，我们的客服人员会尽快安排相应区域负责人和您联系。</p>
        <div class="name">
          姓名：<input type="text" v-model="name" placeholder="请输入姓名">
        </div>
        <div class="phone">
          手机：<input type="text" v-model="phone" placeholder="请输入手机号码">
        </div>
        <div class="city">
          城市：<input type="text" v-model="city" placeholder="请输入您所在城市">
        </div>
        <div class="remark">
          <span>备注：</span> <textarea type="text" v-model="remark" placeholder="请输入备注（选填）"></textarea>
        </div>
        <div class="btn" @click="submit"> 提交 </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data(){
    return{
      showwx: false,
      showwb: false,
      showMask: false,
      name:'',
      phone:'',
      city:'',
      remark:''
    }
  },
  // <router-link :to="{name:'newslistbytag',params:{change:item.tag}}">{{item.tag}} ({{item.count}})</router-link>
  mounted () {
    
  },
  methods: {
    jumpbaoyang() {
      this.$router.push({name:'newslistbytag',params:{change:'保养贴士'}})
    },
    jumpzxgs() {
      this.$router.push({name:'newslistbytag',params:{change:'咨询公示'}})
    },
    jumpwenti() {
      this.$router.push({name:'newslistbytag',params:{change:'常见问题'}})
    },
    jumpComponyIntroduction(){
      this.$router.push({name:'companyintroduce'})
    },
    jumpBrandIntroduction(){
      this.$router.push({name:'brandintroduce'})
    },
    jumpHonorIntroduction(){
      this.$router.push({name:'honorintroduce'})
    },
    jumpmendian(){
      this.$router.push({name:'mendiansearch'})
    },
    jumpShangxueyuan(){
      this.$router.push({name:'shangxueyuan'})
    },
    jump3(){
      window.open('http://www.mantolin.com/');
    },
    jump4(){
      window.open('http://gqi.org.cn/gqicqs/jsp/web/certquery/NonCECertQuery.xhtml');
    },
    jump5(){
      window.open('http://yx.sunwin.co:5179/polocyte/theme/fix/LoginForm.jsp');
    },
    joinus(){
      this.showMask = true
    },
    submit(){
      if(this.city == ''|| this.name == ''|| this.phone == '') {
        alert('请填写完整信息')
        return
      }
      this.axios.post('/upJoinus', {
          city: this.city,
          name: this.name,
          phone: this.phone,
          remark: this.remark,
          date:  Date.now()
      }).then((result) => {
        console.log(result)
        if(result && result.data && result.data.code == 200){
          alert("提交成功")
        } else {
          alert("服务器异常 请稍后再试")
        }
        this.showMask = false
      })
    }
  },
  components: {
  }
}
</script>
<style>
.foot-des p{
  cursor: pointer;
  margin-bottom: 4px;
}
.mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 60px;
  background-color: rgba(0, 0, 0, .75);
  box-sizing: border-box;
  overflow: auto;
}
.mask .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  border-radius: 10px;
  background: #ffffff;
  text-align: center;
}
.mask .content .close {
  display: inline-block;
  width: 30px;
  height:2px;
  background: #a5a5a5;
  line-height: 0;
  font-size:0;
  vertical-align: middle;
  -webkit-transform: rotate(45deg);
}
.mask .content .close-wrap {
  position: absolute;
  right: 35px;
  width: 100px;
  height: 100px;
  top: -10px;
  z-index: 9;
  cursor: pointer;
}
.mask .content .close:after{
  content:'/';
  display:block;
  width: 30px;
  height:2px;
  background: #a5a5a5;
  -webkit-transform: rotate(-90deg);
}
.mask .content h3 {
  padding-top: 40px;
  z-index: 11;
}
.mask .content p {
  margin-top: 20px; 
}
.mask .content div{
  margin-top: 20px; 
}
.mask .content input{
  width: 200px;
  font-size: 14px;
}
.mask .content textarea{
   width: 200px;
   font-size: 14px;
}
.mask .content .remark span{
  position: relative;
  top: -13px;
}
.mask .content .btn{
  background: #a5a5a5;
  color: #ffffff;
  width: 40px;
  margin: 20px auto 0;
  padding: 5px 20px;
  border-radius: 3px;
  cursor: pointer;
}
.img-wrap{
  position: relative;
}
.img-wrap .wx{
  width: 140px;
  height: 140px;
  background: url(../../../public/footerPic/wx.jpg) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 110px;
  top: -15px;
}
.img-wrap .wb{
  width: 140px;
  height: 140px;
  background: url(../../../public/footerPic/wb.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 110px;
  top: 30px;
}
</style>
