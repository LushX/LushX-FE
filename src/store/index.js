import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      totalPage: 1,
      itemsPerPage: 20,
      list: [],
      user: {},
      authorization: '',
      userId: '',
      currentType: 'movie'
    },
    actions,
    mutations
  })
}
