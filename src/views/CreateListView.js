import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView (type) {
  return {
    name: `${type}-type-view`,

    asyncData ({ store }) {
      return store.dispatch('REQ_LIST_DATA', { type })
    },

    title: camelize(type),

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
