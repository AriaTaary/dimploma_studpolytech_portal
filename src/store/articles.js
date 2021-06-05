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
        this.count = response.data.length

        if (this.count !== 0) {
          const parsedArticles = []

          response.data.forEach(function (article) {
            parsedArticles.push(prepareDate.article(article))
          })

          return parsedArticles;
        }
        else {
          return [];
        }
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getCategories({ rootGetters }) {
        let response = await api.getAllArticleCategories(rootGetters.getAuthToken)

        if (response.status === 200) {
          this.count = response.data.length

          if (this.count !== 0) {
            const parsedCategories = []

            response.data.forEach(function (category, key, categories) {

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
        return prepareDate.article(response.data)
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
        return prepareDate.article(response.data)
      }
      else {
        alert("Произошла ошибка")
      }
    },
  }
}
