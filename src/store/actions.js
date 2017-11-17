import * as ajax from '../api'
import url from '../api/url'

export default {
  REQ_TOP_DATA: ({ commit, dispatch }, { type, currentType, model }) => {
    commit('SET_ACTIVE_TYPE', { type })

    switch (currentType) {
      case 'movie': {
        return ajax.get({
            url: url.TOP_MOVIE
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
            commit('SET_TOTAL_PAGE', { data })
          })
        break
      }

      case 'animation': {
        return ajax.get({
            url: url.TOP_ANIMATION
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
            commit('SET_TOTAL_PAGE', { data })
          })
        break
      }

      case 'cam': {
        return ajax.get({
            url: url.TOP_CAM
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
            commit('SET_TOTAL_PAGE', { data })
          })
        break
      }

      case 'tv': {
        return ajax.get({
            url: url.TOP_TV
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
            commit('SET_TOTAL_PAGE', { data })
          })
        break
      }

      case 'article': {
        return ajax.get({
            url: url.TOP_ARTICLE,
            data: model
          }).then(data => {
            console.log(data)
            commit('SET_TOP_LIST', { data, currentType })
            commit('SET_TOTAL_PAGE', { data })
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
