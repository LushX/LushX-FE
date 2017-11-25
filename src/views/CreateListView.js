import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView (type) {
  return {
    name: `${ type }-type-view`,

    asyncData ({ store, route }) {
      store.dispatch('SWITCH_TYPE', { type: route.fullPath.split('/')[1] })

      const currentType = route.fullPath.split('/')[1]
      const currentSort = route.fullPath.split('/')[2]
      const model = {
        page: route.params.page - 1,
        size: store.state.itemsPerPage
      }
      return store.dispatch('REQ_LIST_DATA', { type, currentType, currentSort, model })
    },

    title: camelize(type),

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
