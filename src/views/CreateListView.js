import article from '../views/Article.vue'
import list from '../views/List.vue'
// import classify from '../views/Classify.vue'
import nstest from '../views/Nstest.vue'
import admin from '../views/admin/Admin.vue'

export function Article (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store, route }) {
      return store.dispatch('DETAIL_PAGE', route.params.id)
    },
    render (h) {
      return h(article)
    }
  }
}

// export function Classify (type) {
//   return {
//     name: `${type}-stories-view`,
//     asyncData ({ store, route }) {
//       return store.dispatch('DETAIL_PAGE', route.params.id)
//     },
//     render (h) {
//       return h(classify)
//     }
//   }
// }

export function Nstest (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store, route }) {
      return store.dispatch('NS_TEST')
    },
    render (h) {
      return h(nstest,{ props: { type } })
    }
  }
}

export function List (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store }) {
      return store.dispatch('LIST_PAGE')
    },
    render (h) {
      return h(list, { props: { type } })
    }
  }
}

export function Admin (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store }) {
      return store.dispatch('ARTICLES')
    },
    render (h) {
      return h(admin, { props: { type } })
    }
  }
}
