import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView (type) {
  return {
    name: `${ type }-type-view`,

    asyncData ({ store }) {
      let currentType = store.state.currentType
      return store.dispatch('REQ_TOP_DATA', { type, currentType })
    },

    title: camelize(type),

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
