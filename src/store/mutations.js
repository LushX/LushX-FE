import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_TOTAL_PAGE: (state, { data }) => {
    state.totalPage = Number(data.data.totalPages)
  },

  SET_TOP_LIST: (state, { data, currentType }) => {
    switch (currentType) {
      case 'movie':
        // state.list = data.data.top
        break

      case 'animation':
        // state.list = data.data.top
        break

      case 'cam':
        // state.list = data.data.top
        break

      case 'tv':
        // state.list = data.data.top
        break

      case 'article':
        state.list = data.data.content
        break

      default:
        break
    }
  },

  SET_USER: (state, { data }) => {
    state.user = data.data
  },

  SWITCH_TYPE: (state, { type }) => {
    state.currentType = type
  }
}
