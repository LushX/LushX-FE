import * as ajax from '../api'
import url from '../api/url'

export default {
  /**
   * 获取列表数据
   */
  REQ_LIST_DATA: ({ commit, dispatch }, { type, currentType, currentSort, model }) => {
    commit('SET_ACTIVE_TYPE', { type })

    switch (currentType) {
      case 'movie': {
        if (currentSort === 'top') {
          return ajax.get({
            url: url.TOP_MOVIE,
            data: model
          }).then(data => {
            commit('SET_LIST_DATA', { data, currentType })
            commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
          })
        }
        if (currentSort === 'new') {
          return ajax.get({
            url: url.NEW_MOVIE,
            data: model
          }).then(data => {
            commit('SET_LIST_DATA', { data, currentType })
            commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
          })
        }
        break
      }

      case 'animation': {
        if (currentSort === 'top') {
          return ajax.get({
              url: url.TOP_ANIMATION,
              data: model
            }).then(data => {
              commit('SET_LIST_DATA', { data, currentType })
              commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
            })
        }
        if (currentSort === 'new') {
          return ajax.get({
            url: url.NEW_ANIMATION,
            data: model
          }).then(data => {
            commit('SET_LIST_DATA', { data, currentType })
            commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
          })
        }
        break
      }

      case 'cam': {
        if (currentSort === 'top') {
          return ajax.get({
              url: url.TOP_CAM,
              data: model
            }).then(data => {
              commit('SET_LIST_DATA', { data, currentType })
              commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
            })
        }
        if (currentSort === 'new') {
          return ajax.get({
            url: url.NEW_CAM,
            data: model
          }).then(data => {
            commit('SET_LIST_DATA', { data, currentType })
            commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
          })
        }
        break
      }

      case 'tv': {
        if (currentSort === 'top') {
          return ajax.get({
              url: url.TOP_TV,
              data: model
            }).then(data => {
              commit('SET_LIST_DATA', { data, currentType })
              commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
            })
        }
        if (currentSort === 'new') {
          return ajax.get({
            url: url.NEW_TV,
            data: model
          }).then(data => {
            commit('SET_LIST_DATA', { data, currentType })
            commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
          })
        }
        break
      }

      case 'article': {
        if (currentSort === 'top') {
          return ajax.get({
            url: url.TOP_ARTICLE,
            data: model
          }).then(data => {
            commit('SET_LIST_DATA', { data, currentType })
            commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
          })
        }
        if (currentSort === 'new') {
          return ajax.get({
            url: url.NEW_ARTICLE,
            data: model
          }).then(data => {
            commit('SET_LIST_DATA', { data, currentType })
            commit('SET_TOTAL_PAGE', { data: data.data.totalPages })
          })
        }
        break
      }

      default:
        break
    }
  },

  /**
   * 获取真实播放地址
   */
  REQ_VIDEO_URL: ({ commit, dispatch }, { data }) => {
    return ajax.get({
      url: url.VIDEO_PLAY,
      data: {
        url: data
      }
    }).then(data => {
      commit('SET_VIDEO_URL', { data: data.data })
    })
  },

  /**
   * 获取豆瓣详情
   */
  REQ_DOUBAN_DETAILS: ({ commit, dispatch }, { title }) => {
    return ajax.getJsonp({
      url: url.DOUBAN_API,
      data: {
        q: title
      }
    }).then(data => {
      commit('SET_DOUBAN', { data: data.subjects[0] })
    })
  },

  /**
   * 保存用户Token
   */
  SET_AUTHORIZATION: ({ commit, dispatch }, { data }) => {
    commit('SET_AUTHORIZATION', { data })
  },

  /**
   * 保存用户Id
   */
  SET_USERID: ({ commit, dispatch }, { data }) => {
    commit('SET_USERID', { data })
  },

  /**
   * 保存用户数据
   */
  SET_USER: ({ commit, dispatch }, { data }) => {
    commit('SET_USER', { data })
  },

  /**
   * 移除用户数据
   */
  REMOVE_USER: ({ commit, dispatch }) => {
    commit('REMOVE_USER')
  },

  /**
   * 保存详情数据
   */
  SET_ITEMDATA: ({ commit, dispatch }, { data }) => {
    commit('SET_ITEMDATA', { data })
  },

  /**
   * 获取用户数据
   */
  REQ_USER_INFO: ({ commit, dispatch }, { authorization }) => {
    return ajax.get({
      url: url.USER_INFO,
      authorization: authorization
    }).then(data => {
      commit('SET_USER', { data: data.data })
    })
  },

  /**
   * 切换标签
   */
  SWITCH_TYPE: ({ commit, dispatch }, { type }) => {
    commit('SWITCH_TYPE', { type })
  }
}
