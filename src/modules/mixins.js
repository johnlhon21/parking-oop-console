
export default {
  namespaced: true,

  state: {
    progress: false,
    notify: {
      show: false,
      text: null,
      color: null,
      timeout: 2000,
    },
  },
  mutations: {
    SET_PROGRESS (state, value) {
      state.progress = value
    },
    SET_NOTIFY (state, value) {
      state.notify = value
    },
  },
  actions: {
    PROGRESS: ({ commit }, value) => {
      commit('SET_PROGRESS', value)
    },
    NOTIFY: ({ commit }, value) => {
      value.show = true
      commit('SET_NOTIFY', value)
    },
  },
}
