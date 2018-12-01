<template>
  <header class="header">
    <div class="container info">
      <!-- <div class="nickname" @click="goIndex">{{ administrator.nickname }}</div> -->
      <!-- <div class="nickname" @click="goIndex">保罗赛特</div> -->
      <!-- <div class="intro">{{ administrator.intro }}</div> -->
      <!-- <div class="intro">回归自然 回归慢生活</div>  -->
      <div class="for-logo"></div>
      <div class="intro">回归自然 回归慢生活</div>
    </div>
    
    <div class="tabbar">
      <div class="tab" @click='clickRoute'>
          <ul>
            <li>
              <router-link :to="`/index`">首页</router-link>
            </li>
            
            <li v-on:mouseenter="showSubtab(2)">
              <router-link :to="`1`">系列</router-link>
              <transition name="fold">
              <div class="box" v-show="showSubtabIndex == 2" v-on:mouseleave="showSubtab(-1)"> 
                 <p class="item" v-for="(item,index) in allstates.series" :key="index">
                    <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'series':item.tag} }}">{{item.tag}} ({{item.count}})</router-link>
                </p>
              </div>
              </transition>
            </li>

            <li v-on:mouseenter="showSubtab(3)" v-on:mouseleave="showSubtab(-1)">
              <router-link :to="`2`">适用空间</router-link>
              <transition name="fold">
              <div class="box" v-show="showSubtabIndex == 3"> 
                 <p class="item" v-for="(item,index) in allstates.statuses" :key="index">
                    <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'status':item.tag} }}">{{item.tag}} ({{item.count}})</router-link>
                 </p>
              </div>
              </transition>
            </li>

            <li v-on:mouseenter="showSubtab(4)" v-on:mouseleave="showSubtab(-1)">
              <router-link :to="`3`">分类</router-link>
              <transition name="fold">
              <div class="box" v-show="showSubtabIndex == 4"> 
                  <p class="item" v-for="(item,index) in allstates.klasses" :key="index">
                    <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'klass':item.tag} }}">{{item.tag}} ({{item.count}})</router-link>
                  </p>
              </div>
              </transition>
            </li>

            <li>
              <router-link :to="{name:'nstest',params:{page:1}}">全部商品</router-link>
            </li>

            <li>
              <router-link :to="{name:'newslist',params:{page:1}}">新闻资讯</router-link>
            </li>
          </ul>
      </div>
    </div>
    <!-- <nav class="container nav">
      <ul>
        <li v-for="(item,index) in links" :key="index">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="search">
        <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search"/>
      </div>
    </nav> -->
  </header>
</template>
<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      links: [{
        name: '首页',
        path: '/'
      },  {
        name: '管理',
        path: '/admin'
      },{
        name: 'nstest',
        path: '/nstest'
      }],
      searchInfo: '',
      showSubtabIndex:-1,
      allstates:{}
    }
  },
  mounted () {
      this.getAllState();
  },
  computed: {
    
  },
  methods: {
    getAllState () {
      this.axios.get('/getAllStates', {
       
      }).then((result) => {
        let that = this
        if (result.data.code === 200) {
          this.allstates = result.data.result
        } else {
          this.$toast(result.data.message)
        }
      })
    },
    search () {
      this.$router.push({
        name: 'search',
        params: {
          change: this.searchInfo
        }
      })
    },
    clickRoute () {
      //todo 清空searchParams 的条件只在这里复位应该不全，应该是离开筛选页就清空
      localStorage.setItem('searchParams','')
    },
    showSubtab(val){
      this.showSubtabIndex = val;
    }, 
  }
}
</script>
<style>
  .for-logo{
    width: 200px;
    height: 40px;
    margin: 0 auto;
    background: url(../../../public/indexPicture/indexLogo.jpg) no-repeat;
    background-size: 100%;
  }
  .intro{
    text-align: center;
    position: relative;
    left: 86px;
    top: 2px;
    line-height: 20px;
    font-family: 16px;
    color: #3F301B;
    font-weight: bold;
    font-family: "楷体","楷体_GB2312";
  }
</style>