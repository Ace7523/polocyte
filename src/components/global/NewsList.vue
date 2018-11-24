<template>
  <div class="article-list1">
    <ul class="items">
      <li v-for="(item,index) in data" class="item" :key="index">
        <router-link class="title" :to="{name:'news',params:{id:item.date}}">{{item.title}}</router-link>
        <article class="content">{{item.content | markdownParse | cutString(200)}}</article>
      </li>
    </ul>
    <div class="tips" v-if="data.length === 0 && this.$route.name === 'search'">
      <p>没有搜索到和<strong>{{ change }}</strong>相关的文章！</p>
    </div>
    <div class="tips" v-if="data.length === 0 && this.$route.name !== 'search'">
      <p>哇哦，一篇文章都没有!</p>
    </div>
    <div class="page" v-show="maxPage > 1">
      <router-link v-if="page > 1" :to="{name:type,params:{change:change,page:page - 1}}" class="prev">《上一页</router-link>
      <a v-else class="disabled prev">《上一页</a>
      <router-link v-if="hasMore" :to="{name:type,params:{change:change,page:page + 1}}" class="next">下一页》</router-link>
      <a v-else class="disabled next">下一页》</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  title () {
    return '保罗赛特'
  },
  beforeMount () {
    if (this.$root._isMounted) {
      this.listPage()
    }
  },
  mounted () {
    console.log(this.data)
  },
  data () {
    return {
      //   data:'',
      type:''
    }
  },
  // props: ['type'],
  computed: {
    data () {
      return this.$store.state.newsList
    },
    maxPage () {
      return Math.ceil(Number(this.$store.state.newsListLength) / 15)
    },
    change () {
      return this.$route.params.change
    },
    page () {
      return Number(this.$route.params.page) || 1
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },
  mounted() {
    // this.axios.get(`/articles`).then((data) => {
    //   this.data = data.data.result
    //   console.log(data)
    // })
  },
  watch: {
    $route (to, from) {
      this.listPage()
    }
  },
  methods: {
    // 点击分页后，重新获取数据
    listPage () {
      this.$bar.start()
      this.$store.dispatch('NEWS_LIST_PAGE').then(() => {
        this.$bar.finish()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.article-list1 {
  flex: 1;
  background-color: #FFF;
  padding: 15px 18px;
  .item+.item {
    border-top: 1px dashed #F1F1F1;
  }
  .title {
    font-size: 20px;
    margin: 15px auto;
    color: #3F301B;
  }
  .content {
    margin-bottom: 20px;
    color: #a5a5a5;
  }
  .tips {
    text-align: center;
    padding-top: 30px;
    font-size: 18px;
    strong {
      color: red;
    }
  }
}
</style>
