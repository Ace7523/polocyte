export default {

  NEWS_LIST_PAGE (state, data) {
    state.newsList = data.result1.data.result
    state.newsListLength = data.result1.data.total
  },

  NEWS_LIST_BY_TAG (state, data) {
    state.newsList = data.result1.data.result
    state.newsListTagLength = data.result1.data.total
  },

  NEWS_LIST_BY_TIME (state, data) {
    state.newsList = data.result1.data.result
    state.newsListTimeLength = data.result1.data.total
  },

  NEWS_PAGE (state, data) {
    state.newsDetail = data.news.data.result[0]
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  INDEX_PAGE (state, data) {
    state.articleList = data.posts.data.result
    state.total = data.posts.data.total
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  DETAIL_PAGE (state, data) {
    state.articleDetail = data.article.data.result[0]
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  NS_TEST (state, data) {
    state.nstest = data.nstest.data
    state.allstates = data.allstates.data.result
    state.allitems = data.allitems.data
  },

  ARTICLES_BY_TAG (state, data) {
    state.articleList = data.articlesByTag.data.result
    state.total = data.articlesByTag.data.total
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  ARTICLES_BY_SEARCH (state, data) {
    state.articleList = data.articlesBySearch.data.result
    state.total = data.articlesBySearch.data.total
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  ARTICLES_BY_ARCHIVE (state, data) {
    state.articleList = data.articlesByArchive.data.result
    state.total = data.articlesByArchive.data.total
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  TAGS (state, data) {
    state.tags = data.data.result
  },

  ADMINISTRATOR (state, data) {
    state.administrator = data.data.result[0]
  },

  ARTICLES (state, data) {
    state.articles = data.data
  }
}
