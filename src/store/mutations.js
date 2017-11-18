import Vue from 'vue'
import storage from 'store'

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

  SET_AUTHORIZATION: (state, { data }) => {
    storage.get('authorization') ? state.authorization = storage.get('authorization') : state.authorization = data.data.Authorization
  },

  SET_USERID: (state, { data }) => {
    storage.get('userId') ? state.userId = storage.get('userId') : state.userId = data.data.info.userId
  },

  SWITCH_TYPE: (state, { type }) => {
    storage.get('currentType') ? state.currentType = storage.get('currentType') : state.currentType = type
  }
}
