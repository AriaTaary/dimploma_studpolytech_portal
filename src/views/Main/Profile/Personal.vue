<template>
  <div class="container">
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
            <!-- <img :src="this.user.avatar"  alt="" class="profile-photo"> -->
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
              <!-- <div v-if="loading" class="mini_loading">
                <img src="/img/preloader-mini.svg" alt="Загрузка данных">
              </div> -->
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
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/network/api'

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
    }
  }),

  async created () {

    const response = await api.getUserData(this.$store.getters.getAuthToken, '')

    if (response.status === 200) {
      const responseUser = response.data.data
      console.log(responseUser)

      this.user.username = responseUser.username
      this.user.avatar = responseUser.avatar
      console.log(this.user.avatar);
      this.user.last_name = responseUser.last_name
      this.user.first_name = responseUser.first_name
      this.user.middle_name = responseUser.middle_name
      this.user.faculty = responseUser.faculty
      this.user.speciality = responseUser.speciality
      this.user.key_skills = responseUser.key_skills
      this.user.about = responseUser.about
      this.user.created_at = moment(responseUser.created_at).format('ll')
      this.user.date_birth = responseUser.date_birth
      this.user.age = moment().diff(responseUser.date_birth, 'years')
      this.user.followers_count = responseUser.followers.length
      // this.loading = false
    }
    else {
      alert("Произошла ошибка")
    }

    const article_response = await api.getUserArticles(this.$store.getters.getAuthToken)

    if (article_response.status === 200){
      this.user.article_count = article_response.data.data.count
    }
    else {
      alert("Произошла ошибка")
    }

    const vacancy_response = await api.getUserVacancies(this.$store.getters.getAuthToken)

    if (vacancy_response.status === 200){
      this.user.vacancy_count = vacancy_response.data.data.count
      this.loading = false
    }
    else {
      alert("Произошла ошибка")
    }
  }
}
</script>
