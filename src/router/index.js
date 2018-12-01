import Vue from 'vue'
import Router from 'vue-router'
import { Article, List, Admin  , Nstest} from '../views/CreateListView'
import { NewsList, News } from '../views/BeforeRender'
const Login = () =>
  import('../views/Login.vue')

const Publish = () =>
  import('../views/admin/Publish.vue')

const PublishNews = () =>
  import('../views/admin/PublishNews.vue')  

const UpdateAdminInfo = () =>
  import('../views/admin/UpdateAdminInfo.vue')

const UpdateAdminPassword = () =>
  import('../views/admin/UpdateAdminPassword.vue')
  
const upIndexPic = () =>
  import('../views/admin/upIndexPic.vue')

const upComIntrucPic = () =>
  import('../views/admin/upComIntrucPic.vue')  

const UpTodayRecommend = () =>
  import('../views/admin/UpTodayRecommend.vue')

const UpNewProdtct = () =>
  import('../views/admin/UpNewProduct.vue')

const UpItems = () =>
  import('../views/admin/UpItems.vue')  

const AllItems = () =>
  import('../views/admin/AllItems.vue')

const UpMendian = () =>
  import('../views/admin/UpMendian.vue')       

const OneItem = () =>
  import('../views/admin/OneItem.vue')     

const ItemDeatil = () =>
  import('../views/ItemDetail.vue') 

// 页面底部按钮点击后跳转的页面 集团简介
const companyIntroduction = () =>
  import('../views/footer-views/company-introduction.vue') 
// 页面底部按钮点击后跳转的页面 品牌故事
const brandIntroduction = () =>
  import('../views/footer-views/brand-introduction.vue')  
// 页面底部按钮点击后跳转的页面 荣耀资历
const honorIntroduction = () =>
  import('../views/footer-views/honor-introduction.vue')
// 页面底部按钮点击后跳转的页面 商学院
const shangxueyuan = () =>
  import('../views/footer-views/shangxueyuan.vue')
// 页面底部按钮点击后跳转的页面 门店查询
const mendianSearch = () =>
  import('../views/footer-views/mendian-search.vue')

const allMendian = () =>
  import('../views/admin/allMendian.vue')

const allNews = () =>
  import('../views/admin/allNews.vue')    

const allJoinus = () =>
  import('../views/admin/allJoinus.vue')  

const olist = () =>
  import('../views/olist.vue')

Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    linkActiveClass: 'current',
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
      path: '/login',
      name: 'login',
      component: Login
    }, 
    {
      path: '/newslist/:change?/:page?',
      name: 'newslist',
      component: NewsList('typy1')
    },
    {
      path: '/newslistbytime/:change?/:page?',
      name: 'newslistbytime',
      component: NewsList('typy1')
    },
    {
      path: '/newslistbytag/:change?/:page?',
      name: 'newslistbytag',
      component: NewsList('typy1')
    },
    {
      path: '/category/:change?/:page?',
      name: 'category',
      component: List('category')
    },
    {
      path: '/search/:change?/:page?',
      name: 'search',
      component: List('search')
    }, {
      path: '/archive/:change?/:page?',
      name: 'archive',
      component: List('archive')
    }, {
      path: '/article/:id',
      name: 'article',
      component: Article('article')
    },{
      path: '/news/:id',
      name: 'news',
      component: News('article')
    }, {
      path: '/nstest/:page?',
      name: 'nstest',
      component: Nstest('nstest')
    }, {
      path: '/itemdetail',
      name: 'itemdetail',
      component: ItemDeatil
    }, {
      path: '/olist',
      name: 'olist',
      component: olist
    },{
      path: '/companyintroduce',
      name: 'companyintroduce',
      component: companyIntroduction
    },
    {
      path: '/mendiansearch',
      name: 'mendiansearch',
      component: mendianSearch
    },
    {
      path: '/shangxueyuan',
      name: 'shangxueyuan',
      component: shangxueyuan
    },
    {
      path: '/brandintroduce',
      name: 'brandintroduce',
      component: brandIntroduction
    },{
      path: '/honorintroduce',
      name: 'honorintroduce',
      component: honorIntroduction
    },{
      path: '/brouter/:querydata',
      name: 'brouter',
      component: Nstest('brouter')
    },{
      path: '/admin/:page?',
      name: 'admin',
      meta: {
        Auth: true
      },
      component: Admin('admin')
    }, {
      path: '/publish/:id?',
      name: 'publish',
      meta: {
        Auth: true
      },
      component: Publish
    },{
      path: '/publishNews/:id?',
      name: 'publishnews',
      meta: {
        Auth: true
      },
      component: PublishNews
    }, {
      path: '/updateAdminInfo',
      name: 'updateAdminInfo',
      meta: {
        Auth: true
      },
      component: UpdateAdminInfo
    }, {
      path: '/updateAdminPassword',
      name: 'updateAdminPassword',
      meta: {
        Auth: true
      },
      component: UpdateAdminPassword
    }, 
    {
      path: '/upIndexPic',
      name: 'upIndexPic',
      meta: {
        Auth: true
      },
      component: upIndexPic
    }, 
    {
      path: '/upComIntrucPic',
      name: 'upComIntrucPic',
      meta: {
        Auth: true
      },
      component: upComIntrucPic
    }, 
    {
      path: '/upTodayRecommend',
      name: 'upTodayRecommend',
      meta: {
        Auth: true
      },
      component: UpTodayRecommend
    }, 
     {
      path: '/UpNewProdtct',
      name: 'UpNewProdtct',
      meta: {
        Auth: true
      },
      component: UpNewProdtct
    }, {
      path: '/upItems',
      name: 'upItems',
      meta: {
        Auth: true
      },
      component: UpItems
    },
    {
      path: '/upMendian/:dateid?',
      name: 'upMendian',
      meta: {
        Auth: true
      },
      component: UpMendian
    },
    {
      path: '/allMendian',
      name: 'allMendian',
      meta: {
        Auth: true
      },
      component: allMendian
    },
    {
      path: '/allNews',
      name: 'allNews',
      meta: {
        Auth: true
      },
      component: allNews
    },
    {
      path: '/allJoinus',
      name: 'allJoinus',
      meta: {
        Auth: true
      },
      component: allJoinus
    },
    {
      path: '/allItems',
      name: 'allItems',
      meta: {
        Auth: true
      },
      component: AllItems
    },{
      path: '/oneItem/:dateid',
      name: 'oneItem',
      meta: {
        Auth: true
      },
      component: OneItem
    },{
      path: '/:page?',
      name: 'index',
      component: List('index')
    }, {
      path: '*',
      name: '404',
      redirect: '/'
    }]
  })
}
