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

         <div class="column-group-profile">

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

          <el-form-item prop="middle_name">
            <label class="label" for="middle_name">Аватар</label>
            <el-input id="avatar" type="file" class="input"></el-input>
          </el-form-item>

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

          <el-form-item prop="about">
            <label class="label" for="about">О себе</label>
            <el-input type="textarea" :rows="2" id="about"  class="input" placeholder="Расскажите о себе" v-model="user.about"></el-input>
          </el-form-item>

          <el-form-item prop="skills">
            <label class="label" for="about">Ключевые навыки</label>
            <el-input type="textarea" :rows="2" id="about"  class="input" placeholder="Напишите свои ключевые навыки" v-model="user.key_skills"></el-input>
          </el-form-item>

          <div class="column-form">
            <label class="label-select" for="bac-grade">Иностранный язык</label>
            <el-select id="bac-grade" placeholder="Выберите">
              <el-option value="" label="Английский">Английский
              </el-option>
              <el-option value="" label="Французский">Французский
              </el-option>
              <el-option value="" label="Немецкий">Немецкий
              </el-option>
            </el-select>
          </div>

          <div class="column-form">
            <label class="label-select" for="bac-grade">Уровень языка</label>
            <el-select id="bac-grade" placeholder="Выберите">
              <el-option value="" label="A1">A1
              </el-option>
              <el-option value="" label="A2">A2
              </el-option>
              <el-option value="" label="B1">B1
              </el-option>
              <el-option value="" label="B2">B2
              </el-option>
              <el-option value="" label="C1">C1
              </el-option>
              <el-option value="" label="C2">C2
              </el-option>
            </el-select>
          </div>

         </div>

          <div class="column-group-profile">

            <h2 class="label-title">Образование</h2>

            <div class="profile-settings-block">
              <p class="profile-settings-block-title">Бакалавриат</p>

              <el-form-item prop="bac-uni">
                <label class="label" for="bac-uni">Учебное заведение</label>
                <el-input id="bac-uni" type="text" class="input" placeholder="Введите название учебного заведения" v-model="user.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="bac-faculty">
                <label class="label" for="bac-faculty">Факультет</label>
                <el-input id="bac-faculty" type="text" class="input" placeholder="Введите факультет" v-model="user.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="bac-specialization">
                <label class="label" for="bac-specialization">Специализация</label>
                <el-input id="bac-specialization" type="text" class="input" placeholder="Введите специализацию" v-model="user.speciality"></el-input>
              </el-form-item>

              <div class="column-form">
                <label class="label-select" for="bac-grade">Курс</label>
                <el-select id="bac-grade" placeholder="Выберите">
                  <el-option value="" label="1">1
                  </el-option>
                  <el-option value="" label="2">2
                  </el-option>
                  <el-option value="" label="3">3
                  </el-option>
                  <el-option value="" label="4">4
                  </el-option>
                  <el-option value="" label="5">5
                  </el-option>
                  <el-option value="" label="Закончил">Закончил
                  </el-option>
                </el-select>
              </div>

              <el-form-item prop="bac-projects">
                <label class="label" for="bac-projects">Проекты</label>
                <el-input type="textarea" :rows="2" id="bac-projects"  class="input" placeholder="Расскажите о выполненных проектах" v-model="user.about"></el-input>
              </el-form-item>
            </div>

            <div class="profile-settings-block">
              <p class="profile-settings-block-title">Специалитет</p>

              <el-form-item prop="sp-uni">
                <label class="label" for="sp-uni">Учебное заведение</label>
                <el-input id="sp-uni" type="text" class="input" placeholder="Введите название учебного заведения" v-model="user.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="sp-faculty">
                <label class="label" for="sp-faculty">Факультет</label>
                <el-input id="sp-faculty" type="text" class="input" placeholder="Введите факультет" v-model="user.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="sp-specialization">
                <label class="label" for="sp-specialization">Специализация</label>
                <el-input id="sp-specialization" type="text" class="input" placeholder="Введите специализацию" v-model="user.speciality"></el-input>
              </el-form-item>

              <div class="column-form">
                <label class="label-select" for="sp-grade">Курс</label>
                <el-select id="sp-grade" placeholder="Выберите">
                  <el-option value="" label="1">1
                  </el-option>
                  <el-option value="" label="2">2
                  </el-option>
                  <el-option value="" label="3">3
                  </el-option>
                  <el-option value="" label="4">4
                  </el-option>
                  <el-option value="" label="5">5
                  </el-option>
                  <el-option value="" label="6">6
                  </el-option>
                  <el-option value="" label="Закончил">Закончил
                  </el-option>
                </el-select>
              </div>

              <el-form-item prop="sp-projects">
                <label class="label" for="sp-projects">Проекты</label>
                <el-input type="textarea" :rows="2" id="sp-projects"  class="input" placeholder="Расскажите о выполненных проектах" v-model="user.about"></el-input>
              </el-form-item>
            </div>

            <div class="profile-settings-block">
              <p class="profile-settings-block-title">Магистратура</p>

              <el-form-item prop="mac-uni">
                <label class="label" for="mac-uni">Учебное заведение</label>
                <el-input id="mac-uni" type="text" class="input" placeholder="Введите название учебного заведения" v-model="user.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="mag-faculty">
                <label class="label" for="mag-faculty">Факультет</label>
                <el-input id="mag-faculty" type="text" class="input" placeholder="Введите факультет" v-model="user.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="mag-specialization">
                <label class="label" for="mag-specialization">Специализация</label>
                <el-input id="mag-specialization" type="text" class="input" placeholder="Введите специализацию" v-model="user.speciality"></el-input>
              </el-form-item>

              <div class="column-form">
                <label class="label-select" for="mag-grade">Курс</label>
                <el-select id="mag-grade" placeholder="Выберите">
                  <el-option value="" label="1">1
                  </el-option>
                  <el-option value="" label="2">2
                  </el-option>
                  <el-option value="" label="3">3
                  </el-option>
                  <el-option value="" label="Закончил">Закончил
                  </el-option>
                </el-select>
              </div>

              <el-form-item prop="mag-projects">
                <label class="label" for="mag-projects">Проекты</label>
                <el-input type="textarea" :rows="2" id="mag-projects"  class="input" placeholder="Расскажите о выполненных проектах" v-model="user.about"></el-input>
              </el-form-item>
            </div>

            <div class="profile-settings-block">
              <p class="profile-settings-block-title">Курсы повышения квалификации</p>

              <el-form-item prop="university">
                <label class="label" for="unuversity">Название образовательного учреждения</label>
                <el-input id="unuversity" type="text" class="input" placeholder="Введите название" v-model="user.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="course-specialization">
                <label class="label" for="course-specialization">Специализация</label>
                <el-input id="course-specialization" type="text" class="input" placeholder="Введите специализацию" v-model="user.speciality"></el-input>
              </el-form-item>

              <el-form-item prop="bac-projects">
                <label class="label" for="bac-projects">Проекты</label>
                <el-input type="textarea" :rows="2" id="bac-projects"  class="input" placeholder="Расскажите о выполненных проектах" v-model="user.about"></el-input>
              </el-form-item>
            </div>



          </div>


        </div>
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
