import _ from 'lodash'
import axios from 'axios'
import store from '../store'
import Swal from 'sweetalert2'
import router from '../router'
let APIURL = ''

switch (process.env.VUE_APP_MODE.toLowerCase()) {
    case 'local':
        APIURL = process.env.VUE_APP_API_URL
        break
    case 'development':
        APIURL = process.env.VUE_APP_API_URL
        break
    case 'production':
        APIURL = process.env.VUE_APP_API_URL
        break
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const API = axios.create({
    baseURL: APIURL,
    timeout: 29000,
})

const BASE = APIURL

const POST = (uri, params, headers = {}) => {
    return new Promise((resolve, reject) => {
        API.post(uri, params, { headers })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                error = error.response
                const errors = {}

                switch (error.status) {
                    case 422:
                        _.each(
                            error.data,
                            (item, key) => (errors[key] = _.head(item)),
                        )
                      // eslint-disable-next-line prefer-promise-reject-errors
                        reject({
                          status: error.status,
                          errors,
                        })

                        break
                    case 404:
                    case 402:
                    case 401:
                      // eslint-disable-next-line prefer-promise-reject-errors
                        reject({
                          status: error.status,
                          errors: {
                            message: error.data.message,
                          },
                        })
                        break
                    case 419:
                        Swal.fire({
                            title: 'Session Expired!',
                            icon: 'info',
                            confirmButtonClass: 'md-button md-danger',
                        }).then(() => {
                          store.commit('auth/logout')
                          router.push('/login')
                        })

                        break
                    case 500:
                    case 400:
                      // eslint-disable-next-line no-case-declarations
                      let e = null
                      if (typeof error.data.data !== 'undefined') {
                        e = error.data.data.error
                      }
                      // eslint-disable-next-line prefer-promise-reject-errors
                        reject({
                          status: error.status,
                          errors: {
                            message: error.data.message,
                            error: e,
                          },
                        })
                        break
                    default:
                      // eslint-disable-next-line prefer-promise-reject-errors
                        reject({
                          status: 500,
                          errors: {
                            message:
                              'Something went wrong, please try again',
                          },
                        })
                }
            })
    })
}

const GET = (uri, headers = null) => {
    return new Promise((resolve, reject) => {
        API.get(uri, {
            headers,
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                error = error.response
                switch (error.status) {
                    case 419:
                        Swal.fire({
                          title: 'Session Expired!',
                          icon: 'info',
                          confirmButtonClass: 'md-button md-danger',
                        }).then(() => {
                          store.commit('auth/logout')
                          router.push('/login')
                        })
                        break
                    case 404:
                    case 400:
                    case 401:
                      // eslint-disable-next-line prefer-promise-reject-errors
                        reject({
                          status: error.status,
                          errors: {
                            message: error.data.message,
                          },
                        })
                        break
                    default:
                      // eslint-disable-next-line prefer-promise-reject-errors
                        reject({
                          status: 500,
                          errors: {
                            message:
                              'Something went wrong, please try again',
                          },
                        })
                }
            })
    })
}

const DELETE = (uri, headers = null) => {
    return new Promise((resolve, reject) => {
        API.delete(uri, {
            headers,
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                error = error.response
                switch (error.status) {
                    case 419:
                        Swal.fire({
                          title: 'Session Expired!',
                          icon: 'info',
                          confirmButtonClass: 'md-button md-danger',
                        }).then(() => {
                          store.commit('auth/logout')
                          router.push('/login')
                        })
                        break
                    case 400:
                      // eslint-disable-next-line prefer-promise-reject-errors
                        reject({
                          status: 400,
                          errors: {
                            message: error.data.message,
                          },
                        })
                        break
                    default:
                      // eslint-disable-next-line prefer-promise-reject-errors
                        reject({
                          status: 500,
                          errors: {
                            message:
                              'Something went wrong, please try again',
                          },
                        })
                }
            })
    })
}

const MULTIPLE_DELETE = (uri, data, headers = null) => {
    return API.delete(uri, {
        headers,
        data,
    })
}

export default {
    post: POST,
    get: GET,
    delete: DELETE,
    multipleDelete: MULTIPLE_DELETE,
    baseUrl: BASE,
}
