import api from '@/network/api'
import moment from 'moment'

export default {
  actions: {
    async getArticles({ rootGetters }, search = null) {
      let response = await api.getAllArticles(rootGetters.getAuthToken, search)

      if (response.status === 200) {
        this.count = response.data.length

        // if (this.count !== 0) {
        //   const parsedVacancies = []

        //   response.data.forEach(function (vacancy, key, vacancies) {
        //     const categories = []

        //     vacancy.categories.forEach(
        //       function (category, categoryKey, categoriesArray) {
        //         categories.push(
        //           {
        //             slug: category.slug,
        //             name: category.name
        //           }
        //         )
        //       }
        //     )

        //     if (vacancy.salary !== null) {
        //       vacancy.salary = vacancy.salary + ' ₽'
        //     }

            // parsedVacancies.push({
            //   id: vacancy.id,
            //   author: vacancy.company.name,
            //   title: vacancy.title,
            //   description: vacancy.description,
            //   created_at: moment(vacancy.created_at).format('ll'),
            //   categories: categories,
            //   salary: vacancy.salary
            // })
        if (this.count !== 0) {
          const parsedArticles = []

          response.data.forEach(function (article, key, articles) {
            const categories = []

            article.categories.forEach(
              function (category, categoryKey, categoriesArray) {
                categories.push(
                  {
                    slug: category.slug,
                    name: category.name
                  }
                )
              }
            )

            parsedArticles.push({
              id: article.id,
              author: article.author.username,
              title: article.title,
              cut: article.cut,
              created_at: moment(article.created_at).format('llll'),
              categories: categories,
              views: article.views,
              rating: article.rating,
              saved: article.saved
            })
          })

          return parsedArticles
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
