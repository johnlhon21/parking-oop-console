import parent from './parent'
import parkingSlots from '../services/parking.slots'

export default {
  namespaced: true,

  state: {
    ...parent.parentStates,
    parking_slots: [],
  },
  mutations: {
    ...parent.parentMutations,
    SET_PARKING_SLOTS (state, value) {
      state.parking_slots = value
    },
  },
  actions: {
    GET_PARKING_SLOTS: async ({ commit }) => {
      try {
        commit('setLoading')
        const response = await parkingSlots.getParkingSlots()
        commit('setSuccess', response)
        commit('SET_PARKING_SLOTS', response.data.parking_slots)
        return response
      } catch (error) {
        commit('setError', error)
        return error
      }
    },
    CLEAR_PARKING_SLOTS: async ({ commit }, param) => {
      try {
        return await parkingSlots.clearParkingSlots()
      } catch (error) {
        commit('setError', error)
        return error
      }
    },
  },
}
