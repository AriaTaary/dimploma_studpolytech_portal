import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate";

export default {
  actions: {
    async getUserArticles(
      { rootGetters }
    ) {
      let response = await api.getUserArticles(rootGetters.getAuthToken)

      if (response.status === 200) {

        if (response.data.data.articles.length !== 0) {
          const parsedArticles = []

          response.data.data.articles.forEach(function (article) {
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
    async getUserVacancies(
      { rootGetters }
    ) {
      let response = await api.getUserVacancies(rootGetters.getAuthToken)

      if (response.status === 200) {

        if (response.data.data.vacancies.length !== 0) {
          const parsedVacancies = []

          response.data.data.vacancies.forEach(function (vacancy) {
            parsedVacancies.push(prepareDate.vacancy(vacancy))
          })

          return parsedVacancies;
        }
        else {
          return [];
        }
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getUserFavouriteArticles(
      { rootGetters }
    ) {
      let response = await api.getUserFavourites(rootGetters.getAuthToken);

      if (response.status === 200) {

        if (response.data.data.articles.length !== 0) {
          const parsedArticles = []

          response.data.data.articles.forEach(function (article) {
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
    async getUserFavouriteVacancies(
      { rootGetters }
    ) {
      let response = await api.getUserFavourites(rootGetters.getAuthToken);

      if (response.status === 200) {

        if (response.data.data.vacancies.length !== 0) {
          const parsedVacancies = []

          response.data.data.vacancies.forEach(function (vacancy) {
            parsedVacancies.push(prepareDate.vacancy(vacancy))
          })

          return parsedVacancies;
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

      if (response.status === 200) {

        if (response.data.data.articles.length !== 0) {
          const parsedArticles = []

          response.data.data.articles.forEach(function (article) {
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
  }
}
