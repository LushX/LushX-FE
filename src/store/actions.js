import * as ajax from '../api'
import url from '../api/url'

export default {
  REQ_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return ajax.get({
      url: url.TOP_MOVIE
    }).then(data => commit('SET_LIST_TEST', { type, data }))
  }
}
