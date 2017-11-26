import Vue from 'vue'
import storage from 'store'

export default {
  /**
   * 保存动态Title
   */
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  /**
   * 保存总页数
   */
  SET_TOTAL_PAGE: (state, { data }) => {
    state.totalPage = Number(data)
  },

  /**
   * 保存列表数据
   */
  SET_LIST_DATA: (state, { data, currentType }) => {
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

  /**
   * 保存用户Token
   */
  SET_AUTHORIZATION: (state, { data }) => {
    storage.get('authorization')
      ? state.authorization = storage.get('authorization')
      : !function () {
        state.authorization = data
        storage.set('authorization', data)
      } ()
  },

  /**
   * 保存用户Id
   */
  SET_USERID: (state, { data }) => {
    storage.get('userId')
      ? state.userId = storage.get('userId')
      : !function () {
        state.userId = data
        storage.set('userId', data)
      } ()
  },

  /**
   * 保存标签
   */
  SWITCH_TYPE: (state, { type }) => {
    storage.get('currentType')
      ? state.currentType = storage.get('currentType')
      : !function () {
        state.currentType = type
        storage.set('currentType', type)
      } ()
  },

  /**
   * 保存详情数据
   */
  SET_ITEMDATA: (state, { data }) => {
    storage.get('itemData')
      ? state.itemData = storage.get('itemData')
      : !function () {
        state.itemData = data
        storage.set('itemData', data)
      } ()
  },

  /**
   * 保存豆瓣数据
   */
  SET_DOUBAN: (state, { data }) => {
    state.douban = data
  },

  /**
   * 保存用户数据
   */
  SET_USER: (state, { data }) => {
    storage.get('user')
      ? state.user = storage.get('user')
      : !function () {
        state.user = data
        storage.set('user', data)
      } ()
  },

  /**
   * 移除用户数据
   */
  REMOVE_USER: (state) => {
    storage.remove('user')
    storage.remove('authorization')
    storage.remove('userId')
    state.user = {}
    state.authorization = ''
    state.userId = ''
  },

  /**
   * 保存真实播放地址
   */
  SET_VIDEO_URL: (state, { data }) => {
    state.videoUrl = data
  },
}
