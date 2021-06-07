import api from '@/network/api'
import moment from 'moment'

export default {
  actions: {
    async getVacancies ({rootGetters}, search = null) {
      let response = await api.getAllVacancies(rootGetters.getAuthToken, search)

      if (response.status === 200) {
        this.count = response.data.data.length

        if (this.count !== 0) {
          const parsedVacancies = []

          response.data.data.forEach(function (vacancy, key, vacancies) {
            const categories = []

            vacancy.categories.forEach(
              function (category, categoryKey, categoriesArray) {
                categories.push(
                  {
                    slug: category.slug,
                    name: category.name
                  }
                )
              }
            )

            if (vacancy.salary !== null) {
              vacancy.salary = vacancy.salary + ' ₽'
            }

            parsedVacancies.push({
              id: vacancy.id,
              author: vacancy.company.name,
              title: vacancy.title,
              description: vacancy.description,
              created_at: moment(vacancy.created_at).format('ll'),
              categories: categories,
              salary: vacancy.salary
            })
          })

          return parsedVacancies
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
