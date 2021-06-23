import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import authModule from './authModule'
import userModule from './userModule'
import vacancies from './vacancies'
import articles from './articles'
import news from './news'
import userData from './userData'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    accessFail: false,
  },
  mutations: {
    resetState () {
      this.commit('setAuthToken', '')
      this.commit('setUser', {})
      this.commit('setRoles', {})
    },
    setAccessFail (state, fail = true) {
      state.accessFail = fail;
    }
  },
  modules: {
    authModule,
    userModule,
    vacancies,
    articles,
    news,
    userData,
  },
  plugins: [createPersistedState()]
})
