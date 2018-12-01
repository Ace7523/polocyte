<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="item" v-for="(item ,index) in allItemList" :key="index">
        <span class="key">名字：</span>{{item.name}}&nbsp;&nbsp;
        <span v-if="item.city" class="key">城市：</span>{{item.city}}&nbsp;&nbsp;
        <span v-if="item.phone" class="key">手机：</span>{{item.phone}}&nbsp;&nbsp;
        <span v-if="item.time" class="key">申请时间：</span>{{item.time}}
        <p>
            <span class="key">备注信息：</span>{{item.remark?item.remark:'无'}}&nbsp;&nbsp;
            <span class="span3" @click="delItem(item.date)"> 点击删除</span>
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
      allItemList:[]
    }
  },

  mounted () {
    this.getAllData()
  },
  methods: {
    getAllData(){
      let that = this
      this.axios.get(`/getJoinus`).then((res)=>{
        if(res && res.data && res.data.result.length>0){
          this.allItemList = res.data.result
          this.allItemList.forEach(item => {
            item.time = that.timestampToTime(item.date)
          });
        }
      })
    },
    delItem(dateid) {
      return
      let obj = {}
      obj.date = dateid
      this.axios.post(`/deleteMendian`,{
        'queryarr':obj
      }).then((res)=>{
        if(res && res.data.code == 200){
          alert('删除成功')
          history.go(0)
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
<style>
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
  /* .item:hover{
    background: rgb(232, 235, 69);
  } */
</style>