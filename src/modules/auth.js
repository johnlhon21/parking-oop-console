import auth from '../services/auth'
import router from '../router'

export default {
    namespaced: true,

    state: {
        user: auth.getUser(),
        token: auth.getToken(),
        login: auth.isLogin(),
        loading: false,
        status: null,
        errors: {},
        message: null,
        verifiedCode: false,
        otpSent: false,
        passwordReset: false,
    },

    mutations: {
        logout (state) {
            auth.logout()
            state.user = null
            state.token = null
            state.login = false
            state.loading = false

            router.push('/login')
        },

        login (state) {
            state.user = auth.getUser()
            state.token = auth.getToken()
            state.login = auth.isLogin()
        },

        loading (state, value = true) {
            state.loading = value
            state.errors = {}
            state.status = null
            state.message = null
        },
        error (state, error) {
            state.loading = false
            state.message = error.status !== 422 ? error.errors.message : ''
            state.errors = error.errors
            state.status = error.status
        },
        success (state, response) {
            state.loading = false
            state.message = response.message
            state.status = 200
        },
        message (state, value) {
            state.message = value
        },
        status (state, status) {
            state.status = status
        },
        verifiedCode (state, value) {
            state.verifiedCode = value
        },
        otpSent (state, value) {
            state.otpSent = value
        },
        passwordReset (state, value) {
            state.passwordReset = value
        },
        user (state, value) {
            state.user = value
        },
    },

    actions: {
        login: async ({ commit }, param) => {
            commit('loading')
            try {
                await auth.login(param.email, param.password).then(async (response) => {
                    commit('login')
                    commit('success', response)
                })
                await commit('loading', false)
                await router.push('/console')
            } catch (error) {
                commit('error', error)
            }
        },
        logout: async () => {
          await auth.logout()
          router.push('/login')
        },
        sendOtpEmail: async ({ commit }, param) => {
            commit('loading')
            try {
                await auth.sendOtpEmail(param).then(async (response) => {
                    commit('message', response.message)
                    commit('otpSent', true)
                })
                await commit('loading', false)
            } catch (errors) {
                commit('errors', errors)
            }
        },
        verifyCode: async ({ commit }, param) => {
            commit('loading')
            try {
                await auth.verifyCode(param).then(async (response) => {
                    commit('verifiedCode', response.data.verified)
                })
                await commit('loading', false)
            } catch (errors) {
                commit('errors', errors)
            }
        },
        resetPassword: async ({ commit }, param) => {
            commit('loading')
            try {
                await auth.resetPassword(param).then(async (response) => {
                    commit('message', response.message)
                    commit('passwordReset', response.data.reset_password)
                })
                await commit('loading', false)
            } catch (errors) {
                commit('errors', errors)
            }
        },
    },
}
