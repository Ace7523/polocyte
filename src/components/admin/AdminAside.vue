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
      menu: [{
        name: '后台首页',
        path: '/admin'
      }, {
        name: '发布文章',
        path: '/publish'
      }, {
        name: '修改信息',
        path: '/updateAdminInfo'
      }, {
        name: '修改密码',
        path: '/updateAdminPassword'
      }, {
        name: '上传-今日推荐',
        path: '/upTodayRecommend'
      },
      {
        name: '上传-新品推荐',
        path: '/UpNewProdtct'
      }, {
        name: '上传-items',
        path: '/upItems'
      }]
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