<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title">
          <h1>Мои вакансии</h1>
          <router-link class="button-main"
              :to="{ name: 'VacancyCreate'}
          ">Создать</router-link>
        </div>
      </div>
      <div class="empty" v-if="this.count === 0">
        <p>Вы пока не добавляли вакансии</p>
      </div>
      <div v-else>
        <div v-if="loading" class="loading">
          <img src="/img/preloader.svg" alt="Загрузка данных">
        </div>
        <VacancyProfile
          v-for="(vacancy,index) in this.vacancies"
          :key='index'
          v-bind:vacancy="vacancy"
          v-bind:index="index"
          v-on:vacancyUpdated="updateVacancy"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VacancyProfile from '@/components/VacancyProfile'
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  components: {
    VacancyProfile
  },
  data: () => ({
    loading: true,
    count: '',
    vacancies: []
  }),

  methods:{
    ...mapActions(['getUserVacancies']),
    updateVacancy(vacancy, index){
      this.loading = true;
      this.vacancies[index] = vacancy;
      this.loading = false;
    }
  },

  async created () {
    this.vacancies = await this.getUserVacancies();
    this.count = this.vacancies.length;
    this.loading = false;
  }
}

</script>
