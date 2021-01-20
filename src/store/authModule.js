import api from '../network/api'

export default {
  state: {
    auth_token: ''
  },
  getters: {
    getAuthToken (state) {
      return state.auth_token
    }
  },
  actions: {
    setAuthToken (state, token) {
      state.commit('setAuthToken', token)
    },

    async logout (state) {
      if (!state.getters.getAuthToken) {
        return null
      }

      const response = await api.logout(state.getters.getAuthToken)

      if (response.status) {
        state.commit('resetState')
      } else {
        alert('Произошла неизвестная ошибка!')
      }
    }
  },
  mutations: {
    setAuthToken (state, token) {
      state.auth_token = token
    },
    resetState (state) {
      state.auth_token = ''
      state.user = {}
      state.roles = {}
    }
  }
}
