<template>
  <aside class="admin-aside">
    <ul class="menu">
      <li>
        <h3 @click="goIndex">VueBlog</h3>
      </li>
      <li v-for="item in menu">
        <router-link :to="{path:item.path}" :title="item.name">{{item.name}}</router-link>
      </li>
      <li><a @click="logout">退出登录</a></li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: 'AdminAside',
  data () {
    return {
      menu: [
      // {
      //   name: '后台首页',
      //   path: '/admin'
      // }, {
      //   name: '发布文章',
      //   path: '/publish'
      // }, 
      {
        name: '修改信息',
        path: '/updateAdminInfo'
      }, {
        name: '修改密码',
        path: '/updateAdminPassword'
      },
      {
        name: '上传-新闻资讯',
        path: '/publishnews'
      },
      {
        name: '全部-新闻资讯',
        path: '/allNews'
      }, 
      {
        name: '上传-首页轮播图片',
        path: '/upIndexPic'
      },
      {
        name: '上传-今日推荐',
        path: '/upTodayRecommend'
      },
      {
        name: '上传-新品推荐',
        path: '/UpNewProdtct'
      }, {
        name: '上传-items',
        path: '/upItems'
      }, {
        name: '所有-items',
        path: '/allItems'
      },
      {
        name: '上传门店',
        path: '/upMendian'
      },
      {
        name: '所有门店信息',
        path: '/allMendian'
      },
      {
        name: '所有招商加盟信息',
        path: '/allJoinus'
      },
      {
        name: '上传-底部公司简介图片',
        path: '/upComIntrucPic'
      }
      ]
    }
  },
  methods: {
    logout () {
      this.axios.post('/logout').then((data) => {
        if (data.data.code === 200) {
          this.$router.push({ name: 'index' })
          this.$router.go(0)
        }
      })
    },
    goIndex () {
      this.$router.push({name: 'index'})
    }
  }
}
</script>