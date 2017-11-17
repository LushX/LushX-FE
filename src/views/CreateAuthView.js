import AuthView from './AuthView.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createListView (type) {
  return {
    name: `${ type }-type-view`,

    title: camelize(type),

    render (h) {
      return h(AuthView, { props: { type }})
    }
  }
}
