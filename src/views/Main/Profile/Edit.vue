<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title">
          <h1>Настройки профиля</h1>
        </div>
      </div>

      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-form v-else ref="user" :model="user" :rules="rules">
         <div class="row-group row-group-profile">
           <div>
          <el-form-item prop="last_name">
            <label class="required-label label" for="last_name">Фамилия</label>
            <el-input id="last_name" type="text" class="input" placeholder="Введите фамилию" v-model="user.last_name"></el-input>
          </el-form-item>

          <el-form-item prop="first_name">
            <label class="required-label label" for="first_name">Имя</label>
            <el-input id="first_name" type="text" class="input" placeholder="Введите имя" v-model="user.first_name"></el-input>
          </el-form-item>

          <el-form-item prop="middle_name">
            <label class="label" for="middle_name">Отчество</label>
            <el-input id="middle_name" type="text" class="input" placeholder="Введите отчество" v-model="user.middle_name"></el-input>
          </el-form-item>
          </div>
          <div class="row-group settings-profile">
            <div class="settings-img-profile">
              <p>Формат: jpeg, png</p>
              <p>Размер: до 1 Мб</p>
              <button class="button-main">Загрузить</button>
            </div>
            <img :src="this.user.avatar" alt="" class="profile-photo">
          </div>
         </div>

          <div class="row-group row-group-profile">
            <el-form-item prop="username">
            <label class="required-label label" for="email">Username</label>
            <el-input id="username" type="text" class="input" placeholder="Введите имя пользователя" v-model="user.username"></el-input>
            </el-form-item>

            <el-form-item prop="date_birth">
            <label class="label" for="date_birth">Дата рождения</label>
            <el-date-picker
              id="date_birth"
              type="date"
              placeholder="Когда вы родились?"
              :picker-options="pickerOptions"
              format="dd.MM.yyyy"
              value-format="yyyy-MM-dd"
              v-model="user.date_birth"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          </div>

          <div class="row-group row-group-profile">
            <el-form-item prop="faculty">
            <label class="label" for="faculty">Факультет</label>
            <el-input id="faculty" type="text" class="input" placeholder="Введите факультет" v-model="user.faculty"></el-input>
            </el-form-item>

             <el-form-item prop="specialization">
            <label class="label" for="specialization">Специализация</label>
            <el-input id="specialization" type="text" class="input" placeholder="Введите специализацию" v-model="user.speciality"></el-input>
            </el-form-item>
          </div>

            <el-form-item prop="about">
            <label class="label" for="about">О себе</label>
            <el-input type="textarea" :rows="2" id="about"  class="input" placeholder="Расскажите о себе" v-model="user.about"></el-input>
            </el-form-item>

            <el-form-item prop="skills">
            <label class="label" for="about">Ключевые навыки</label>
            <el-input type="textarea" :rows="2" id="about"  class="input" placeholder="Напишите свои ключевые навыки" v-model="user.key_skills"></el-input>
            </el-form-item>

          <el-form-item class="one-button-row-profile">
            <el-button class="button-save" type="primary">Сохранить</el-button>
          </el-form-item>

        </el-form>

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
      email_verified_at: '',
      followers_count: '',
      article_count: '',
      vacancy_count: '',
      date_birth: ''
    }
  }),

  async created () {

    const response = await api.getUserData(this.$store.getters.getAuthToken, '')

    if (response.status === 200) {
      const responseUser = response.data

      this.user.username = responseUser.username
      this.user.avatar = responseUser.avatar
      this.user.last_name = responseUser.last_name
      this.user.first_name = responseUser.first_name
      this.user.middle_name = responseUser.middle_name
      this.user.faculty = responseUser.faculty
      this.user.speciality = responseUser.speciality
      this.user.key_skills = responseUser.key_skills
      this.user.about = responseUser.about
      this.user.email_verified_at = moment(responseUser.email_verified_at).format('ll')
      this.user.date_birth = responseUser.date_birth
      this.user.age = moment().diff(responseUser.date_birth, 'years')
      this.user.followers_count = responseUser.followers.length
      this.loading = false
    }
    else {
      alert("Произошла ошибка")
    }
  }
}

</script>
