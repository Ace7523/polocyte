<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="essay">
        <div class="form">
          <div class="title">
            <input type="text" v-model="title1" placeholder="新品推荐顶标题" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="desc1" placeholder="新品推荐顶描述" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="title2" placeholder="新品推荐中部标题" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="desc2" placeholder="新品推荐中部描述" autofocus>
          </div>

          <div class="content">
            <top-editor v-model="content" :upload="uploadimage5" :options="options"></top-editor>
          </div>
           <div class="content">
            <top-editor v-model="content" :upload="uploadimage6" :options="options"></top-editor>
          </div>
           <div class="content">
            <top-editor v-model="content" :upload="uploadimage7" :options="options"></top-editor>
          </div>

          <button type="button" @click="upimagedesc">上传图片的描述</button>
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
     
      desc1:'',
      desc2:'',
     
      uploadimage5: {
        url: 'http://localhost:8080/api/uploadimage?index=5'
      },
       uploadimage6: {
        url: 'http://localhost:8080/api/uploadimage?index=6'
      },
       uploadimage7: {
        url: 'http://localhost:8080/api/uploadimage?index=7'
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
      this.axios.post('/uploadimagedesc2', {
        'title1':this.title1,
        'title2':this.title2,
        
        'desc1':this.desc1,
        'desc2':this.desc2,
        
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        if(result && result.data.code == 200){
          alert("上传成功")
          history.go(0) 
        }else{
           console.log(result);
        }
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