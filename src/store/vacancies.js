import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate"

export default {
  actions: {
    async getVacancies (
      { rootGetters },
      request = null
    ) {
        let response = await api.getAllVacancies(rootGetters.getAuthToken, request)

        if (response.status === 200) {
          const data = response.data

          if (data.data.length !== 0) {
            const parsedVacancies = []

            data.data.forEach(function (vacancy) {
              parsedVacancies.push(prepareDate.vacancy(vacancy))
            })

            return {
              data: parsedVacancies,
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
  }
}
