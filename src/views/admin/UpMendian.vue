<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="up-item">
        <div class="form">
          <div class="up-button">
            <button v-if="!dateid" class="upbutton" type="button" @click="clearCache">清空缓存值</button>
            <button class="upbutton" type="button" @click="upitems">{{dateid?'修改':'上传'}}门店信息</button>
          </div>
          <div class="title">
            <label for="itemNo">省份：</label>
            <input type="text" name="itemNo" v-model="province" placeholder="请输入省份" autofocus>
          </div>
          <div class="title">
            <label>名称：</label>
            <input type="text" v-model="name" placeholder="请输入店面名称" autofocus>
          </div>
          <div class="title">
            <label>主打系列：</label>
            <input type="text" v-model="series" placeholder="请输入店面主打系列" autofocus>
          </div>
          <div class="title">
            <label>商场：</label>
            <input type="text" v-model="mall" placeholder="请输入商场信息" autofocus>
          </div>
          <div class="title">
            <label>电话：</label>
            <input type="text" v-model="tel" placeholder="请输入电话号码" autofocus>
          </div>
          <div class="title">
            <label>位置：</label>
            <input type="text" v-model="location" placeholder="请输入门店位置" autofocus>
         </div>
         <div class="title">
            <label>手机：</label>
            <input type="text" v-model="phone" placeholder="请输入手机号码(可不填)" autofocus>
          </div>
          <div class="title">
            <label for="itemNo">城市：</label>
            <input type="text" name="itemNo" v-model="city" placeholder="请输入城市(可不填)" autofocus>
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
  name: 'upMendian',
  data () {
    return {
        dateid: this.$route.params.dateid,
        province:"",
        city:"",
        name:"",
        series: "",
        mall:"",
        location:"",
        tel:"",
        phone:""
    }
  },

  mounted () {
    if (this.dateid) {
      this.getOneItem(this.dateid)
    } else {
      this.province = ""||localStorage.getItem('m-province')
      this.city = localStorage.getItem('m-city')? localStorage.getItem('m-city'): ""
      this.name = ""||localStorage.getItem('m-name')
      this.series = ""||localStorage.getItem('m-series')
      this.mall = ""||localStorage.getItem('m-mall')
      this.location = ""||localStorage.getItem('m-location')
      this.tel = ""||localStorage.getItem('m-tel')
      this.phone = ""||localStorage.getItem('m-phone')
    }
  },
  watch: {
  },
  methods: {
    getOneItem(dateid){
      let obj = {}
      obj.date = Number(dateid)
      this.axios.post(`/getMendianByPost`,{
        'queryarr':obj
      }).then((res)=>{
        if(res && res.data.code == 200){
            const {province, city, name, series, mall, location, tel, phone} = res.data.result[0]
            this.province = province
            this.city = city
            this.name = name
            this.series = series
            this.mall = mall
            this.location = location
            this.tel = tel
            this.phone = phone
        }
      })
    },
    clearCache(){
        localStorage.setItem('m-province','')
        localStorage.setItem('m-city','')
        localStorage.setItem('m-name','')
        localStorage.setItem('m-series','')
        localStorage.setItem('m-mall','')
        localStorage.setItem('m-location','')
        localStorage.setItem('m-tel','')
        localStorage.setItem('m-phone','')
        history.go(0)
    },
    upitems(){
        localStorage.setItem('m-province',this.province)
        localStorage.setItem('m-city',this.city)
        localStorage.setItem('m-name',this.name)
        localStorage.setItem('m-series',this.series)
        localStorage.setItem('m-mall',this.mall)
        localStorage.setItem('m-location',this.location)
        localStorage.setItem('m-tel',this.tel)
        localStorage.setItem('m-phone',this.phone)
        
        this.axios.post('/upMendian', {
            province: this.province,
            city: this.city,
            name: this.name,
            series: this.series,
            mall: this.mall,
            location: this.location,
            tel: this.tel,
            phone: this.phone,
            date: Number(this.dateid) || Date.now()
        }).then((result) => {
          if(this.dateid){
            alert("修改成功")
          } else{
            alert("上传成功")
          }
            history.go(0)
        })
    }
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