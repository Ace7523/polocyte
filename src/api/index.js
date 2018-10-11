import axios from 'axios'
// 首页文章列表
function posts (id = 1) {
  return axios.get(`/posts?limit=15&page=${id}`)
}

// 获取新闻列表数据
function getNewsList (id = 1) {
  return axios.get(`/getnewslist?limit=15&page=${id}`)
}

function getNewsByTag (tag = '', id = 1) {
  return axios.get(`/getnewsbytag?tag=${tag}&limit=15&page=${id}`)
}

function getNewsByTime (date = '', id = 1) {
  return axios.get(`/getnewsbytime?date=${date}&limit=15&page=${id}`)
}

// 通过标签获取文章列表
function tag (params = '', id = 1) {
  return axios.get(`/tag?tag=${params}&limit=15&page=${id}`)
}

// 通过检索标题获取文章列表
function search (q = '', id = 1) {
  return axios.get(`/search?q=${q}&limit=15&page=${id}`)
}

// 通过归档日期获取文章列表
function archive (date = '', id = 1) {
  return axios.get(`/archive?date=${date}&limit=15&page=${id}`)
}

// 草稿和已发布文章列表
function articles (id = 1) {
  return axios.get(`/articles?limit=15&page=${id}`)
}

// 管理员信息
function administrator () {
  return axios.get('/administrator')
}

// 标签列表信息
function tags () {
  return axios.get('/tags')
}

// 归档信息
function archives () {
  return axios.get('/archives')
}

// 文章详情
function article (id) {
  return axios.get(`/article?id=${id}`)
}

// 新闻详情
function getNewsDetail (id) {
  return axios.get(`/getNewsDetail?id=${id}`)
}

function nstest (id) {
  return axios.get(`/getPoloItem?limit=9&page=${id}`)
}

function getAllStates () {
  return axios.get(`/getAllStates`)
}

function getAllItems() {
  return axios.get(`/getPoloItem`)
}

function getPoloItemsByPost(routerParams){
  return axios.post(`/getPoloItemsByPost`,{
    'querydata':routerParams.querydata,
    'queryarr':routerParams.queryarr,
    'limit': routerParams.limit,
    'page': routerParams.page
  })
}

function nstestAsync (id) {
  return axios.all([nstest(id),getAllStates(),getAllItems()])
}

function getItemsByQueryArr(routerParams){
  return axios.all([getPoloItemsByPost(routerParams),getAllStates(),getAllItems()])
}

/* ============================= */
// 新闻资讯列表页
function newslistpage (id) {
  return axios.all([getNewsList(id)])
}

function newslistByTag (tag, id) {
  return axios.all([getNewsByTag(tag, id)])
}

function newslistByTime (date, id) {
  return axios.all([getNewsByTime(date, id)])
}

// 新闻资讯页
function newspage (id) {
  return axios.all([getNewsDetail(id), administrator(), tags(), archives()])
}

// 首页 
function indexPage (id) {
  return axios.all([posts(id), administrator(), tags(), archives()])
}

// 文章详情页
function detailPage (id) {
  return axios.all([article(id), administrator(), tags(), archives()])
}

// 通过标签获取文章列表
function articlesByTag (params, id) {
  return axios.all([tag(params, id), administrator(), tags(), archives()])
}

// 通过搜索获取文章列表
function articlesBySearch (q, id) {
  return axios.all([search(q, id), administrator(), tags(), archives()])
}

// 通过归档获取文章列表
function articlesByArchive (date, id) {
  return axios.all([archive(date, id), administrator(), tags(), archives()])
}

export default { 
   indexPage,
   detailPage,
   articlesByTag,
   articlesBySearch,
   articlesByArchive, 
   articles, 
   tags, 
   administrator, 
   nstestAsync,
   getItemsByQueryArr,
   newslistpage,
   newspage,
   newslistByTag,
   newslistByTime
  }
