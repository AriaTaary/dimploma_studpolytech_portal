import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate";

export default {
  actions: {
    async getUserFavouriteArticles(
      { rootGetters }
    ) {
      let response = await api.getUserFavourites(rootGetters.getAuthToken);

      if (response.status === 200) {
        this.count = response.data.articles.length

        if (this.count !== 0) {
          const parsedArticles = []

          response.data.articles.forEach(function (article) {
            parsedArticles.push(prepareDate.article(article))
          })

          console.log(parsedArticles);

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
    async getUserLikedArticles(
      { rootGetters }
    ) {
      let response = await api.getUserLiked(rootGetters.getAuthToken);
      console.log(response);

      if (response.status === 200) {
        this.count = response.data.articles.length

        if (this.count !== 0) {
          const parsedArticles = []

          response.data.articles.forEach(function (article) {
            parsedArticles.push(prepareDate.article(article))
          })

          console.log(parsedArticles);

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
  }
}
