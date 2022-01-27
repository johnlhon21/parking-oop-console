import api from './api'

export default {
  getParkingSlots () {
    return new Promise((resolve, reject) => {
      api.get('/v1/api/parking/slots')
        .then(async response => {
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  clearParkingSlots () {
    return new Promise((resolve, reject) => {
      api.delete('/v1/api/parking/slots')
        .then(async response => {
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
}
