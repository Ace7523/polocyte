<template>
  <header class="header">
    <div class="container info">
      <!-- <div class="nickname" @click="goIndex">{{ administrator.nickname }}</div> -->
      <!-- <div class="nickname" @click="goIndex">保罗赛特</div> -->
      <!-- <div class="intro">{{ administrator.intro }}</div> -->
      <!-- <div class="intro">回归自然 回归慢生活</div>  -->
      <div class="for-logo"></div>
    </div>
    
    <div class="tabbar">
        <div class="tab">
            <ul>
              <li v-for="(item,index) in links" :key="index" v-on:mouseenter="showSubtab(index)">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </li>
            </ul>
            <!-- <div class="search">
              <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search"/>
            </div> -->
        </div>
    </div>
    <div class="subtab" v-show="showSubtabIndex == 0">
          <ul>
              <li>
                1
              </li>
              <li>
                2
              </li>
              <li>
                3
              </li>
            </ul>
        </div>
        <div class="subtab" v-show="showSubtabIndex == 1">
          <ul>
              <li>
                4
              </li>
              <li>
                5
              </li>
              <li>
                6
              </li>
            </ul>
        </div>
        <div class="subtab" v-show="showSubtabIndex == 2">
          <ul>
              <li>
                7
              </li>
              <li>
                8
              </li>
              <li>
                9
              </li>
            </ul>
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
        name: '全部商品',
        path: '/'
      },{
        name: '首页',
        path: '/'
      }, {
        name: '新随笔',
        path: '/publish'
      }, {
        name: '管理',
        path: '/admin'
      },{
        name: '客厅',
        path: '/'
      },{
        name: '卧房',
        path: '/'
      },{
        name: '餐厅',
        path: '/'
      },{
        name: '特别推荐',
        path: '/'
      }],
      searchInfo: '',
      showSubtabIndex:-1
    }
  },
  mounted () {
      
  },
  computed: {
    
  },
  methods: {
    search () {
      this.$router.push({
        name: 'search',
        params: {
          change: this.searchInfo
        }
      })
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
</style>