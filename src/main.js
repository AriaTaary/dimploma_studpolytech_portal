import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'

import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import { getUserLocales } from 'get-user-locale'
import { matchBrowserLocale } from '@/helpers/langDetector.js'

import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

Vue.config.productionTip = false

const messages = {
  en,
  ru
}

const i18n = new VueI18n({
  locale: matchBrowserLocale(Object.keys(messages), getUserLocales()),
  messages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
