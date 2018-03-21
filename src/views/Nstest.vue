<template>
  <div>
    
    <my-header></my-header>

    <div class="polo-all-items-wrap">
      <div class="polo-all-items-content">
        <div class="all-items">
          <!-- 左侧导航分类 -->
          <div class="polo-category">
            <div class="content-stytle">

              <div class="title">系列</div>
              <div class="item" v-for="(item,index) in allseries" :key="index" @click="collectRightClickItem('series',item.tag)">
                  <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'series':item.tag},time:nowTime }}">{{item.tag}} ({{item.count}})</router-link>
              </div>

              <div class="title">适用空间</div> 
              <div class="item" v-for="(item,index) in allstates.statuses" :key="index" @click="collectRightClickItem('status',item.tag)">
                <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'status':item.tag},time:nowTime}}">{{item.tag}} ({{item.count}})</router-link>
              </div>

              <div class="title">分类</div>
              <div class="item" v-for="(item,index) in allstates.klasses" :key="index" @click="collectRightClickItem('klasses',item.tag)">
                <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'klass':item.tag},time:nowTime}}">{{item.tag}} ({{item.count}})</router-link>
              </div>

            </div>
          </div>
          <!-- 右侧具体内容 -->
          <div class="polo-items">
            <div class="polo-category-right">
              <div class="filter-list">

                <!-- <p>routerParams: {{routerParams}}</p>
                <p>filterList: {{filterList}}</p>
                <p>searchParams : {{searchParams}}</p>
                <p>-------------------------------</p> -->
                
                <div class="filter-row" v-show="filterList && filterList.color">
                    <label>颜色 :</label>
                    <span v-for="(item,index) in filterList.color" 
                  :key="index" @click="collectRightClickItem('color',item,$event)">{{item}}</span>
                </div>

                <div class="filter-row" v-show="filterList && filterList.styles">
                    <label>风格 :</label>
                    <span v-for="(item,index) in filterList.styles" 
                    :key="index" @click="collectRightClickItem('styles',item,$event)">{{item}}</span>
                </div>

                <div class="filter-row" v-show="filterList && filterList.material">
                    <label>材质 :</label>
                    <span v-for="(item,index) in filterList.material" 
                    :key="index" @click="collectRightClickItem('material',item,$event)">{{item}}</span>
                </div>

                <div class="filter-row" v-show="filterList && filterList.paint">
                    <label>油漆类别 :</label>
                    <span v-for="(item,index) in filterList.paint" 
                    :key="index" @click="collectRightClickItem('paint',item,$event)">{{item}}</span>
                </div>

                <div class="right-now">
                    <p>当前所在 :{{rightNow}}</p>
                </div>

                <div class="search-buttons">
                    <div class="right-button">
                        <router-link :to="{name:'brouter',params:{ querydata:{},queryarr:searchParams }}">搜索</router-link>
                    </div>
                    <div @click="deleteSearchParams()" class="left-button">重置搜索条件</div>
                </div>

              </div>
            </div>
            <div class="content-stytle2">
              <!-- 遍历接口，展示具体信息 -->
              <div v-for="(resultItem,index) in nstest.result" :key="index" class="each-item" @click="jumpItemDetail(resultItem)">
               
                <div v-for="(item,index2) in resultItem.imageList" :key="index2" class="each-image">
                  <img :src="item" alt="">
                  <!-- <div class="for-image" style="background: url(item)"> -->
                </div>
                <p class="item-status">【{{resultItem.status}}--{{resultItem.klass}}】</p>
                <p class="item-name">{{resultItem.itemName}}</p>
                
                <!-- <p class="item-klass">{{resultItem.klass}}</p> -->
                <!-- <p>{{resultItem.featuredesc}}</p> -->
              </div>
            </div>

              <!-- <div>{{nstest}}</div> -->
              <!-- <div>allstates:{{allstates}}</div>  -->
          </div>
          <!-- polo-items -->
            
        </div>
        <!-- all-items -->
      </div>
      <!-- polo-all-items-content -->
    </div>
    <!-- polo-all-items-wrap -->
  
    <my-footer></my-footer>
    
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
    },
    rightNow(){
      let resultArr = [];
      let str = "";
      if(this.searchParams.status){
        resultArr.push(this.searchParams.status)
      }
      
      for(let name in this.searchParams){
        if(name != 'status'){
          resultArr.push(this.searchParams[name])
        }
      }
      
      if(resultArr.length>1){
        str = resultArr.join('-->')
      }
      
      return str;
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
      jumpItemDetail(data){
         
         let itemData = JSON.stringify(data)
         localStorage.setItem('itemDetail',itemData)
         this.$router.push({ name: 'itemdetail' })

         console.log( 123,localStorage.getItem('itemDetail') )
      },
      deleteRepeat(arr){
        
        let tempObj = {};
        let resultArr = [];
        for(let i =0 ;i<arr.length;i++){
          if(!tempObj[arr[i]]){
              resultArr.push(arr[i])
              tempObj[arr[i]]= 1
          }
        }
        return resultArr

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
          //材料
          if (item.material) {
            if (!tempFilterList.material) {
              tempFilterList.material = [];
              tempFilterList.material.push(item.material);
            } else {
              tempFilterList.material.push(item.material);
            }
          }
          //油漆
          if (item.paint) {
            if (!tempFilterList.paint) {
              tempFilterList.paint = [];
              tempFilterList.paint.push(item.paint);
            } else {
              tempFilterList.paint.push(item.paint);
            }
          }
        });

        //执行一下去重
        tempFilterList.color = this.deleteRepeat(tempFilterList.color)
        tempFilterList.styles = this.deleteRepeat(tempFilterList.styles)
        tempFilterList.material = this.deleteRepeat(tempFilterList.material)
        tempFilterList.paint = this.deleteRepeat(tempFilterList.paint)

        //数组赋值
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
          case 'material':
               this.$set(this.searchParams,'material',content)
              // this.searchParams.styles = content
          break 
          case 'paint':
               this.$set(this.searchParams,'paint',content)
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