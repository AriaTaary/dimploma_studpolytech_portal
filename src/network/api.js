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
    educations: 'educations',
    languages: 'languages',
    users: 'users',
    userRoles: 'user/roles',
    anotherUser(username) {
      return 'users/' + username
    },
    anotherUserEducations(username) {
      return 'users/' + username + '/educations'
    },
    vacancies: 'vacancies',
    vacanciesData: 'vacancies/data',
    vacancyData(vacancy_id) {
      return 'vacancies/' + vacancy_id
    },
    vacancyFavourite(vacancy_id){
      return 'vacancies/' + vacancy_id + '/favourite'
    },
    articles: 'articles',
    articleRating(article_id){
      return 'articles/' + article_id + '/rating'
    },
    articleFavourite(article_id) {
      return 'articles/' + article_id + '/favourite'
    },
    categories: 'categories',
    news: 'news',
    newsData(news_id){
      return 'news/' + news_id
    },
    newsCategories: 'news-categories',

  },
  adminRoutes: {
    user: 'users',
    userData(user_id){
      return 'users/' + user_id
    },
    rolesAndPermissions: 'permissions',
    role: 'permissions/role',
    roleData(id){
      return 'permissions/role/' + id
    },
    news: 'news',
    newsData(news_id){
      return 'news/' + news_id
    },
    newsCategories: 'news-categories',
    newsCategoriesData(id){
      return 'news-categories/' + id
    },
    articles: 'articles',
    articleData(article_id){
      return 'articles/' + article_id
    },
    vacancies: 'vacancies',
    vacancyData(vacancy_id) {
      return 'vacancies/' + vacancy_id
    },
    categories: 'categories',
    categoryData(category_id) {
      return 'categories/' + category_id
    },
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

  async getMainNews(authToken, news_id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.newsData(news_id),
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

  async getMainVacancy(authToken, vacancy_id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.vacancyData(vacancy_id),
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

  async saveVacancy(authToken, vacancy_id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.vacancyFavourite(vacancy_id),
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

  async ratingArticle(authToken, article_id, rating) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.articleRating(article_id),
        'post',
        {
          rating: rating
        },
        true,
        authToken
      )
    )
  },

  async saveArticle(authToken, article_id) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.articleFavourite(article_id),
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

  async getAnotherUser(authToken, username) {

    return this.prepareResponse(
      this.execute(
        this.apiRoutes.anotherUser(username),
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async getAnotherUserEducations(authToken, username) {

    return this.prepareResponse(
      this.execute(
        this.apiRoutes.anotherUserEducations(username),
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateUserData(authToken, formData) {

    return this.prepareResponse(
      this.execute(
        this.apiRoutes.user,
        'post',
        formData,
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

  async getAllUserLanguages(authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.languages,
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

  // async getUserSubscriptions(authToken) {
  //   return this.prepareResponse(
  //     this.execute(
  //       this.apiRoutes.userSubscriptions,
  //       'get',
  //       {},
  //       true,
  //       authToken
  //     )
  //   )
  // },

  async getUserRoles (authToken) {
    return this.prepareResponse(
      this.execute(
        this.apiRoutes.userRoles,
        'get',
        {},
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

  async getUserDataForEdit (authToken, user_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.userData(user_id),
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateUserDataFromAdmin (authToken, user_id, params) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.userData(user_id),
        'put',
        params,
        true,
        authToken
      )
    )
  },

  async deleteUserDataFromAdmin (authToken, user_id, params) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.userData(user_id),
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
        this.adminPrefix + this.adminRoutes.roleData(id),
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

  async createAdminNews(authToken, formData) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.news,
        'post',
        formData,
        true,
        authToken
      )
    )
  },

  async getNewsData (authToken, news_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsData(news_id),
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async updateAdminNews (authToken, formData, news_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsData(news_id),
        'post',
        formData,
        true,
        authToken
      )
    )
  },

  async deleteAdminNews(authToken, news_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsData(news_id),
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
        this.adminPrefix + this.adminRoutes.newsCategoriesData(id),
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async createAdminNewsCategory(authToken, newsCategory) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsCategories,
        'post',
        newsCategory,
        true,
        authToken
      )
    )
  },

  async updateAdminNewsCategory (authToken, newsCategory) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsCategoriesData(newsCategory.id),
        'put',
        newsCategory,
        true,
        authToken
      )
    )
  },

  async deleteNewsCategory (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.newsCategoriesData(id),
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

  async getArticle (authToken, article_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.articleData(article_id),
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async createAdminArticle(authToken, formData) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.articles,
        'post',
        formData,
        true,
        authToken
      )
    )
  },

  async updateAdminArticle (authToken, article) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.articleData(article_id),
        'put',
        article,
        true,
        authToken
      )
    )
  },

  async deleteAdminArticle (authToken, article_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.articleData(article_id),
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

  async getVacancy (authToken, vacancy_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.vacancyData(vacancy_id),
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async createAdminVacancy(authToken, formData) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.vacancies,
        'post',
        formData,
        true,
        authToken
      )
    )
  },

  async updateAdminVacancy (authToken, request) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.vacancyData(request.id),
        'put',
        request.formData,
        true,
        authToken
      )
    )
  },

  async deleteAdminVacancy (authToken, id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.vacancyData(vacancy_id),
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

  async getCategory (authToken, category_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.categoryData(category_id),
        'get',
        {},
        true,
        authToken
      )
    )
  },

  async createAdminCategory(authToken, category) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.categories,
        'post',
        category,
        true,
        authToken
      )
    )
  },

  async updateAdminCategory (authToken, categories) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.categoryData(categories.id),
        'put',
        categories,
        true,
        authToken
      )
    )
  },

  async deleteCategory (authToken, category_id) {
    return this.prepareResponse(
      this.execute(
        this.adminPrefix + this.adminRoutes.categoryData(category_id),
        'delete',
        {},
        true,
        authToken
      )
    )
  }

}
