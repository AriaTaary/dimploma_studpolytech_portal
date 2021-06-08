import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate";

export default {
  actions: {
    async getNews(
      { rootGetters },
      request = null
    ) {
      let response = await api.getAllNews(rootGetters.getAuthToken, request)

      if (response.status === 200) {
        const data = response.data

        if (data.data.length !== 0) {
          const parsedNews = []

          data.data.forEach(function (news) {
            parsedNews.push(prepareDate.news(news))
          })

          return {
            data: parsedNews,
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
    async getNewsCategories({ rootGetters }) {
      let response = await api.getAllNewsCategories(rootGetters.getAuthToken)

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
    }
  }
}
