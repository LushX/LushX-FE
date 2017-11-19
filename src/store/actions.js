import * as ajax from '../api'
import url from '../api/url'

export default {
  REQ_TOP_DATA: ({ commit, dispatch }, { type, currentType, currentSort, model }) => {
    commit('SET_ACTIVE_TYPE', { type })

    switch (currentType) {
      case 'movie': {
        if(currentSort === 'top') {
          return ajax.get({
            url: url.TOP_MOVIE,
            data: model
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
            commit('SET_TOTAL_PAGE', { data })
          })
        }
        if(currentSort === 'new') {
          return ajax.get({
            url: url.NEW_MOVIE,
            data: model
          }).then(data => {
            commit('SET_TOP_LIST', { data, currentType })
            commit('SET_TOTAL_PAGE', { data })
          })         
        }
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
            commit('SET_TOP_LIST', { data, currentType })
            commit('SET_TOTAL_PAGE', { data })
          })
        break
      }

      default:
        break
    }
  },

  SET_AUTHORIZATION: ({ commit, dispatch }, { data }) => {
    commit('SET_AUTHORIZATION', { data })
  },

  SET_USERID: ({ commit, dispatch }, { data }) => {
    commit('SET_USERID', { data })
  },

  REQ_USER_INFO: ({ commit, dispatch }, { authorization }) => {
    return ajax.get({
      url: url.USER_INFO,
      authorization: authorization
    }).then(data => {
      console.log(data)
    })
  },

  SWITCH_TYPE: ({ commit, dispatch }, { type }) => {
    commit('SWITCH_TYPE', { type })
  }
}
