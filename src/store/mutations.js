import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },
  SET_LIST_TEST: (state, { type, data }) => {
    state.movie.top = data.top
  }
}
