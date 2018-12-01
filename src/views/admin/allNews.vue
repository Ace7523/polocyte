<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="item" v-for="(item ,index) in allItemList" :key="index">
        <span class="key">标题：</span>{{item.title}}&nbsp;&nbsp;
        <span class="key">上传时间：</span>{{item.time}}&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="span3" @click="delItem(item.date)"> 点击删除</span>
        <p v-if="item.tag.length" style="margin-top:10px">
          <span class="key">归类：</span>
          <span v-for="(it, i) in item.tag" :key="i" style="background: #a5a5a5; color: #000; padding-left: 5px;">{{it}}&nbsp;&nbsp;</span>
        </p>
        <p style="margin-top:10px">
          <span v-if="item.content" class="key content">内容：</span>&nbsp;&nbsp;
          <span class="text">{{item.content}}</span>&nbsp;&nbsp;
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'

export default {
  name: 'AllItems',
  data () {
    return {
      allItemList:[],
      test:[]
    }
  },

  mounted () {
    this.getAllData()
  },
  methods: {
    getAllData(){
      let that = this
      this.axios.get(`/getnewslist`).then((res)=>{
        console.log(res)
        if(res && res.data && res.data.result.length>0){
          this.allItemList = res.data.result
          this.allItemList.forEach(item => {
            item.time = that.timestampToTime(item.date)
          });
        }
      })
    },
    delItem(dateid) {
      let obj = {}
      obj.date = dateid
      this.axios.post(`/deleteNews`,{
        'queryarr':obj
      }).then((res)=>{
        if(res && res.data.code == 200){
          alert('删除成功')
          history.go(0)
        }
      })
    },
    getOneItem(dateid){
      let obj = {}
      obj.date = dateid
      this.axios.post(`/getnewsbypost`,{
        'queryarr':obj
      }).then((res)=>{
        if(res && res.data.code == 200){
          alert(1)
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
    AdminAside
  },
  computed: {
    time (timestamp) {
      return this.timestampToTime(timestamp)
    },
  },
}
</script>
<style scoped>
  .admin-content .item{
    padding: 10px;
    /* background: rgb(190, 181, 181); */
    border-bottom: 1px solid #dcdcdc;
  }
  .admin-content .item .key{
   font-weight: bold;
  }
  .admin-content .text{
    display: inline-block;
    width: 1200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .span3{
    color:rgb(83, 157, 218);
    cursor:pointer;
  }
  /* .item:hover{
    background: rgb(232, 235, 69);
  } */
</style>
<style lang="scss" scoped>
  .admin-content .item{
    padding: 10px;
    /* background: rgb(190, 181, 181); */
    border-bottom: 1px solid #dcdcdc;
  }
  .admin-content .item .key{
   font-weight: bold;
  }
  .span3{
    color:rgb(83, 157, 218);
    cursor:pointer;
  }
  .item:hover{
    background: rgb(232, 235, 69);
  } 
</style>
