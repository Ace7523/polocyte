import Vue from 'vue'
import Router from 'vue-router'
import { Article, List, Admin , Classify , Nstest} from '../views/CreateListView'
const Login = () =>
  import('../views/Login.vue')

const Publish = () =>
  import('../views/admin/Publish.vue')

const UpdateAdminInfo = () =>
  import('../views/admin/UpdateAdminInfo.vue')

const UpdateAdminPassword = () =>
  import('../views/admin/UpdateAdminPassword.vue')

const UpTodayRecommend = () =>
  import('../views/admin/UpTodayRecommend.vue')

const UpNewProdtct = () =>
  import('../views/admin/UpNewProduct.vue')

const UpItems = () =>
  import('../views/admin/UpItems.vue')  

const AllItems = () =>
  import('../views/admin/AllItems.vue')   

const OneItem = () =>
  import('../views/admin/OneItem.vue')     

const ItemDeatil = () =>
  import('../views/ItemDetail.vue') 

const companyIntroduction = () =>
  import('../views/company-introduction.vue') 

const brandIntroduction = () =>
  import('../views/brand-introduction.vue')  

const honorIntroduction = () =>
  import('../views/honor-introduction.vue')    
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
      path: '/classify/:id',
      name: 'classify',
      component: Classify('article')
    }, {
      path: '/nstest/:page?',
      name: 'nstest',
      component: Nstest('nstest')
    }, {
      path: '/itemdetail',
      name: 'itemdetail',
      component: ItemDeatil
    }, {
      path: '/companyintroduce',
      name: 'companyintroduce',
      component: companyIntroduction
    },{
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
    }, {
      path: '/upTodayRecommend',
      name: 'upTodayRecommend',
      meta: {
        Auth: true
      },
      component: UpTodayRecommend
    },  {
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
    }, {
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
