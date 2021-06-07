import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate";

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
            last_page: data.meta.last_page,
            total: data.meta.total,
            per_page: data.meta.per_page,

          };
        }
        else {
          return {
            data: [],
            current_page: null,
            last_page: null,
            total: null,
            per_page: null,
          };
        }
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getCategories({ rootGetters }) {
        let response = await api.getAllArticleCategories(rootGetters.getAuthToken)

        if (response.status === 200) {
          this.count = response.data.data.length

          if (this.count !== 0) {
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
  }
}
