<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title">
          <h1>Мои вакансии</h1>
        </div>
      </div>
      <div class="empty" v-if="this.count === 0">
        <p>Вы пока не добавляли вакансии</p>
      </div>
      <div v-else>
        <div v-if="loading" class="loading">
          <img src="/img/preloader.svg" alt="Загрузка данных">
        </div>
        <VacancyMini
          v-else
          v-for="vacancy in this.vacancies"
          :key='vacancy.id'
          v-bind:vacancy="vacancy"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/network/api'
import VacancyMini from '@/components/VacancyMini'

moment.locale('ru')

export default {
  components: {
    VacancyMini
  },
  data: () => ({
    loading: true,
    search: '',
    count: '',
    vacancy: [
      {
        id: '',
        author: '',
        title: '',
        description: '',
        created_at: '',
        salary: '',
        categories: [
          {
            id: '',
            name: ''
          }
        ]
      }
    ]
  }),

  methods: {
      editAction () {
        this.$router.push({ name: 'PersonalEdit' })
      }
  },

  async created () {
    const response = await api.getUserVacancies(this.$store.getters.getAuthToken)

    if (response.status === 200){
      this.count = response.data.count

      if (this.count !== 0){
        const parsedVacancies = []

        response.data.vacancies.forEach(function(vacancy, key, vacancies){
          const categories = []

          vacancy.categories.forEach(
            function (category, categoryKey, categoriesArray){
              categories.push(
              {
                slug: category.slug,
                name: category.name
              }
            )}
          )

          parsedVacancies.push({
            id: vacancy.id,
            author: vacancy.company.name,
            title: vacancy.title,
            description: vacancy.description,
            created_at: moment(vacancy.created_at).format('llll'),
            categories: categories,
            salary: vacancy.salary
          })
        })

        this.vacancies = parsedVacancies
        this.loading = false
      }
    }
    else {
      alert("Произошла ошибка")
    }
  }
}

</script>
