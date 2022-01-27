import api from './api'
import SecureLS from 'secure-ls'

const ls = new SecureLS({
    encodingType: 'rc4',
    isCompression: false,
    encryptionSecret: 'Zs%Ma??5Qn,!ZB#_nhM',
})

export default {
    isLogin () {
        return !!this.getUser()
    },
    getUser () {
        return ls.get('user')
    },
    getToken () {
        return ls.get('token')
    },
    getHeader () {
        return { Authorization: this.getToken() }
    },
    setUser (user) {
        ls.set('user', user)
    },
    setToken (token) {
        ls.set('token', token)
    },
    logout () {
        ls.remove('user')
        ls.remove('token')
    },
    login (email, password) {
        const self = this
        return new Promise((resolve, reject) => {
            api.post('/v1/api/console/login', {
                email,
                password,
            })
                .then(async response => {
                    self.setUser(response.user)
                    self.setToken(response.token)
                    resolve(response)
                })
                .catch(e => {
                    reject(e)
                })
        })
    },
    sendOtpEmail (emailForgot) {
        return new Promise((resolve, reject) => {
            api.post('/v1/api/forgot-password-otp', {
                emailForgot,
            })
                .then(async response => {
                    resolve(response)
                })
                .catch(e => {
                    reject(e)
                })
        })
    },
    verifyCode (param) {
        return new Promise((resolve, reject) => {
            api.post('/v1/api/auth/verify-code', param)
                .then(async response => {
                    resolve(response)
                })
                .catch(e => {
                    reject(e)
                })
        })
    },
    resetPassword (param) {
        return new Promise((resolve, reject) => {
            api.post('/v1/api/auth/password-reset', param)
                .then(async response => {
                    resolve(response)
                })
                .catch(e => {
                    reject(e.errors)
                })
        })
    },
}
