<template>
  <header class="header">
    <div class="container info">
      <!-- <div class="nickname" @click="goIndex">{{ administrator.nickname }}</div> -->
      <!-- <div class="nickname" @click="goIndex">保罗赛特</div> -->
      <!-- <div class="intro">{{ administrator.intro }}</div> -->
      <!-- <div class="intro">回归自然 回归慢生活</div>  -->
      <div class="for-logo"></div>
    </div>
    
    <div class="tabbar">
        <div class="tab">
            <ul>
              <li v-for="(item,index) in links" :key="index" v-on:mouseenter="showSubtab(index)">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </li>
            </ul>
            <!-- <div class="search">
              <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search"/>
            </div> -->
        </div>
    </div>
    <div class="subtab" v-show="showSubtabIndex == 0">
          <ul>
              <li>
                1
              </li>
              <li>
                2
              </li>
              <li>
                3
              </li>
            </ul>
        </div>
        <div class="subtab" v-show="showSubtabIndex == 1">
          <ul>
              <li>
                4
              </li>
              <li>
                5
              </li>
              <li>
                6
              </li>
            </ul>
        </div>
        <div class="subtab" v-show="showSubtabIndex == 2">
          <ul>
              <li>
                7
              </li>
              <li>
                8
              </li>
              <li>
                9
              </li>
            </ul>
        </div>
    <!-- <nav class="container nav">
      <ul>
        <li v-for="(item,index) in links" :key="index">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="search">
        <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search"/>
      </div>
    </nav> -->
    <div class="pic">
      <div class="for-banner">
        <wc-swiper class="swiper" 
                  v-if="list.length" 
                  @transitionend="transitionend" 
                  ref="swiper"
                  :defaultSlide="0" 
                  :interval="1500" 
                  :pagination="true">
        <!-- <div slot="pagination"></div> -->
        <wc-slide v-for="(v, k) in list" :key="k" :class="map[k]">
          <!-- {{v}} -->
        </wc-slide>
      </wc-swiper>  

      <!-- <div class="text">当前是第{{currentSlide}}个slide</div>  
      <div class="btn" @click="previous">上一个</div>
      <div class="btn" @click="next">下一个</div>
      <div class="btn" @click="slideTo">滚动到索引=3的</div> -->

      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      links: [{
        name: '全部商品',
        path: '/'
      },{
        name: '首页',
        path: '/'
      }, {
        name: '新随笔',
        path: '/publish'
      }, {
        name: '管理',
        path: '/admin'
      },{
        name: '客厅',
        path: '/'
      },{
        name: '卧房',
        path: '/'
      },{
        name: '餐厅',
        path: '/'
      },{
        name: '特别推荐',
        path: '/'
      }],
      searchInfo: '',
      showSubtabIndex:-1,
      imageFlag:0,
      transitionendFlag:0,
      list: [],
      map: {
        0: 'slide a',
        1: 'slide b',
        2: 'slide c',
        3: 'slide d',
        4: 'slide e',
        5: 'slide f'
      },
      currentSlide: 0
    }
  },
  mounted () {
      this.fetchList();
    },
  computed: {
    administrator () {
      return this.$store.state.administrator
    }
  },
  methods: {
    search () {
      this.$router.push({
        name: 'search',
        params: {
          change: this.searchInfo
        }
      })
    },
    goIndex () {
      this.$router.push({name: 'index'})
    },
    // showSubtab(val){
    //  this.showSubtabIndex = val;
    // },
    fetchList () {
        // this.list = [0,1,2,3,4,5];
        this.list = [0,1,2,3,4];
    },
    transitionend (current) {
      // this.imageFlag = current;
      // this.transitionendFlag += 1;
      // if(this.transitionendFlag % 2){
      //   this.imageFlag = 1
      // }else{
      //   this.imageFlag = 0;
      // }
       
      // console.log('')
      // console.log(current,'dangqin')
      // this.currentSlide = current;
      // document.querySelector('.text').innerHTML = '当前是第' + current + '个 slide';
    },
    previous () {
      this.$refs.swiper.previous();
    },
    next () {
      this.$refs.swiper.next();
    },
    slideTo () {
      this.$refs.swiper.slideTo(3);
    }
  }
}
</script>
<style>
  .btn {
    position: relative;
    /*display: inline-block;*/
    width: 50%;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42;
    color: #333;
    text-align: center;
    white-space: nowrap;
    vertical-align: top;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border-radius: 3px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    color: #fff;
    background-color: #007aff;
    border: 1px solid #007aff;
    margin: 10px auto; 
  }
  .swiper {
  }
  .swiper .ns{
    width: 100px;
    height: 100px;
    background: green;
  }
  .a {
     background: url(../../../public/indexPicture/08.jpg) no-repeat;
     background-size: 100%;
  }
  .b {
     background: url(../../../public/indexPicture/12.jpg) no-repeat;
     background-size: 100%;
  }
  .c {
     background: url(../../../public/indexPicture/25.jpg) no-repeat;
     background-size: 100%;
  }
  .d {
     background: url(../../../public/indexPicture/28.jpg) no-repeat;
     background-size: 100%;
  }
  .e {
    background: #333391;
  }
  .f {
    background: red;
  }
  .slide {
    font-size: 50px;
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .text {
    margin: 10px;
  }
  .for-logo{
    width: 200px;
    height: 40px;
    margin: 0 auto;
    background: url(../../../public/indexPicture/indexLogo.jpg) no-repeat;
    background-size: 100%;
  }
</style>