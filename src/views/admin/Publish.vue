<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="essay">
        <div class="form">
          <div class="title">
            <input type="text" v-model="title" placeholder="文章标题" autofocus>
          </div>
          <div class="content">
            <top-editor v-model="content" :upload="upload" :options="options"></top-editor>
          </div>
          <div class="bottom">
            <div class="tag">
              <input type="text" v-model="tag" placeholder="多个标签以英文逗号分隔">
            </div>
            <div class="btn">
              <button type="button" @click="publish">发布</button>
              <button type="button" @click="draft">存草稿</button>
            </div>
          </div>
          <div class="tags">
            <span>选择已有标签: </span>
            <span v-for="(item,index) in tags" :key="index" @click="chooseTag(item)"><a>{{item.tag}}</a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
import hljs from 'highlight.js'
export default {
  name: 'Publish',
  data () {
    return {
      title: '',
      content: '',
      tag: '',
      date: '',
      imageList:[],
      articleID: this.$route.params.id,
      upload: {
        url: 'http://localhost:8080/api/upload'
      },
      options: {
        linkify: true,
        highlight(str, lang) {
          lang = lang || 'javascript'
          if (hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    }
  },

  mounted () {
    if (this.articleID) {
      this.axios.get(`/article?id=${this.articleID}`).then((data) => {
        let result = data.data.result[0]
        this.title = result.title
        this.content = result.content
        console.log("文章内容",this.content)
        let index = -1 ;
        let urlList = [];
        let urlEndList = [];
        do {
          index = this.content.indexOf("![](", index + 1); //使用第二个参数index+1，控制每一次查找都是从上一次查找到字符a的下一个索引位置开始
          if (index != -1) { //可以找到字符i
          urlList.push(index);
          console.log(index); //输出a的位置
          }
        } while (index != -1);
        do {
          index = this.content.indexOf(")", index + 1); //使用第二个参数index+1，控制每一次查找都是从上一次查找到字符a的下一个索引位置开始
          if (index != -1) { //可以找到字符i
          urlEndList.push(index)
          console.log(index); //输出a的位置
          }
        } while (index != -1);

        console.log(urlList)
        console.log(urlEndList)

        for(let i =0 ; i<urlList.length; i++){
          // console.log(this.content.substring(urlList[i]+4,urlEndList[i]))
          this.imageList.push(this.content.substring(urlList[i]+4,urlEndList[i]))
          console.log(this.imageList);
        }

        let tag = result.tag
        this.tag = tag.join(',') + ','
        this.date = result.date
      })
    }
  },
  methods: {
    // 发布文章
    publish () {
      if (!this.title) {
        this.$toast('文章标题不能为空！')
        return
      }
      if (!this.content) {
        this.$toast('文章正文不能为空！')
        return
      }

      this.axios.post('/article', {
        'title': this.title,
        'content': this.content,
        'tag': this.trim(this.tag),
        'state': 'publish',
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        this.$router.push({
          name: 'admin'
        })
      })
    },

    // 保存为草稿
    draft () {
      this.axios.post('/article', {
        'title': this.title,
        'content': this.content,
        'tag': this.trim(this.tag),
        'state': 'draft',
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        this.$router.push({
          name: 'admin'
        })
      })
    },

    // 把多个标签分割成数组
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)|(,$)/g, '').split(',')
    },

    // 选择已有标签
    chooseTag (item) {
      this.tag = this.tag + item.tag + ','
    }
  },
  components: {
    AdminAside
  },
  computed: {
    tags () {
      return this.$store.state.tags
    }
  },
  asyncData ({
    store,
    route
  }) {
    return store.dispatch('TAGS')
  }
}
</script>
<style>
@import '~highlight.js/styles/github.css';
</style>