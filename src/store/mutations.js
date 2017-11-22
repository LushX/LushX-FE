import Vue from 'vue'
import storage from 'store'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_TOTAL_PAGE: (state, { data }) => {
    state.totalPage = Number(data)
  },

  SET_TOP_LIST: (state, { data, currentType }) => {
    switch (currentType) {
      case 'movie':
        state.list = data.data.content
        break

      case 'animation':
        state.list = data.data.content
        break

      case 'cam':
        // state.list = data.data.content
        break

      case 'tv':
        state.list = data.data.content
        break

      case 'article':
        state.list = data.data.content
        break

      default:
        break
    }
  },

  SET_AUTHORIZATION: (state, { data }) => {
    storage.get('authorization')
      ? state.authorization = storage.get('authorization')
      : !function () {
        state.authorization = data
        storage.set('authorization', data)
      } ()
  },

  SET_USERID: (state, { data }) => {
    storage.get('userId')
      ? state.userId = storage.get('userId')
      : !function () {
        state.userId = data
        storage.set('userId', data)
      } ()
  },

  SWITCH_TYPE: (state, { type }) => {
    storage.get('currentType')
      ? state.currentType = storage.get('currentType')
      : !function () {
        state.currentType = type
        storage.set('currentType', type)
      } ()
  },

  SET_ITEMDATA: (state, { data }) => {
    storage.get('itemData')
      ? state.itemData = storage.get('itemData')
      : !function () {
        state.itemData = data
        storage.set('itemData', data)
      } ()
  },

  SET_USER: (state, { data }) => {
    storage.get('user')
      ? state.user = storage.get('user')
      : !function () {
        state.user = data
        storage.set('user', data)
      } ()
  },

  SET_VIDEO_URL: (state, { data }) => {
    state.videoUrl = data
  },
}
