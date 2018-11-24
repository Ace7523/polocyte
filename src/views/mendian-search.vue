<template>
  <div class="company-intruc-page">
    <my-header></my-header>
    <div class="content-wrap">
      <div class="content">
        <div class="left-part">
          <h4>查询店面</h4>
          <p>请选择您所在的省份及城市，查询您附近的保罗赛特店面</p>
          <select id="sele" v-model="selectProvience">
            <option  v-for="(item, index) in seleceList" 
              :key="index" name="sele" 
              :value="item" 
            >
              {{item}}
            </option>
          </select>
          <div class="btns">
            <span class="btn" @click="search">查询</span> <span class="btn" @click="getAllData">全部店面</span>
          </div>
        </div>
        <div class="right-part">
          <div class="info" v-for="(item, index) in allItemList" :key="index">
            <h4 class="title">{{item.name}}</h4>
            <p>{{item.location}}</p>
            <p v-if="item.tel">电话：{{item.tel}}</p>
            <p v-if="item.phone">{{item.phone}}</p>
          </div>
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
        selectProvience:'',
        seleceList:[],
        allItemList:[]
    }
  },
  mounted () {
      this.getAllData()
  },
  methods:{
    search(){
      this.getInfo(this.selectProvience)
    },
    getAllData(){
      let that = this
      this.axios.get(`/getMendians`).then((res)=>{
        if(res && res.data && res.data.result.length>0){
          this.allItemList = res.data.result
          this.allItemList.map( item => {
            if(this.seleceList.indexOf(item.province) == -1){
              this.seleceList.push(item.province)
            }
          })
          this.allItemList.forEach(item => {
            item.time = that.timestampToTime(item.date)
          });
        }
      })
    },
    getInfo(key){
      let obj = {}
      obj.province = key || ''
      this.axios.post(`/getMendianByPost`,{
        'queryarr':obj
      }).then((res)=>{
        if(res && res.data.code == 200){
          console.log(res)
          this.allItemList = res.data.result
        }
      })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y+M+D+h+m+s;
    }
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
.content{
  display: flex;
  flex-flow: row;
}
.left-part{
  width: 400px;
  flex-shrink: 0;
  text-align: left;
  margin-right: 20px;
}
.left-part h4{
  font-size: 18px;
  color: #a5a5a5;
  margin: 14px 0;
}
.left-part p{
  font-size: 12px;
  color: #a5a5a5;
  margin: 12px 0;
}
.left-part .btns{
  margin: 18px 0;
}
.left-part .btns .btn{
  background-color: #a5a5a5;
  color: #ffffff;
  /* color: #a5a5a5; */
  margin-right: 12px;
  padding:5px 10px;
  border-radius: 3px;
}
.right-part{
 /* todo  */
 /* flex-grow:1; */
 height: 515px;
 width: 600px;
 overflow-y: auto;
 margin-bottom: 200px;
}
.right-part .info{
  text-align: left;
}
.right-part .info .title {
  font-size: 16px;
  color: #a5a5a5;
  margin: 12px 0;
}
.right-part .info p{
  font-size: 12px;
  color: #a5a5a5;
  margin: 14px 0;
}
</style>
