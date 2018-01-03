<template>
  <div>
    <my-header></my-header>
    <div class="polo-all-items-wrap">
      <div class="polo-all-items-content">
        <div class="all-items">
          <!-- 左侧导航分类 -->
          <div class="polo-category">
            <div class="content-stytle">
              <div class="title">所有分类</div> 
              <div v-for="(item,index) in allstates.statuses" :key="index">
                <router-link :to="{name:'brouter',params:{querydata:item.tag}}">{{item.tag}} ({{item.count}})</router-link>
              </div>
              <div class="title">所有klass</div>
              <div v-for="(item,index) in allstates.klasses" :key="index">
                {{item.tag}}
              </div>
            </div>
          </div>
          <!-- 右侧具体内容 -->
          <div class="polo-items">
            <div class="content-stytle2">
              <!-- 遍历接口，展示具体信息 -->
              <div v-for="(resultItem,index) in nstest.result" :key="index" class="each-item">
               
                <div v-for="(item,index2) in resultItem.imageList" :key="index2" class="each-image">
                  <img :src="item" alt="">
                  <!-- <div class="for-image" style="background: url(item)"> -->
                </div>
                  <p>{{resultItem.status}}</p>
                  <p>{{resultItem.klass}}</p>
                  <p>{{resultItem.featuredesc}}</p>
                </div>
              </div>

              <div>{{nstest}}</div>
              <div>{{allstates}}</div>
            </div>
            
          </div>

        </div>
      </div>
    </div>  
  
    <!-- <my-footer></my-footer> -->
  </div>
  
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: 'nstest',
  components: {
    MyHeader,
    MyFooter
  },
  data(){
    return{
      
    }
  },
   beforeMount () {
    if (this.$root._isMounted) {
      this.listPage()
    }
  },
  computed: {
    nstest () {
      return this.$store.state.nstest
    },
    allstates(){
      return this.$store.state.allstates
    }
  },
  watch: {
    $route (to, from) {
      this.listPage()
    }
  },
  methods: {
      // todo 这里其实不是很懂
      // 点击分页后，重新获取数据   
      listPage () {
        this.$bar.start()
        this.$store.dispatch('NS_TEST').then(() => {
          this.$bar.finish()
        })
      }
    }
}
</script>