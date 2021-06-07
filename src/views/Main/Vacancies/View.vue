<template>
  <div class="container">
    <div class="content">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>
      <div v-else class="feed-body">
        <div class="feed">
          <div class="vacancy-feed">
            <VacancyMain
              v-bind:vacancy="vacancy"
            />
          </div>
        </div>
        <div class="advisory">
          <div class="advisory-block">
            <h4>Похожие вакансии</h4>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название вакансии</p>
              <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
              </div>
            </div>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название вакансии</p>
              <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
              </div>
            </div>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название вакансии</p>
              <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
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
import VacancyMain from '@/components/VacancyMain'

moment.locale('ru')

export default {
  components: {
    VacancyMain
  },

  data: () => ({
    loading: true,
    search: '',
    count: '',
    vacancy: {
      id: '',
      title: '',
      description: '',
      author: '',
      created_at: '',
      categories: [
        {
          id: '',
          name: ''
        }
      ]
    }
  }),

  methods: {
      // editAction () {
      //   this.$router.push({ name: 'VacancyEdit' })
      // }
  },

  async created () {
    let response = await api.getMainVacancy(this.$store.getters.getAuthToken, this.$route.params.id)
    console.log(response);

    if (response.status === 200){
      this.vacancy.id = response.data.data.id,
      this.vacancy.author = response.data.data.company.name,
      this.vacancy.title = response.data.data.title,
      this.vacancy.description = response.data.data.description,
      this.vacancy.created_at = moment(response.data.data.created_at).format('ll'),
      this.vacancy.categories = response.data.data.categories,
      this.vacancy.salary = response.data.data.salary,

      this.loading = false
    }
    else {
      alert("Произошла ошибка")
    }
  }
}

</script>
