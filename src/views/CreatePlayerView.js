import PlayerView from './PlayerView.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default function createPlayerView (type) {
  return {
    name: `${ type }-view`,

    asyncData ({ store }) {
      console.log(store.state.itemData.value)
      return store.dispatch('REQ_VIDEO_URL', { data: store.state.itemData.value })
    },

    title: camelize(type),

    render (h) {
      return h(PlayerView, { props: { type }})
    }
  }
}
