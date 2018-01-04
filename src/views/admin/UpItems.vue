<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="essay">
        <div class="form">
          <div class="title">
            <input type="text" v-model="brand" placeholder="请输入品牌" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="series" placeholder="请输入系列,如莱茵、新泽西等" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="status" placeholder="请输入类别,如客厅、卧室、书房等" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="klass" placeholder="请输入分类,如沙发、床、柜等" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="specific" placeholder="请输入具体,如双人沙发、单人床等" autofocus>
          </div>
          <div class="title">
            <input type="text" v-model="material" placeholder="请输入材质" autofocus>
         </div>
          <div class="title">
            <input type="text" v-model="features" placeholder="请输入特点,多个特点以英文 ',' 逗号分隔 " autofocus>
          </div>
           <div class="title">
            <input type="text" v-model="featuredesc" placeholder="请输入特点描述段落" autofocus>
          </div>
           <div class="title">
            <input type="text" v-model="standard" placeholder="请输入规格" autofocus>
          </div>
           <div class="title">
            <input type="text" v-model="itemNo" placeholder="请输入货号" autofocus>
          </div>
           <div class="title">
            <input type="text" v-model="itemPrice" placeholder="请输入价格,保留字段,可不输入" autofocus>
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
import { getApi } from '../../api/apiconfig.js'
import hljs from 'highlight.js'
export default {
  name: 'Publish',
  data () {
    return {
      brand:'',
      series:'',
      status:'',
      klass:'',
      specific:'',
      material:'',
      features:'',
      featuredesc:'',
      standard:'',
      itemNo:'',
      itemPrice:'',
      imgUrls:'',
      date: '',
      imageList:[],
      upItemImgUrl: {
        // url: 'http://localhost:8080/api/uploaditemimage?index=1'
        url: getApi().baseURL+"/uploaditemimage?index=1"
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
    },
    featuresToArr(newVal, oldVal){
      this.featuresArr();
    }
  },
  methods: {
    upitems(){
      this.axios.post('/upPoloItem', {
        'brand':this.brand,
        'series':this.series,
        'status':this.status,
        'klass':this.klass,
        'specific':this.specific,
        'material':this.material,
        'features':this.features,
        'featuredesc':this.featuredesc,
        'standard':this.standard,
        'itemNo':this.itemNo,
        'itemPrice':this.itemPrice,
        'imageList':this.imageList,
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        alert("上传成功")
      })
    },
    featuresArr(){
      if(this.features.indexOf(',')>-1){
        this.features = this.features.split(',')
      }
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
    featuresToArr(){
      return this.features
    }
  },
}
</script>
<style>
@import '~highlight.js/styles/github.css';
</style>