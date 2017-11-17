import * as ajax from '../api'
import url from '../api/url'

export default {
  REQ_LIST_DATA: ({ commit, dispatch }, { type }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return ajax.get({
      url: url.TOP_MOVIE
    }).then(data => {
      commit('SET_LIST', { data })
    })
  },

  SET_USER: ({ commit, dispatch }, { data }) => {
    commit('SET_USER', { data })
  },

  SWITCH_TYPE: ({ commit, dispatch }, { type }) => {
    commit('SWITCH_TYPE', { type })
  }
}
