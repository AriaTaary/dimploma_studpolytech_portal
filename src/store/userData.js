import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate";

export default {
  actions: {
    async getUser(
      { rootGetters }
    ) {
      let response = await api.getUserData(rootGetters.getAuthToken)

      if (response.status === 200) {

        const userData = (prepareDate.user(response.data.data));

        return userData;
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getAnotherUser(
      { rootGetters },
      username
    ) {
      let response = await api.getAnotherUser(rootGetters.getAuthToken, username);

      if (response.status === 200) {

        const userData = (prepareDate.user(response.data.data));

        return userData;
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async updateUser(
      { rootGetters },
      formData
    ) {
      let response = await api.updateUserData(rootGetters.getAuthToken, formData);

      if (response.status === 200) {

        return response;
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getUserEducations(
      { rootGetters }
    ) {
      let response = await api.getUserEducations(rootGetters.getAuthToken)

      if (response.status === 200) {

        return response.data.data;
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getAnotherUserEducations(
      { rootGetters },
      username
    ) {
      let response = await api.getAnotherUserEducations(rootGetters.getAuthToken, username)

      if (response.status === 200) {

        return response.data.data;
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async updateUserEducations(
      { rootGetters },
      formData
    ) {
      let response = await api.updateUserEducations(rootGetters.getAuthToken, formData)

      if (response.status === 200) {

        return response;
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getAllUserEducations(
      { rootGetters }
    ) {
      let response = await api.getAllUserEducations(rootGetters.getAuthToken)

      if (response.status === 200) {
        return response.data;
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getAllUserLanguages(
      { rootGetters }
    ) {
      let response = await api.getAllUserLanguages(rootGetters.getAuthToken)

      if (response.status === 200) {
        return response.data;
      }
      else {
        alert("Произошла ошибка")
      }
    },
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
