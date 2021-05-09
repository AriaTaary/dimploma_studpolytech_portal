<template>
  <div class="container">
    <div class="content">
      <div class="feed-body">
        <div class="feed">
          <div class="feed-title">
            <div class="content-title">
              <h1>Все вакансии</h1>
            </div>
            <div class="feed-title-actions">
              <button class="button-main">Создать</button>
              <button class="search-button" type="submit"><img class="search" src="/img/search.svg"></button>
              <input class="input-search" placeholder="Поиск..." type="search">
            </div>
          </div>
          <div class="content-settings">
            <p class="filter">Фильтровать</p>
            <p class="sort">Сортировать</p>
          </div>
          <div class="vacancies-feed">
            <div v-if="loading" class="mini_loading">
              <img src="/img/preloader.svg" alt="Загрузка данных">
            </div>
            <VacancyBase
              v-else
              v-for="vacancy in this.vacancies"
              :key='vacancy.id'
              v-bind:vacancy="vacancy"
            />
          </div>
        </div>
        <div class="advisory">
          <div class="advisory-block">
            <h4>Работодатели</h4>
            <div class="ad-vacancy">
              <div class="ad-vacancy-info">
                  <p class="vacancy-employer">Название компании</p>
                  <p class="vacancy-сount"><span class="pink">35</span> вакансий</p>
              </div>
            </div>
            <div class="ad-vacancy">
              <div class="ad-vacancy-info">
                  <p class="vacancy-employer">Название компании</p>
                  <p class="vacancy-сount"><span class="pink">35</span> вакансий</p>
              </div>
            </div>
            <div class="ad-vacancy">
              <div class="ad-vacancy-info">
                  <p class="vacancy-employer">Название компании</p>
                  <p class="vacancy-сount"><span class="pink">35</span> вакансий</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import moment from 'moment'
import api from '@/network/api'
import VacancyBase from '@/components/VacancyBase'

moment.locale('ru')

export default {
  components: {
    VacancyBase
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
      // editAction () {
      //   this.$router.push({ name: 'VacancyEdit' })
      // }
  },

  async created () {
    let response = await api.getAllVacancies(this.$store.getters.getAuthToken)
    console.log(response);

    if (response.status === 200){
      this.count = response.data.length
      console.log(this.count);

      if (this.count !== 0){
        const parsedVacancies = []

        response.data.forEach(function(vacancy, key, vacancies){
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

          if (vacancy.salary !== null){
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
