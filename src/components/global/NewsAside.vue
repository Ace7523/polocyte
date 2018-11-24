<template>
  <aside class="aside">
    <div class="tags">
      <div class="title">分类</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in tags" :key="index">
            <router-link :to="{name:'newslistbytag',params:{change:item.tag}}">{{item.tag}} <span class="desc">(共{{item.count}}篇)</span></router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="archives">
      <div class="title">日期归档</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in archives" :key="index">
            <router-link :to="{name:'newslistbytime',params:{change:item.date}}">{{item.date | formatArchive }} <span class="desc">(共{{item.count}}篇)</span></router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'MyAside',
  data () {
    return {
      tags:'',
      archives:''
    }
  },
  computed: {
    // tags () {
    //   return this.$store.state.tags
    // },
    // archives () {
    //   return this.$store.state.archives
    // }
  },
  mounted() {
    // this.axios.get(`/tags`).then((data) => {
    //   this.tags = data.data.result
    //   console.log(data)
    // })
    // this.axios.get(`/archives`).then((data) => {
    //   console.log(data)
    //   this.archives = data.data.result
    // })
    this.axios.get(`/tagnames`).then((data) => {
      console.log('tagnames')
      console.log(data)
      this.tags = data.data.result
    })
    this.axios.get(`/publishdates`).then((data) => {
      console.log('publishdates')
      console.log(data)
      this.archives = data.data.result
    })
  },
  methods: {
  }
}
</script>