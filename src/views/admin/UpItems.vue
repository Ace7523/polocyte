<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="up-item">
        <div class="form">
          <div class="up-button">
            <button class="upbutton" type="button" @click="clearCache">清空缓存值</button>
            <button class="upbutton" type="button" @click="upitems">上传Item</button>
          </div>
          <div class="title">
            <label for="itemNo">货号：</label>
            <input type="text" name="itemNo" v-model="itemNo" placeholder="请输入货号" autofocus>
          </div>
          <div class="title">
            <label>名称：</label>
            <input type="text" v-model="itemName" placeholder="请输入名称" autofocus>
          </div>
          <div class="title">
            <label>品牌：</label>
            <input type="text" v-model="brand" placeholder="请输入品牌,默认为保罗赛特/POLOCYTE" autofocus>
          </div>
          <div class="title">
            <label>系列：</label>
            <input type="text" v-model="series" placeholder="请输入系列,如莱茵、新泽西等" autofocus>
          </div>
          <div class="title">
            <label>材质：</label>
            <input type="text" v-model="material" placeholder="请输入材质" autofocus>
         </div>
          <div class="title">
            <label>规格：</label>
            <input type="text" v-model="standard" placeholder="请输入规格" autofocus>
          </div>
          <div class="title">
            <label>适用空间：</label>
            <input type="text" v-model="status" placeholder="请输入适用空间,如客厅、卧室、书房等" autofocus>
          </div>
          <div class="title">
            <label>分类：</label>
            <input type="text" v-model="klass" placeholder="请输入分类,如沙发、床、柜等" autofocus>
          </div>
          <div class="title">
            <label>具体划分：</label>
            <input type="text" v-model="specific" placeholder="请输入具体,如双人沙发、单人床等" autofocus>
          </div>
          <div class="title">
            <label>功能：</label>
            <input type="text" v-model="functions" placeholder="请输入功能" autofocus>
          </div>
          <div class="title">
            <label>风格：</label>
            <input type="text" v-model="styles" placeholder="请输入风格" autofocus>
          </div>
          <div class="title">
            <label>颜色：</label>
            <input type="text" v-model="color" placeholder="请输入颜色" autofocus>
          </div>
          <div class="title">
            <label>产地：</label>
            <input type="text" v-model="productLoc" placeholder="请输入产地" autofocus>
          </div>
          <div class="title">
            <label>形状：</label>
            <input type="text" v-model="shape" placeholder="请输入形状" autofocus>
          </div>
          <div class="title">
            <label>实木类型：</label>
            <input type="text" v-model="feature1" placeholder="请输入实木类型" autofocus>
          </div>
          <div class="title">
            <label>结构工艺：</label>
            <input type="text" v-model="feature2" placeholder="请输入结构工艺" autofocus>
          </div>
          <div class="title">
            <label>甲醛释放量：</label>
            <input type="text" v-model="feature3" placeholder="请输入甲醛释放量" autofocus>
          </div>
          <div class="title">
            <label>油漆类型：</label>
            <input type="text" v-model="paint" placeholder="请输入油漆" autofocus>
          </div>
          <div class="title">
            <label>是否可定制：</label>
            <input type="text" v-model="isCanPersonal" placeholder="请输入是否可定制" autofocus>
          </div>
          <div class="title">
            <label>特点,多个特点以英文 ',' 逗号分隔：</label>
            <input type="text" v-model="features" placeholder="请输入特点,多个特点以英文 ',' 逗号分隔 " autofocus>
          </div>
           <div class="title">
            <label>产品描述（文字）：</label>
            <input type="text" v-model="featuredesc" placeholder="请输入产品描述（文字）" autofocus>
          </div>
          <div class="title">
            <label>价格：</label>
            <input type="text" v-model="itemPrice" placeholder="请输入价格,保留字段,可不输入" autofocus>
          </div>
          <div class="title">
            <label>预留1：</label>
            <input type="text" v-model="reserve1" placeholder="预留字段1" autofocus>
          </div>
          <div class="title">
            <label>预留2：</label>
            <input type="text" v-model="reserve2" placeholder="预留字段2" autofocus>
          </div>
          

          <div class="uppic-plug">
            <span>&nbsp;&nbsp;提示：请使用插件上传图片,点击插件中的图片按钮</span>
            <top-editor v-model="imgUrls" :upload="upItemImgUrl" :options="options"></top-editor>
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
  name: 'Publish',
  data () {
    return {
      //货号
      itemNo:''||localStorage.getItem('itemNo'),
      //名称
      itemName:''||localStorage.getItem('itemName'),
      //品牌
      brand:'保罗赛特/POLOCYTE',
      //系列
      series:''||localStorage.getItem('series'),
      //材质
      material:''||localStorage.getItem('material'),
      //规格
      standard:''||localStorage.getItem('standard'), 
      //适用空间
      status:''||localStorage.getItem('status'),
      //类别
      klass:''||localStorage.getItem('klass'),
      //具体
      specific:''||localStorage.getItem('specific'),
      //功能
      functions:''||localStorage.getItem('functions'),
      //风格
      styles:''||localStorage.getItem('styles'),
      //颜色
      color:''||localStorage.getItem('color'),
      //产地
      productLoc:''||localStorage.getItem('productLoc'),
      //形状
      shape:''||localStorage.getItem('shape'),
      //实木类型
      feature1:''||localStorage.getItem('feature1'),
      //结构工艺
      feature2:''||localStorage.getItem('feature2'),
      //甲醛释放量
      feature3:''||localStorage.getItem('feature3'),
      //特点
      features:''||localStorage.getItem('features'),
      //油漆
      paint:''||localStorage.getItem('paint'),
      //是否可定制
      isCanPersonal:''||localStorage.getItem('isCanPersonal'),
      //产品描述（文字）
      featuredesc:''||localStorage.getItem('featuredesc'),
      //预留1
      reserve1:''||localStorage.getItem('reserve1'),
      //预留2
      reserve2:''||localStorage.getItem('reserve2'),
      //图片列表
      imageList:[]||localStorage.getItem('imageList'),
      //商品价格
      itemPrice:''||localStorage.getItem('itemPrice'),

      date: '',

      imgUrls:'',
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
      //进行本地存储，下次再上传新案例时候直接带上上次的值作为默认
      localStorage.setItem('itemNo',this.itemNo)
      localStorage.setItem('itemName',this.itemName)
      localStorage.setItem('brand',this.brand)
      localStorage.setItem('series',this.series)
      localStorage.setItem('material',this.material)
      localStorage.setItem('standard',this.standard)
      localStorage.setItem('status',this.status)
      localStorage.setItem('functions',this.functions)
      localStorage.setItem('styles',this.styles)
      localStorage.setItem('color',this.color)
      localStorage.setItem('productLoc',this.productLoc)
      localStorage.setItem('shape',this.shape)
      localStorage.setItem('klass',this.klass)
      localStorage.setItem('specific',this.specific)
      localStorage.setItem('feature1',this.feature1)
      localStorage.setItem('feature2',this.feature2)
      localStorage.setItem('feature3',this.feature3)
      localStorage.setItem('features',this.features)
      localStorage.setItem('paint',this.paint)
      localStorage.setItem('isCanPersonal',this.isCanPersonal)
      localStorage.setItem('featuredesc',this.featuredesc)
      localStorage.setItem('reserve1',this.reserve1)
      localStorage.setItem('reserve2',this.reserve2)
      localStorage.setItem('itemPrice',this.itemPrice)
      localStorage.setItem('imageList',this.imageList)

      this.axios.post('/upPoloItem', {
        'itemNo':this.itemNo,
        'itemName':this.itemName,
        'brand':this.brand,
        'series':this.series,
        'material':this.material,
        'standard':this.standard,
        'status':this.status,
        'functions':this.functions,
        'styles':this.styles,
        'color':this.color,
        'productLoc':this.productLoc,
        'shape':this.shape,
        'klass':this.klass,
        'specific':this.specific,

        'feature1':this.feature1,
        'feature2':this.feature2,
        'feature3':this.feature3,
        'features':this.features,
        'paint':this.paint,
        'isCanPersonal':this.isCanPersonal,
        'featuredesc':this.featuredesc,
        'reserve1':this.reserve1,
        'reserve2':this.reserve2,
        'itemPrice':this.itemPrice,
        'imageList':this.imageList,
        'date': Number(this.date) || Date.now()
      }).then((result) => {
        alert("上传成功")
        history.go(0)
      })
    },
    clearCache(){
      localStorage.setItem('itemNo','')
      localStorage.setItem('itemName','')
      localStorage.setItem('brand','')
      localStorage.setItem('series','')
      localStorage.setItem('material','')
      localStorage.setItem('standard','')
      localStorage.setItem('status','')
      localStorage.setItem('functions','')
      localStorage.setItem('styles','')
      localStorage.setItem('color','')
      localStorage.setItem('productLoc','')
      localStorage.setItem('shape','')
      localStorage.setItem('klass','')
      localStorage.setItem('specific','')
      localStorage.setItem('feature1','')
      localStorage.setItem('feature2','')
      localStorage.setItem('feature3','')
      localStorage.setItem('features','')
      localStorage.setItem('paint','')
      localStorage.setItem('isCanPersonal','')
      localStorage.setItem('featuredesc','')
      localStorage.setItem('reserve1','')
      localStorage.setItem('reserve2','')
      localStorage.setItem('itemPrice','')
      localStorage.setItem('imageList','')
      history.go(0)
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