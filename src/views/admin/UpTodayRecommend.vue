<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="essay">
        <div class="form">
          <!-- 首屏今日推荐部分 -->
          <div class="title">
            <input type="text" v-model="title1" placeholder="今日推荐顶标题" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="desc1" placeholder="今日推荐顶描述" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="title2" placeholder="今日推荐中部标题" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="desc2" placeholder="今日推荐中部描述" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="title3" placeholder="今日推荐底部标题" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="desc3" placeholder="今日推荐底部描述" autofocus>
          </div>

          <div class="content">
            <top-editor v-model="content" :upload="uploadimage" :options="options"></top-editor>
          </div>
           <div class="content">
            <top-editor v-model="content" :upload="uploadimage2" :options="options"></top-editor>
          </div>
           <div class="content">
            <top-editor v-model="content" :upload="uploadimage3" :options="options"></top-editor>
          </div>
           <div class="content">
            <top-editor v-model="content" :upload="uploadimage4" :options="options"></top-editor>
          </div>

          <button type="button" @click="upimagedesc">上传图片的描述</button>
          <!-- 首屏今日推荐部分 结束 -->
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
      content: '',
      date: '',
      title1:'',
      title2:'',
      title3:'',
      desc1:'',
      desc2:'',
      desc3:'',
      uploadimage: {
        url: 'http://localhost:8080/api/uploadimage?index=1'
      },
       uploadimage2: {
        url: 'http://localhost:8080/api/uploadimage?index=2'
      },
       uploadimage3: {
        url: 'http://localhost:8080/api/uploadimage?index=3'
      },
       uploadimage4: {
        url: 'http://localhost:8080/api/uploadimage?index=4'
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
    
  },
  methods: {
    upimagedesc(){
      this.axios.post('/uploadimagedesc', {
        'title1':this.title1,
        'title2':this.title2,
        'title3':this.title3,
        'desc1':this.desc1,
        'desc2':this.desc2,
        'desc3':this.desc3,
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        alert("上传成功")
      })
    },
  },
  components: {
    AdminAside
  },
  computed: {
    
  },
}
</script>
<style>
@import '~highlight.js/styles/github.css';
</style>