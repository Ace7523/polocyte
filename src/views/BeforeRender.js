import newslist from '../views/NewsList.vue'
import news from '../views/News.vue'

export function NewsList (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store }) {
    //   return store.dispatch('LIST_PAGE')
      return store.dispatch('NEWS_LIST_PAGE')
    },
    render (h) {
      return h(newslist, { props: { type } })
    }
  }
}

export function News (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store, route }) {
      return store.dispatch('NEWS_PAGE', route.params.id)
    },
    render (h) {
      return h(news)
    }
  }
}

