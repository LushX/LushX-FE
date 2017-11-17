import * as ajax from '../api'
import url from '../api/url'

export default {
  REQ_TOP_DATA: ({ commit, dispatch }, { type, currentType }) => {
    commit('SET_ACTIVE_TYPE', { type })
    switch (currentType) {
      case 'movie': {
        return ajax.get({
            url: url.TOP_MOVIE
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
          })
        break
      }

      case 'animation': {
        return ajax.get({
            url: url.TOP_ANIMATION
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
          })
        break
      }

      case 'cam': {
        return ajax.get({
            url: url.TOP_CAM
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
          })
        break
      }

      case 'tv': {
        return ajax.get({
            url: url.TOP_TV
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
          })
        break
      }

      case 'article': {
        return ajax.get({
            url: url.TOP_ARTICLE
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
          })
        break
      }

      default:
        break
    }
  },

  SET_USER: ({ commit, dispatch }, { data }) => {
    commit('SET_USER', { data })
  },

  SWITCH_TYPE: ({ commit, dispatch }, { type }) => {
    commit('SWITCH_TYPE', { type })
  }
}
