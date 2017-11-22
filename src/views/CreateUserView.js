import UserView from './UserView.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createUserView (type) {
  return {
    name: `${ type }-view`,

    asyncData ({ store }) {
      return store.dispatch('REQ_USER_INFO', { authorization: store.state.authorization })
    },

    title: camelize(type),

    render (h) {
      return h(UserView, { props: { type }})
    }
  }
}
