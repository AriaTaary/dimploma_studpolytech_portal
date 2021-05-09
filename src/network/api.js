import axios from 'axios'
import router from '@/router'
import { store } from '@/store'

window.axios = axios

export default {
  host: process.env.VUE_APP_API_URL,
  prefix: 'api/v1/',
  adminPrefix: 'admin/',
  apiRoutes: {
    login: 'login',
    register: 'register',
    logout: 'logout',
    user: 'user',
    userArticles: 'user/articles',
    userVacancies: 'user/vacancies',
    userFavourites: 'user/favourites',
    userLiked: 'user/liked',
    userSubscriptions: 'user/subscriptions',
    users: 'users',
    vacancies: 'vacancies'
  },
  adminRoutes: {
    user: 'users',
    rolesAndPermissions: 'permissions',
    role: 'permissions/role',
    news: 'news',
    newsCategories: 'news-categories',
    articles: 'articles',
    vacancies: 'vacancies',
    categories: 'categories'
  },
  lastModified: '',

  execute: function (url, method, params, prefix = false, authToken = '') {
    if (!(typeof params === 'object')) {
      params = {}
    }

    if (typeof method === 'undefined') {
      method = 'post'
    }

    const requestHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'If-Modified-Since': this.lastModified
    }

    if (authToken) {
      requestHeaders.Authorization = authToken
    }

    let requestUrl = this.host
    if (prefix) {
      requestUrl += this.prefix
    }
    requestUrl += url

    const parameters = params || {}
    const request = {
      method: method,
      url: requestUrl,
      headers: requestHeaders
    }

    if (method === 'get') {
      request.params = parameters
    } else {
      request.data = parameters
    }

    return axios (request)
      .catch (function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            store.commit('resetState')
            return router.push({ name: 'Login' })
          } else {
            return error.response
          }
        } else if (error.request) {
          console.error(error)
        } else {
          console.error('Error', error.message)
        }
      })
  },

  async prepareResponse (resp) {
    const response = await resp

    return {
      status: response.status,
      headers: response.headers,
      data: response.data.data
    }
  },

  async login (user) {
    return await this.execute(this.apiRoutes.login, 'post', user)
  },

  async register (user) {
    return await this.execute(this.apiRoutes.register, 'post', user)
  },

  async logout (authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.logout,
        'post',
        {},
        false,
        authToken
      )
    )
  },

  async getAllVacancies(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.vacancies,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getVacancy(authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.vacancies + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getUserData (authToken, lastModified) {
    this.lastModified = lastModified

    return this.prepareResponse(
      this.execute(
        this.apiRoutes.user,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getUserArticles (authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userArticles,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getUserVacancies(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userVacancies,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getUserFavourites(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userFavourites,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getUserLiked(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userLiked,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getUserSubscriptions(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userSubscriptions,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getUserRoles (authToken, userId) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.users + '/' + userId + '/roles',
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateUserData (authToken, userData) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.user + '/' + userData.id,
        'put',
        userData,
        true,
        authToken
      )
    )
  },

  async getUsersInAdmin (authToken) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.user,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getUserDataForEdit (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.user + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateUserDataFromAdmin (authToken, id, params) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.user + '/' + id,
        'put',
        params,
        true,
        authToken
      )
    )
  },

  async deleteUserDataFromAdmin (authToken, id, params) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.user + '/' + id,
        'delete',
        params,
        true,
        authToken
      )
    )
  },

  async getRolesAndPermissions (authToken) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.rolesAndPermissions,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getRole (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.role + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getNews (authToken) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.news,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getNewsData (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.news + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateAdminNews (authToken, news) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.news + '/' + news.id,
        'put',
        news,
        true,
        authToken
      )
    )
  },

  async deleteAdminNews (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.news + '/' + id,
        'delete',
        {},
        true,
        authToken
      )
    )
  },

  async getNewsCategories (authToken) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsCategories,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getNewsCategory (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsCategories + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateAdminNewsCategory (authToken, newsCategories) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsCategories + '/' + newsCategories.id,
        'put',
        newsCategories,
        true,
        authToken
      )
    )
  },

  async deleteNewsCategory (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsCategories + '/' + id,
        'delete',
        {},
        true,
        authToken
      )
    )
  },

  async getArticles (authToken) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.articles,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getArticle (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.articles + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateAdminArticle (authToken, article) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.articles + '/' + article.id,
        'put',
        article,
        true,
        authToken
      )
    )
  },

  async deleteAdminArticle (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.articles + '/' + id,
        'delete',
        {},
        true,
        authToken
      )
    )
  },

  async getVacancies (authToken) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.vacancies,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getVacancy (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.vacancies + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateAdminVacancy (authToken, vacancy) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.vacancies + '/' + vacancy.id,
        'put',
        vacancy,
        true,
        authToken
      )
    )
  },

  async deleteAdminVacancy (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.vacancies + '/' + id,
        'delete',
        {},
        true,
        authToken
      )
    )
  },

  async getCategories (authToken) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.categories,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getCategory (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.categories + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateAdminCategory (authToken, categories) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.categories + '/' + categories.id,
        'put',
        categories,
        true,
        authToken
      )
    )
  },

  async deleteCategory (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.categories + '/' + id,
        'delete',
        {},
        true,
        authToken
      )
    )
  }

}
