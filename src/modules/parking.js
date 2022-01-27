import parent from './parent'
import parking from '../services/parking'

export default {
  namespaced: true,

  state: {
    ...parent.parentStates,
    parking_details: {},
  },
  mutations: {
    ...parent.parentMutations,
    SET_PARKING_DETAILS (state, value) {
      state.parking_details = value
    },
  },
  actions: {
    PARK: async ({ commit }, params) => {
      try {
        commit('setLoading')
        const response = await parking.park(params)
        commit('setSuccess', response)
        commit('SET_PARKING_DETAILS', response.data.parking_details)
        return response
      } catch (error) {
        commit('setError', error)
        return error
      }
    },
    UNPARK: async ({ commit }, params) => {
      try {
        commit('setLoading')
        const response = await parking.unpark(params)
        commit('setSuccess', response)
        return response
      } catch (error) {
        commit('setError', error)
        return error
      }
    },
  },
}
