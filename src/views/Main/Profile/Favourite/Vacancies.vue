<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title fav-title">
          <h1>Избранное:</h1>
          <router-link class="not-active-title" :to="{ name: 'PersonalFavouriteArticles', params: { username: this.$store.getters.getUser.username } }">Статьи</router-link>
          <router-link :to="{ name: 'PersonalFavouriteVacancies', params: { username: this.$store.getters.getUser.username } }">Вакансии</router-link>
        </div>
      </div>
      <div class="empty" v-if="this.count === 0">
        <p>Вы пока не добавляли вакансии в избранное</p>
      </div>
      <div v-else>
        <div v-if="loading" class="loading">
          <img src="/img/preloader.svg" alt="Загрузка данных">
        </div>
        <VacancyBase
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
import {mapActions} from 'vuex'
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
    vacancies: []
  }),

  methods:{
    ...mapActions(['getUserFavouriteVacancies']),
    updateVacancy(vacancy, index){
      this.loading = true;
      this.vacancies[index] = vacancy;
      this.loading = false;
    }
  },
  async created () {
    this.vacancies = await this.getUserFavouriteVacancies();
    this.count = this.vacancies.length;
    this.loading = false;
  }
}

</script>
