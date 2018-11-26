<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="remark">
        <h3>修改第几张就上传第几张即可， 共五张, 点击下图中图片图标上传</h3>
      </div>
      <div class="essay">
        <div class="form">
          <h4>上传第一张轮播图</h4>
          <div class="content">
            <top-editor v-model="content" :upload="uploadimage" :options="options"></top-editor>
          </div>
          <h4>上传第二张轮播图</h4>
          <div class="content">
            <top-editor v-model="content" :upload="uploadimage2" :options="options"></top-editor>
          </div>
          <h4>上传第三张轮播图</h4>
          <div class="content">
            <top-editor v-model="content" :upload="uploadimage3" :options="options"></top-editor>
          </div>
          <h4>上传第四张轮播图</h4>
          <div class="content">
            <top-editor v-model="content" :upload="uploadimage4" :options="options"></top-editor>
          </div>
          <h4>上传第五张轮播图</h4>
          <div class="content">
            <top-editor v-model="content" :upload="uploadimage5" :options="options"></top-editor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
import { getApi } from '../../api/apiconfig.js'
import hljs from 'highlight.js'
export default {
  name: 'upIndexPicture',
  data () {
    return {
      content: '',
      uploadimage: {
        // url: 'http://localhost:8080/api/uploadimage?index=1'
        url: getApi().baseURL+"/upindexpic?index=1"
      },
       uploadimage2: {
        // url: 'http://localhost:8080/api/uploadimage?index=2'
        url: getApi().baseURL+"/upindexpic?index=2"
      },
       uploadimage3: {
        // url: 'http://localhost:8080/api/uploadimage?index=3'
         url: getApi().baseURL+"/upindexpic?index=3"
      },
       uploadimage4: {
        // url: 'http://localhost:8080/api/uploadimage?index=4'
         url: getApi().baseURL+"/upindexpic?index=4"
      },
      uploadimage5: {
        // url: 'http://localhost:8080/api/uploadimage?index=4'
         url: getApi().baseURL+"/upindexpic?index=5"
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
<style lang="scss" scoped>
.remark {
  margin-left: 50px;
  margin-top: 50px;
}
.form {
  width: 500px;
  .content {
    .top-editor{
       height: 300px !important;
    } 
  }
}
</style>
