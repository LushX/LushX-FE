import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { data }) => {
    state.list = data.data.top
  },

  SET_USER: (state, { data }) => {
    state.user = data.data
  },

  SWITCH_TYPE: (state, { type }) => {
    state.currentType = type    
  }
}
