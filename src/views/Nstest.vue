<template>
  <div>
    
    <my-header></my-header>

    <div class="polo-all-items-wrap">
      <div class="polo-all-items-content">
        <div class="all-items">
          <!-- 左侧导航分类 -->
          <div class="polo-category">
            <div class="content-stytle" @click="resetPageParam">

              <div class="title"><span></span>系列</div>
              <div class="item" v-for="(item,index) in allstates.series" :key="index" @click="collectRightClickItem('series',item.tag)">
                  <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'series':item.tag},limit:9 }}">{{item.tag}} </router-link>
              </div>

              <div class="title"><span></span>适用空间</div> 
              <div class="item" v-for="(item,index) in allstates.statuses" :key="index" @click="collectRightClickItem('status',item.tag)">
                <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'status':item.tag},limit:9  }}">{{item.tag}} </router-link>
              </div>

              <div class="title"><span></span>分类</div>
              <div class="item" v-for="(item,index) in allstates.klasses" :key="index" @click="collectRightClickItem('klass',item.tag)">
                <router-link :to="{name:'brouter',params:{querydata:item.tag,queryarr:{'klass':item.tag},limit:9  }}">{{item.tag}} </router-link>
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
                    <label>当前选择 :</label>
                    <p>{{rightNow}}</p>
                </div>

                <div class="right-now" v-show="searchTotal!=-1">
                    <label>共为您找到 :</label>
                    <p style="color:#474747">{{searchTotal}} <i> 件宝贝</i></p>                
                </div>
                <!-- <div class="right-now">
                    <label>searchParams :</label>
                    <p>{{searchParams}}</p>
                </div> -->
                
                <div class="search-buttons">
                    <div class="right-button" @click="search">搜索
                        <!-- <router-link :to="{name:'brouter',params:{ querydata:nowTime,queryarr:searchParams }}">搜索</router-link> -->
                    </div>
                    <div @click="deleteSearchParams()" class="left-button">
                      重置搜索条件
                    </div>
                </div>

              </div>
            </div>
            <div class="content-stytle2">
              <!-- 遍历接口，展示具体信息 -->
              <div v-for="(resultItem,index) in nstest.result" :key="index" class="each-item" @click="jumpItemDetail(resultItem)">
               
                <!-- <div v-for="(item,index2) in resultItem.imageList" :key="index2" class="each-image"> -->
                <div class="each-image">  
                  <img :src="resultItem.imageList[0]" alt="">
                  <!-- <div class="for-image" style="background: url(item)"> -->
                </div>
                <!-- <p class="goods-intro"><span></span>&nbsp;{{goodsIntro[index%6]}}</p> -->
                <p class="goods-intro"><span></span>&nbsp;{{resultItem.featuredesc}}</p>
                <p class="item-name">{{resultItem.itemName}}</p>
                <p class="item-status">{{resultItem.status}}--{{resultItem.klass}}--{{resultItem.itemNo}}</p>
                
                
                <!-- <p class="item-klass">{{resultItem.klass}}</p> -->
                <!-- <p>{{resultItem.featuredesc}}</p> -->
              </div>
            </div>

               <!-- <div>nstest:{{nstest}}</div> -->
               <!-- <div>allstates:{{allstates}}</div>  -->
              <div class="page" v-show="maxPage > 1 && routerName == 'nstest'">
                <router-link v-if="page > 1" :to="{name:'nstest',params:{page:page - 1}}" class="prev">《上一页</router-link>
                <a v-else class="disabled prev">《上一页</a>
                <router-link v-if="hasMore" :to="{name:'nstest',params:{page:page + 1}}" class="next">下一页》</router-link>
                <a v-else class="disabled next">下一页》</a>
              </div>

              <div class="page" v-show="routerName == 'brouter'">
                <span class="prev" @click="fenye(-1)">《上一页</span>
                <span class="next" @click="fenye(1)">下一页》</span>
              </div>

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
      searchParams: {},
      pageParam: 1,
      searchTotal: -1,
      goodsIntro: [
        '设计师说：路尽隐香处，影摇月明间',
        '设计师说：诗意不在远方，在身边',
        '设计师说：内敛，大气，就像你！',
        '设计师说：选它就对了，女神都在买',
        '设计师说：总有一款，让你心仪',
        '设计师说：一年四季，住进春天'
      ]
    }
  },
   //todo 这里 换成 created 可以避免前后端渲染不一致的情况
  // beforeMount () {
  created () {
    if (this.$root._isMounted) {
      this.listPage()
    }
    this.initData(this.$store.state.allitems);

    if(localStorage['searchParams']){
      let searchParamsLocal = JSON.parse(localStorage['searchParams']);
      this.searchParams = searchParamsLocal;
    }
  },
  computed: {
    nstest () {
      return this.$store.state.nstest
    },
    allitems () {
      return this.$store.state.allitems
    },
    allstates(){
      return this.$store.state.allstates
    },
    //这里只是对 系列 做了一个去重 ，可以改在上传时候必填项不为空 
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
    routerName(){
      return this.$route.name
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
        str = resultArr.join(' & ')
        return str;
      }else{
        return resultArr[0];
      }
      
      
    },
    number () {
      return this.$store.state.allstates.total
    },
    maxPage () {
      return Math.ceil(Number(this.number) / 9)
    },
    page () {
      return Number(this.$route.params.page) || 1
    },
    hasMore () {
      return this.page < this.maxPage
    }
    
  },
  watch: {
    $route (to, from) {
      this.listPage()
    },
    // nstest (){
    //   this.initData(this.$store.state.nstest);
    // }
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
    search () {
      let pp = this.searchParams
      let page = this.pageParam
      let limit = 9
      let tt = Date.now()
      this.$router.push({
        name:'brouter',
        params:{ querydata:tt,queryarr:pp,limit:limit,page:page }
      })
      // todo 点击搜索时候 获取这个搜索条件下的商品总数
       this.axios.post(`/getPoloItemsByPost`,{
        'queryarr':pp
      }).then((res)=>{
        if(res && res.data.code == 200){
          this.searchTotal = res.data.result.length
        }
      })
    },
    fenye (num){
      this.pageParam = this.pageParam + num
      this.search ()
    },
    resetPageParam (){
      this.pageParam = 1;
    },
    jumpItemDetail(data){
        let itemData = JSON.stringify(data)
        localStorage.setItem('itemDetail',itemData)
        this.$router.push({ name: 'itemdetail' })
        //todo 清空searchParams 这里是第二处 的条件只在这里复位应该不全，应该是离开筛选页就清空
        localStorage.setItem('searchParams','')
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
      // 点击右侧选项时，如果是系列 适用空间 类别 则，先会清空 searchParams 的这三项，再加具体值
      if(type == 'klass'|| type == 'status'|| type == 'series'){
        delete this.searchParams.klass;
        delete this.searchParams.status;
        delete this.searchParams.series;

        this.searchParams = {}
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
      let sp = JSON.stringify(this.searchParams)
      localStorage.setItem('searchParams',sp)
      
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
<style>
 .goods-intro span{
     display: inline-block;
     width: 25px;
     height: 25px;
     background: url(../../public/indexPicture/icon-item.png) no-repeat;
     background-size: 100%;
     position: relative;
     top: 4px;
 }
</style>
