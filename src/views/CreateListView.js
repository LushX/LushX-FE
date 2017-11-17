import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView (type) {
  return {
    name: `${ type }-type-view`,

    asyncData ({ store, route }) {
      const currentType = store.state.currentType
      const model = {
        page: route.params.page - 1,
        size: store.state.itemsPerPage
      }
      return store.dispatch('REQ_TOP_DATA', { type, currentType, model })
    },

    title: camelize(type),

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
