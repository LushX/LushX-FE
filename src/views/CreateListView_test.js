import ItemList_test from './ItemList_test.vue'

// const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView_test (type) {
  return {
    name: `${type}-stories-view`,

    title: 'test',

    render (h) {
      return h(ItemList_test, { props: { type }})
    }
  }
}
