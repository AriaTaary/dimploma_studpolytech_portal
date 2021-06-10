<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="profile-content-title">
          <h1>Настройки</h1>
          <router-link class="link-profile-active"
              :to="{ name: 'PersonalEdit',
              params: { username: this.user.username }}
          ">профиля</router-link>
          <router-link class="link-profile"
              :to="{ name: 'PersonalEditEducation',
              params: { username: this.user.username }}
          ">образования</router-link>

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

          <el-form-item prop="tel">
            <label class="label" for="tel">Телефон</label>
            <el-input type="text" id="tel" class="input" placeholder="Введите телефон" v-model="user.about"></el-input>
          </el-form-item>

          <p class="password-label" for="password-block">Изменить пароль</p>
          <div class="password-block" id="password-block">
            <el-form-item prop="password">
              <label class="password-label-first" for="password">Старый пароль</label>
              <el-input type="password"  id="password"  class="input" placeholder="Введите старый пароль" v-model="user.about"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <label class="label" for="password">Новый пароль</label>
              <el-input type="password"  id="password"  class="input" placeholder="Введите новый пароль" v-model="user.about"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <label class="label" for="password">Повторите новый пароль</label>
              <el-input type="password"  id="password"  class="input" placeholder="Повторите новый пароль" v-model="user.about"></el-input>
            </el-form-item>
          </div>

         </div>

          <div class="column-group-profile">

          <el-form-item prop="image">
            <label class="required-label label" for="image">Изображение</label>
            <el-upload
              class="upload"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary"><p class="button-text">Выберите файл</p></el-button>
              <div class="el-upload__tip" slot="tip">Поддерживаемые форматы: jpg/jpeg/png/gif</div>
            </el-upload>
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
            <label class="label" for="bac-grade">Иностранный язык</label>
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
            <label class="label" for="bac-grade">Уровень языка</label>
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

          <div class="column-form">
            <label class="label" for="bac-grade">Пол</label>
            <el-select id="bac-grade" placeholder="Выберите">
              <el-option value="male" label="Мужской">Мужской
              </el-option>
              <el-option value="female" label="Женский">Женский
              </el-option>
            </el-select>
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
import {mapActions} from 'vuex'
moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    search: '',
    user: {},
    formData: {
      first_name: '',
      last_name: '',
      middle_name: '',
      username: '',
      date_birth: '',
      about: '',
      key_skills: '',
      language: '',
      langiage_level: '',
      educations: [
        {
          education_type: '',
          university: '',
          faculty: '',
          speciality: '',
          grade: '',
          projects: '',
          date_end: '',
        },
        {
          education_type: 'magistratura',
          university: '',
          faculty: '',
          speciality: '',
          grade: '',
          projects: '',
          date_end: '',
        },
      ],
      courses: {
        university: '',
        speciality: '',
        projects: '',
        date_end: '',
      }
    },
  }),

  methods:{
    ...mapActions(['getUser']),
    setData(response){
      this.user = response;
      console.log(this.user)
    }
  },

  async created () {
    const response = await this.getUser();
    this.setData(response);
    this.loading = false;
  }
}

</script>
