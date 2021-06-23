<template>
  <div class="container">
    <div class="content">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>
      <div v-else class="feed-body">
        <div class="feed">
          <div class="vacancy-feed">
            <VacancyMain
              v-bind:vacancy="vacancy"
              v-bind:employments="employments"
              v-bind:experiences="experiences"
              v-bind:schedules="schedules"
              v-on:vacancyUpdated="updateVacancy"
            />
          </div>
        </div>
        <div class="advisory">
          <div class="advisory-block">
            <h4>Похожие вакансии (пока не реализовано)</h4>
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
import prepareDate from "@/helpers/prepareDate"
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  components: {
    VacancyMain
  },

  data: () => ({
    loading: true,
    search: '',
    count: '',
    vacancy: {},
    employments: {},
    experiences: {},
    schedules: {},
  }),

  methods: {
    ...mapActions(['getVacanciesData']),
    updateVacancy(vacancy){
      this.loading = true;
      this.vacancy = vacancy;
      this.loading = false;
    }
  },

  async created () {
    let response = await api.getMainVacancy(this.$store.getters.getAuthToken, this.$route.params.id)

    if (response.status === 200){
      this.vacancy = prepareDate.vacancy(response.data.data, this.$store.getters.getUser.id);
    }
    else {
      alert("Произошла ошибка");
    }

    const vacanciesData = await this.getVacanciesData();
    this.employments = vacanciesData.employments;
    this.experiences = vacanciesData.experiences;
    this.schedules = vacanciesData.schedules;
    this.loading = false;
  }
}

</script>
