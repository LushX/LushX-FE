import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      authorization : '',
      itemsPerPage  : 20,
      currentType   : 'movie',
      totalPage     : 1,
      itemData      : {},
      douban        : {},
      videoUrl      : '',
      userId        : '',
      user          : {},
      list          : []
    },
    actions,
    mutations
  })
}
