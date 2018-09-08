<template>
  <div class="company-intruc-page">
    <my-header></my-header>
    <div class="content-wrap">
 
        <div class="right-img">  
            <div class="img img1">
            </div>
            <div class="img img2">
            </div>
            <div class="img img3">
            </div>
            <div class="img img4">
            </div>
            <div class="img img5">
            </div>
            <div class="img img6">
            </div>
            <div class="img img7">
            </div>
        </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: '',
  data(){
    return{
    }
  },
  mounted () {
  },
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
<style scoped>
.content-wrap{
    text-align: center;
}
.img{
    
}
.img1{
    display: inline-block;
    width: 80%;
    height: 1200px;
    background: url(../../public/footerPic/honor-2.jpg) no-repeat;
    background-size: 100% 100%;
    margin: auto;
}
.img2{
    display: inline-block;
    width: 80%;
    height: 1200px;
    background: url(../../public/footerPic/honor-3.jpg) no-repeat;
    background-size: 100% 100%;
}
.img3{
    display: inline-block;
    width: 80%;
    height: 1200px;
    background: url(../../public/footerPic/honor-4.jpg) no-repeat;
    background-size: 100% 100%;
}
.img4{
    display: inline-block;
    width: 80%;
    height: 1200px;
    background: url(../../public/footerPic/honor-5.jpg) no-repeat;
    background-size: 100% 100%;
}
.img5{
    display: inline-block;
    width: 80%;
    height: 1200px;
    background: url(../../public/footerPic/honor-6.jpg) no-repeat;
    background-size: 100% 100%;
}
.img6{
    display: inline-block;
    width: 80%;
    height: 1200px;
    background: url(../../public/footerPic/honor-7.jpg) no-repeat;
    background-size: 100% 100%;
}
.img7{
    display: inline-block;
    width: 80%;
    height: 1200px;
    background: url(../../public/footerPic/honor-8.jpg) no-repeat;
    background-size: 100% 100%;
}
</style>
