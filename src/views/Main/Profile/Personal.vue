<template>
  <!-- <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title">
          <h1>Профиль пользователя</h1>
        </div>
        <div class="content-settings">
          <router-link class="button-main" :to="{ name: 'PersonalEdit', params: { username: this.user.username } }">Настройки профиля</router-link>
        </div>
      </div>
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>
      <div v-else class="profile-info">
        <div class="profile-main-info">
          <div class="profile-name-info">
            <img :src="this.user.avatar"  alt="" class="profile-photo">
            <img src="/img/default_avatar.svg"  alt="" class="profile-photo">
            <div class="profile-data">
              <p>@{{ this.user.username }}</p>
              <p>{{ this.user.last_name + ' ' + this.user.first_name + ' ' + this.user.middle_name }}</p>
              <p>Дата рождения: {{ this.user.date_birth }}</p>
              <p>Факультет: {{ this.user.faculty }}</p>
              <p>Направление: {{ this.user.speciality }}</p>
            </div>
          </div>
          <div class="profile-active-info">
              <div v-if="loading" class="mini_loading">
                <img src="/img/preloader-mini.svg" alt="Загрузка данных">
              </div>
              <div class="profile-active-info-block">
                <div class=profile-active-info-item>
                  <p>Зарегестрирован:</p>
                  <p>Подписчики:</p>
                  <p>Опубликованных статей:</p>
                  <p>Опубликованных вакансий:</p>
                </div>
                <div class=profile-active-info-item>
                  <p class="main-item">{{ this.user.created_at }}</p>
                  <p class="main-item">{{ this.user.followers_count }}</p>
                  <p class="main-item">{{ this.user.article_count }}</p>
                  <p class="main-item">{{ this.user.vacancy_count }}</p>
                </div>
              </div>
          </div>
        </div>
        <div class="profile-add-info">
          <h2>О себе</h2>
          <p>{{ this.user.about }}</p>
          <h2>Ключевые навыки</h2>
          <p>{{ this.user.key_skills }}</p>
        </div>
      </div>
    </div>
  </div> -->
    <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title">
          <h1>Профиль</h1>
        </div>
        <!-- <div class="content-settings">
          <router-link class="button-main" :to="{ name: 'PersonalEdit', params: { username: this.user.username } }">Настройки профиля</router-link>
        </div> -->
      </div>
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>
      <div v-else class="profile-content">
        <div class="personal-info">
          <div class="personal-main-info">
            <div class="avatar">
              <!-- <img class="user" src="/img/main-cover-new.png" alt="students"> -->
              <img class="plug" src="/img/avatar.svg" alt="">
            </div>
            <h3 class="profile-name">{{ this.user.first_name + ' ' + this.user.last_name}}</h3>
            <p class="profile-username">@{{ this.user.username }}</p>
            <p>дата рождения</p>
          </div>
          <div class="personal-add-info">
            <!-- <div class="personal-add-info-block">
              <h5>Специализация</h5>
              <p>{{ this.user.speciality }}</p>
            </div> -->
            <div class="personal-add-info-block">
              <h5>Навыки</h5>
              <p>Vue.js, Javascript, Figma</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Иностранные языки</h5>
              <p>Английский: B2</p>
            </div>
            <!-- <div class="personal-add-info-block">
              <h5>Подписчики</h5>
              <p>{{ this.user.followers_count }}</p>
            </div> -->
            <div class="personal-add-info-block">
              <h5>Опубликованные статьи</h5>
              <!-- <p>{{ this.user.article_count }}</p> -->
            </div>
            <div class="personal-add-info-block">
              <h5>Опубликованные вакансии</h5>
              <!-- <p>{{ this.user.vacancy_count }}</p> -->
            </div>
          </div>
        </div>
        <div class="personal-add">
          <div class="personal-education">
            <div class="personal-add-info-block">
              <h5>О себе</h5>
            </div>
            <div class="personal-add-info-block">
              <p>{{this.user.about}}</p>
            </div>
          </div>
          <h2 class="personal-education-title">Образование</h2>
          <div v-if="this.userEducation.first_education !== null" class="personal-education">
            <div class="personal-add-info-block">
              <h5>{{this.userEducation.first_education.education_type}}</h5>
              <p class="profile-education-info">Университет: {{this.userEducation.first_education.university}}</p>
              <p class="profile-education-info">Факультет: {{this.userEducation.first_education.faculty}}</p>
              <p class="profile-education-info">Направление: {{this.userEducation.first_education.speciality}}</p>
              <p class="profile-education-info">Курс: {{this.userEducation.first_education.grade}}</p>
              <p class="profile-education-info">Год окончания: {{this.userEducation.first_education.date_end}}</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Проекты, выполненные в процессе обучения</h5>
               <p>{{this.userEducation.first_education.projects}}</p>
            </div>
          </div>
          <div v-if="this.userEducation.second_education !== null" class="personal-education">
            <div class="personal-add-info-block">
              <h5>Магистратура</h5>
              <p>Информатика и вычислительная техника, веб-технологии, 4 курс</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Проекты, выполненные в процессе обучения</h5>
              <ul class="personal-list">
                <li>Politech:One - сайт гоночной команды</li>
                <li>HelpTense - сервис для изучения неправильных глаголов английского языка</li>
                <li>Интернет-магазин OneClick</li>
                <li>TeamPro - сайт для компании</li>
                <li>Студенческий портал Московского Политеха</li>
              </ul>
            </div>
          </div>
          <div v-if="this.userEducation.courses !== null" class="personal-education">
            <div class="personal-add-info-block">
              <h5>Курсы повышения квалификации</h5>
              <p>GeekBrains</p>
              <p>Frontend-разработчик</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Проекты, выполненные в процессе обучения</h5>
              <ul class="personal-list">
                <li>Politech:One - сайт гоночной команды</li>
                <li>HelpTense - сервис для изучения неправильных глаголов английского языка</li>
                <li>Интернет-магазин OneClick</li>
                <li>TeamPro - сайт для компании</li>
                <li>Студенческий портал Московского Политеха</li>
              </ul>
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
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    mini_loading: true,
    search: '',
    user: {
      username: '',
      avatar: '',
      last_name: '',
      first_name: '',
      middle_name: '',
      faculty: '',
      speciality: '',
      key_skills: '',
      about: '',
      age: '',
      created_at: '',
      followers_count: '',
      article_count: '',
      vacancy_count: ''
    },
    userEducation: '',
  }),
  methods: {
     ...mapActions(['getUser', 'getUserEducations']),
     setData(response){
    this.user = response;
    }
  },
  async created () {
    const response = await this.getUser();
    this.setData(response);

    // const article_response = await api.getUserArticles(this.$store.getters.getAuthToken)

    // if (article_response.status === 200){
    //   this.user.article_count = article_response.data.data.count
    // }
    // else {
    //   alert("Произошла ошибка")
    // }

    // const vacancy_response = await api.getUserVacancies(this.$store.getters.getAuthToken)

    // if (vacancy_response.status === 200){
    //   this.user.vacancy_count = vacancy_response.data.data.count
    //   this.loading = false
    // }
    // else {
    //   alert("Произошла ошибка")
    // }

    this.userEducation = await this.getUserEducations();
    console.log( this.userEducation);

    this.loading = false;
  }
}
</script>
