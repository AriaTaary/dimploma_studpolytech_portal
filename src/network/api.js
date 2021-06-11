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
    userEducations: 'user/educations',
    userArticles: 'user/articles',
    userArticle(article_id){
      return 'user/articles/' + article_id;
    },
    userVacancies: 'user/vacancies',
    userVacancy(vacancy_id) {
      return 'user/vacancies/' + vacancy_id;
    },
    responseVacancy(vacancy_id) {
      return 'vacancies/' + vacancy_id + '/response'
    },
    userFavourites: 'user/favourites',
    userLiked: 'user/liked',
    userSubscriptions: 'user/subscriptions',
    educations: 'educations',
    users: 'users',
    vacancies: 'vacancies',
    vacanciesData: 'vacancies/data',
    articles: 'articles',
    categories: 'categories',
    news: 'news',
    newsCategories: 'news-categories',
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
      data: response.data,
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

  async getAllNews(authToken, request = null) {
    const data = (request) ? {
      search: request.searchText,
      filter: request.filter,
      sort: request.sort,
      page: request.page,
    } : {};

    return this.prepareResponse(
      this.execute(
        this.apiRoutes.news,
        'get',
        data,
        true,
        authToken
      )
    )
  },

  async getMainNews(authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.news + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getAllNewsCategories(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.newsCategories,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getAllVacancies(authToken, request = null) {
    const data = (request) ? {
      search: request.searchText,
      filter: request.filter,
      sort: request.sort,
      page: request.page,
    } : {};

    return this.prepareResponse(
      this.execute(
        this.apiRoutes.vacancies,
        'get',
        data,
        true,
        authToken
      )
    )
  },

  async getMainVacancy(authToken, id) {
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

  async getVacanciesData(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.vacanciesData,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async saveVacancy(authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.vacancies + '/' + id + '/favourite',
        'post',
        true,
        {},
        authToken
      )
    )
  },

  async createVacancy(authToken, formData) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userVacancies,
        'post',
        formData,
        true,
        authToken
      )
    )
  },

  async updateVacancy(authToken, formData, vacancy_id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userVacancy(vacancy_id),
        'put',
        formData,
        true,
        authToken
      )
    )
  },

  async responseVacancy(authToken, vacancy_id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.responseVacancy(vacancy_id),
        'post',
        true,
        {},
        authToken
      )
    )
  },

  async getAllArticles(authToken, request = null) {
    const data = (request) ? {
      search: request.searchText,
      filter: request.filter,
      sort: request.sort,
      page: request.page,
    } : {};

    return this.prepareResponse(
      this.execute(
        this.apiRoutes.articles,
        'get',
        data,
        true,
        authToken
      )
    )
  },

  async getAllArticleCategories(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.categories,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getMainArticle(authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.articles + '/' + id,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async ratingArticle(authToken, id, rating) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.articles + '/' + id + '/rating',
        'post',
        {
          rating: rating
        },
        true,
        authToken
      )
    )
  },

  async saveArticle(authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.articles + '/' + id + '/favourite',
        'post',
        true,
        {},
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

  async getUserEducations(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userEducations,
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateUserEducations(authToken, formData) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userEducations,
        'put',
        formData,
        true,
        authToken
      )
    )
  },

  async getAllUserEducations(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.educations,
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

  async createArticle(authToken, formData) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userArticles,
        'post',
        formData,
        true,
        authToken
      )
    )
  },

  async updateArticle(authToken, formData, article_id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userArticle(article_id),
        'post',
        formData,
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
