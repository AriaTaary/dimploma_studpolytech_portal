import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import authModule from './authModule'
import userModule from './userModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    authModule,
    userModule
  },
  plugins: [createPersistedState()]
})
