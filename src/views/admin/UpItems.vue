<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="essay">
        <div>{{imaUrlArr}}</div>
        <div class="form">
          <div class="title">
            <input type="text" v-model="state" placeholder="请输入类别,如客厅、卧室、书房等" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="klass" placeholder="请输入分类" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="specific" placeholder="请输入具体" autofocus>
          </div>

          <div class="content">
            <top-editor v-model="imgUrls" :upload="upItemImgUrl" :options="options"></top-editor>
          </div>
          
          <button type="button" @click="upitems">上传Item</button>
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
      state:'',
      klass:'',
      specific:'',
      imgUrls:'',
      date: '',
      imageList:[],
      upItemImgUrl: {
        url: 'http://localhost:8080/api/uploaditemimage?index=1'
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
  watch: {
    imaUrlArr(newVal, oldVal){
        alert("todo1")
        this.imgUrlsToArr();
        if(newVal) {
            
        } else {
            
        }
    }
  },
  methods: {
    upitems(){
      this.axios.post('/upPoloItem', {
        'state':this.state,
        'klass':this.klass,
        'specific':this.specific,
        'imageList':this.imageList,
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        alert("上传成功")
      })
    },
    imgUrlsToArr(){
        let that = this;
        console.log("文章内容",this.imgUrls);
        let index = -1 ;
        let urlList = [];
        let urlEndList = [];
        do {
          index = this.imgUrls.indexOf("![](", index + 1); //使用第二个参数index+1，控制每一次查找都是从上一次查找到字符a的下一个索引位置开始
          if (index != -1) { //可以找到字符i
          urlList.push(index);
          console.log(index); //输出a的位置
          }
        } while (index != -1);
        do {
          index = this.imgUrls.indexOf(")", index + 1); //使用第二个参数index+1，控制每一次查找都是从上一次查找到字符a的下一个索引位置开始
          if (index != -1) { //可以找到字符i
          urlEndList.push(index)
          console.log(index); //输出a的位置
          }
        } while (index != -1);

        console.log(urlList)
        console.log(urlEndList)

        for(let i =0 ; i<urlList.length; i++){
          // console.log(this.content.substring(urlList[i]+4,urlEndList[i]))
          that.imageList.push(that.imgUrls.substring(urlList[i]+4,urlEndList[i]))
          console.log(that.imageList);
        }
    }

  },
  components: {
    AdminAside
  },
  computed: {
     imaUrlArr () {
      return this.imgUrls
    },
  },
}
</script>
<style>
@import '~highlight.js/styles/github.css';
</style>