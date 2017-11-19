<template>
  <header class="header">
    <div class="container info">
      <!-- <div class="nickname" @click="goIndex">{{ administrator.nickname }}</div> -->
      <div class="nickname" @click="goIndex">保罗赛特</div>
      <!-- <div class="intro">{{ administrator.intro }}</div> -->
      <div class="intro">回归自然 回归慢生活</div> 
    </div>
    
    <div class="tabbar">
        <div class="tab">
            <ul>
              <li v-for="(item,index) in links" :key="index" v-on:mouseenter="showa(1)">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </li>
            </ul>
            <div class="search">
              <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search"/>
            </div>
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
    <div class="pic">

    </div>
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
      }, {
        name: '新随笔',
        path: '/publish'
      }, {
        name: '管理',
        path: '/admin'
      }],
      searchInfo: ''
    }
  },
  computed: {
    administrator () {
      return this.$store.state.administrator
    }
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
    goIndex () {
      this.$router.push({name: 'index'})
    },
    showa(val){
      alert(val)
    }
  }
}
</script>