<template>
  <div>
    
    <!-- <my-header></my-header> -->

    <div class="polo-all-items-wrap">
      <div class="polo-all-items-content">
        <div class="all-items">
          <!-- 左侧导航分类 -->
          <div class="polo-category">
            <div class="content-stytle">

              <div class="title">所有系列</div>
              <div v-for="(item,index) in allseries" :key="index" @click="collectRightClickItem('series',item.tag)">
                  <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'series':item.tag},time:nowTime }}">{{item.tag}} ({{item.count}})</router-link>
              </div>

              <div class="title">所有分类</div> 
              <div v-for="(item,index) in allstates.statuses" :key="index" @click="collectRightClickItem('status',item.tag)">
                <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'status':item.tag},time:nowTime}}">{{item.tag}} ({{item.count}})</router-link>
              </div>

              <div class="title">所有klass</div>
              <div v-for="(item,index) in allstates.klasses" :key="index" @click="collectRightClickItem('klasses',item.tag)">
                <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'klasses':item.tag},time:nowTime}}">{{item.tag}} ({{item.count}})</router-link>
              </div>

            </div>
          </div>
          <!-- 右侧具体内容 -->
          <div class="polo-items">
            <div class="polo-category-right">
              <div class="filter-list">

                <p>routerParams: {{routerParams}}</p>
                <p>filterList: {{filterList}}</p>
                <p>searchParams : {{searchParams}}</p>
                

                <div v-show="filterList && filterList.color">
                    <label>颜色</label>
                    <span v-for="(item,index) in filterList.color" 
                  :key="index" @click="collectRightClickItem('color',item,$event)">{{item}}</span>
                </div>

                <div v-show="filterList && filterList.styles">
                    <label>风格</label>
                    <span v-for="(item,index) in filterList.styles" 
                    :key="index" @click="collectRightClickItem('styles',item,$event)">{{item}}</span>
                </div>

                <div>测试搜索
                    <router-link :to="{name:'brouter',params:{ querydata:{},queryarr:searchParams }}">搜索</router-link>
                </div>

                <div @click="deleteSearchParams()">删除搜索条件</div>  
                

              </div>
            </div>
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

              <!-- <div>{{nstest}}</div> -->
              <div>{{allstates}}</div> 
          </div>
          <!-- polo-items -->
            
        </div>
        <!-- all-items -->
      </div>
      <!-- polo-all-items-content -->
    </div>
    <!-- polo-all-items-wrap -->
  
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
      searchParams:{},
     
    }
  },
   //todo 这里 换成 created 可以避免前后端渲染不一致的情况
  // beforeMount () {
  created () {
    if (this.$root._isMounted) {
      this.listPage()
    }
    this.initData(this.$store.state.nstest);
  },
  computed: {
    nowTime(){
      return Date.now()
    },
    nstest () {
      return this.$store.state.nstest
    },
    allstates(){
      return this.$store.state.allstates
    },
    allseries(){
      let tempSeries = this.$store.state.allstates.series ;
      let tempArr = [];
      tempSeries.forEach(function(element) {
        if(element.tag!=""){
          tempArr.push(element)
        }
      });
      return tempArr;
    },
    routerParams(){
      return this.$route.params
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
      },
      initData(data) {
        
        let allData = data.result;
        let tempFilterList = {};

        allData.forEach(item => {
          //筛选出全部颜色属性
          if (item.color) {
            if (!tempFilterList.color) {
              tempFilterList.color = [];
              tempFilterList.color.push(item.color);
            } else {
              tempFilterList.color.push(item.color);
            }
          }
          //风格
          if (item.styles) {
            if (!tempFilterList.styles) {
              tempFilterList.styles = [];
              tempFilterList.styles.push(item.styles);
            } else {
              tempFilterList.styles.push(item.styles);
            }
          }
        });

        this.filterList = tempFilterList;
      },
      collectRightClickItem(type,content,e){

        let that = this
        
        console.log(e)
        if(type == 'klasses'|| type == 'status'|| type == 'series'){
          delete this.searchParams.klasses;
          delete this.searchParams.status;
          delete this.searchParams.series;

          this.$set(this.searchParams,type,content)
        }
      
        switch (type){

          case 'color':
               this.$set(this.searchParams,'color',content)
              // this.searchParams.color = content
          break;
          case 'styles':
               this.$set(this.searchParams,'styles',content)
              // this.searchParams.styles = content
          break    
          default:
        }
        
        console.log(this.searchParams)
        
     },
     deleteSearchParams(){
       
       for(let name in this.searchParams){
         if(name!='klasses' && name!= 'status'&& name!= 'series'){
            delete this.searchParams[name]
         }
       }
       
       this.$set(this.searchParams,this.searchParams)
     }
  }
}
</script>