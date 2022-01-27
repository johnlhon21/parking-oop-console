
const parentStates = {
  loading: false,
  status: null,
  errors: {},
  message: null,
}

const setLoading = (state, value = true) => {
  state.loading = value
  state.errors = {}
  state.status = null
  state.message = null
}

const clearError = (state) => {
  state.errors = {}
}

const setError = (state, error) => {
  state.loading = false
  state.message = error.status !== 422 ? error.errors.message : ''
  state.errors = error.errors
  state.status = error.status
}

const setSuccess = (state, response) => {
  state.loading = false
  state.message = response.message
  state.status = 200
}

const setMessage = (state, value) => {
  state.message = value
}

const setStatus = (state, status) => {
  state.status = status
}

const parentMutations = {
  setLoading,
  setError,
  setSuccess,
  setMessage,
  setStatus,
  clearError,
}

export default {
  parentStates,
  parentMutations,
}
