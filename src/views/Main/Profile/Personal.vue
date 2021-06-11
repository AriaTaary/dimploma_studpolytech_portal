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
            <h3 class="profile-name">{{ this.user.last_name + ' ' + this.user.first_name}}</h3>
            <h3 class="profile-name" v-if="this.user.middle_name !== null">{{ this.user.middle_name}}</h3>
            <p class="profile-username">@{{ this.user.username }}</p>
            <p v-if="this.user.date_birth !== null">Дата рождения: {{ this.user.date_birth }}</p>
          </div>
          <div class="personal-add-info">
            <!-- <div class="personal-add-info-block">
              <h5>Специализация</h5>
              <p>{{ this.user.speciality }}</p>
            </div> -->
            <div class="personal-add-info-block"
              v-if="this.user.phone !== null"
            >
              <h4>Телефон</h4>
              <p>{{ this.user.phone }}</p>
            </div>
            <div class="personal-add-info-block"
              v-if="this.user.email !== null"
            >
              <h4>Email</h4>
              <p>{{ this.user.email }}</p>
            </div>
            <div class="personal-add-info-block"
              v-if="this.user.key_skills !== null"
            >
              <h4>Навыки</h4>
              <p>{{ this.user.key_skills }}</p>
            </div>
            <div class="personal-add-info-block"
              v-if="this.user.language !== null"
            >
              <h4>Иностранные языки</h4>
              <p>{{ this.user.language + ' ' + this.user.language_level }}</p>
            </div>
            <!-- <div class="personal-add-info-block">
              <h5>Подписчики</h5>
              <p>{{ this.user.followers_count }}</p>
            </div> -->
            <div class="personal-add-info-block">
              <h4>Опубликованные статьи</h4>
              <!-- <p>{{ this.user.article_count }}</p> -->
            </div>
            <div class="personal-add-info-block">
              <h4>Опубликованные вакансии</h4>
              <!-- <p>{{ this.user.vacancy_count }}</p> -->
            </div>
          </div>
        </div>
        <div class="personal-add">
          <div v-if="this.user.about !== null" class="personal-education">
            <div class="personal-add-info-block">
              <h5>О себе</h5>
            </div>
            <div class="personal-add-info-block">
              <p>{{this.user.about}}</p>
            </div>
          </div>
          <div v-if="this.userEducation.first_education !== null || this.userEducation.second_education !== null || this.userEducation.courses !== null">
            <h2 class="personal-education-title">Образование</h2>
            <div v-if="this.userEducation.first_education !== null" class="personal-education">
              <div class="personal-add-info-block">
                <h5 class="pink">{{this.userEducation.first_education.education_type}}</h5>
                <p class="profile-education-info">Университет: {{this.userEducation.first_education.university}}</p>
                <p class="profile-education-info">Факультет: {{this.userEducation.first_education.faculty}}</p>
                <p class="profile-education-info">Направление: {{this.userEducation.first_education.speciality}}</p>
                <p class="profile-education-info">Курс: {{this.userEducation.first_education.grade}}</p>
                <p class="profile-education-info">Год окончания: {{this.userEducation.first_education.date_end}}</p>
              </div>
              <div class="personal-add-info-block">
                <h4>Проекты, выполненные в процессе обучения</h4>
                <p>{{this.userEducation.first_education.projects}}</p>
              </div>
            </div>
            <div v-if="this.userEducation.second_education !== null" class="personal-education">
              <div class="personal-add-info-block">
                <h5 class="pink">Магистратура</h5>
                <p class="profile-education-info">Университет: {{this.userEducation.second_education.university}}</p>
                <p class="profile-education-info">Факультет: {{this.userEducation.second_education.faculty}}</p>
                <p class="profile-education-info">Направление: {{this.userEducation.second_education.speciality}}</p>
                <p class="profile-education-info">Курс: {{this.userEducation.second_education.grade}}</p>
                <p class="profile-education-info">Год окончания: {{this.userEducation.second_education.date_end}}</p>
              </div>
              <div class="personal-add-info-block">
                <h4>Проекты, выполненные в процессе обучения</h4>
                <p>{{this.userEducation.second_education.projects}}</p>
              </div>
            </div>
            <div v-if="this.userEducation.courses !== null" class="personal-education">
              <div class="personal-add-info-block">
                <h5 class="pink">Курсы повышения квалификации</h5>
                <p class="profile-education-info">Образовательное учреждение: {{this.userEducation.courses.university}}</p>
                <p class="profile-education-info">Направление: {{this.userEducation.courses.faculty}}</p>
                <p class="profile-education-info">Год окончания: {{this.userEducation.courses.date_end}}</p>
              </div>
              <div class="personal-add-info-block">
                <h4>Проекты, выполненные в процессе обучения</h4>
                <p>{{this.userEducation.courses.projects}}</p>
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
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    mini_loading: true,
    search: '',
    languages: {},
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
    educations: '',
  }),
  methods: {
     ...mapActions(['getUser', 'getUserEducations', 'getAllUserEducations', 'getAllUserLanguages']),
     setData(response){
    this.user = response;
    }
  },
  async created () {
    const response = await this.getUser();
    this.setData(response);

    //получение пользовательского языка
    this.languages = await this.getAllUserLanguages();
    var userLanguage = this.user.language;

    for (var key in this.languages.languages){
      if (key === userLanguage){
        userLanguage = this.languages.languages[key];
      }
    }
    this.user.language =  userLanguage;
    //получение пользовательского языка

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


    this.educations = await this.getAllUserEducations();
    this.userEducation = await this.getUserEducations();

    // код для получения названия первого образования (бакалавриат/специалитет)
    var userEducationType = this.userEducation.first_education.education_type;

    for (var key in this.educations.education_types){
      if (key === userEducationType){
        userEducationType = this.educations.education_types[key];
      }
    }

    this.userEducation.first_education.education_type = userEducationType;
    // код для получения названия первого образования (бакалавриат/специалитет)

    this.loading = false;
  }
}
</script>
