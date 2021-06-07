import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import authModule from './authModule'
import userModule from './userModule'
import vacancies from './vacancies'
import articles from './articles'
import userData from './userData'

Vue.use(Vuex)

export const store = new Vuex.Store({
  mutations: {
    resetState () {
      this.commit('setAuthToken', '')
      this.commit('setUser', {})
      this.commit('setRoles', {})
    }
  },
  modules: {
    authModule,
    userModule,
    vacancies,
    articles,
    userData,
  },
  plugins: [createPersistedState()]
})
