import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate"
import prepare from '../helpers/prepareDate'

export default {
  actions: {
    async getArticles(
      { rootGetters },
      request = null
    ) {
      let response = await api.getAllArticles(rootGetters.getAuthToken, request)

      if (response.status === 200) {
        const data = response.data

        if (data.data.length !== 0) {
          const parsedArticles = []

          data.data.forEach(function (article) {
            parsedArticles.push(prepareDate.article(article))
          })

          return {
            data: parsedArticles,
            current_page: data.meta.current_page,
            total: data.meta.total,
            per_page: data.meta.per_page,

          };
        }
        else {
          return {
            data: [],
            current_page: null,
            total: null,
            per_page: null,
          };
        }
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async createArticle( { rootGetters }, formData) {
      let response = await api.createArticle(rootGetters.getAuthToken, formData);
      if (response.status === 201) {
        return response;
      }
      else {
        alert("Произошла ошибка");
        return response;
      }
    },
    async updateArticle({ rootGetters }, request) {
      let response = await api.updateArticle(rootGetters.getAuthToken, request.formData, request.id);
      if (response.status === 200) {
        return prepareDate.article(response.data.data)
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getCategories({ rootGetters }) {
        let response = await api.getAllArticleCategories(rootGetters.getAuthToken)

        if (response.status === 200) {

          if (response.data.data.length !== 0) {
            const parsedCategories = []

            response.data.data.forEach(function (category, key, categories) {

              parsedCategories.push({
                id: category.id,
                name: category.name,
              })
            })

            return parsedCategories
          }
          else {
            return []
          }
        }
        else {
          alert("Произошла ошибка")
        }
    },
    async getSavedArticle(
      { rootGetters },
      article_id = null,
    ) {
      const response = await api.saveArticle(rootGetters.getAuthToken, article_id);

      if (response.status === 200) {
        return prepareDate.article(response.data.data)
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async setLikedArticle(
      { rootGetters },
      data = null
    ) {
      const response = await api.ratingArticle(rootGetters.getAuthToken, data.article_id, data.rating);

      if (response.status === 200) {
        return prepareDate.article(response.data.data)
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async createAdminArticle({ rootGetters }, formData) {
      let response = await api.createAdminArticle(rootGetters.getAuthToken, formData);
      if (response.status === 201) {
        return response;
      }
      else {
        alert("Произошла ошибка");
        return response;
      }
    },
  }
}
