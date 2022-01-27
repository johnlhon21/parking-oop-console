import api from './api'

export default {
  park (params) {
    return new Promise((resolve, reject) => {
      api.post('/v1/api/park/' + params.entry_point_coverage, params)
        .then(async response => {
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  unpark (params) {
    return new Promise((resolve, reject) => {
      api.post('/v1/api/unpark/' + params.id)
        .then(async response => {
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
}
