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

      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-form v-else>
        <div class="row-group row-group-profile">

         <div class="column-group-profile">

          <el-form-item prop="last_name">
            <label class="required-label label" for="last_name">Фамилия</label>
            <el-input id="last_name" type="text" class="input" placeholder="Введите фамилию" v-model="formData.last_name"></el-input>
          </el-form-item>

          <el-form-item prop="first_name">
            <label class="required-label label" for="first_name">Имя</label>
            <el-input id="first_name" type="text" class="input" placeholder="Введите имя" v-model="formData.first_name"></el-input>
          </el-form-item>

          <el-form-item prop="middle_name">
            <label class="label" for="middle_name">Отчество</label>
            <el-input id="middle_name" type="text" class="input" placeholder="Введите отчество" v-model="formData.middle_name"></el-input>
          </el-form-item>

          <el-form-item prop="username">
            <label class="required-label label" for="email">Username</label>
            <el-input id="username" type="text" class="input" placeholder="Введите имя пользователя" v-model="formData.username"></el-input>
          </el-form-item>

          <el-form-item prop="date_birth">
            <label class="label" for="date_birth">Дата рождения</label>
            <el-date-picker
              id="date_birth"
              type="date"
              placeholder="Когда вы родились?"
              format="dd.MM.yyyy"
              value-format="yyyy-MM-dd"
              v-model="formData.date_birth"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item prop="tel">
            <label class="label" for="tel">Телефон</label>
            <el-input type="text" id="tel" class="input" placeholder="Введите телефон" v-model="formData.phone"></el-input>
          </el-form-item>

          <el-form-item prop="email">
            <label class="label" for="email">E-mail</label>
            <el-input type="text" id="email" class="input" placeholder="Введите телефон" v-model="formData.email"></el-input>
          </el-form-item>

          <div class="column-form">
            <label class="label" for="bac-grade">Пол</label>
            <el-select id="bac-grade" placeholder="Выберите" v-model="formData.gender">
              <el-option value="male" label="Мужской">Мужской
              </el-option>
              <el-option value="female" label="Женский">Женский
              </el-option>
            </el-select>
          </div>

          <el-form-item prop="image">
            <label class="required-label label" for="image">Аватар</label>
            <el-upload
              class="upload"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary"><p class="button-text">Выберите файл</p></el-button>
              <div class="el-upload__tip" slot="tip">Поддерживаемые форматы: jpg/jpeg/png/gif</div>
            </el-upload>
          </el-form-item>



         </div>

          <div class="column-group-profile">

            <el-form-item prop="about">
            <label class="label" for="about">О себе</label>
            <el-input type="textarea" :rows="4" id="about"  class="input" placeholder="Расскажите о себе" v-model="formData.about"></el-input>
          </el-form-item>

          <el-form-item prop="skills">
            <label class="label" for="about">Ключевые навыки</label>
            <el-input type="textarea" :rows="4" id="about"  class="input" placeholder="Напишите свои ключевые навыки" v-model="formData.key_skills"></el-input>
          </el-form-item>

          <div class="column-form">
            <label class="label" for="bac-grade">Иностранный язык</label>
            <el-select id="bac-grade" placeholder="Выберите" v-model="formData.language">
              <el-option
                v-for="(language, key) in this.languages.languages"
                :key="key"
                :label="language"
                :value="key">
              </el-option>
            </el-select>
          </div>

          <div class="column-form">
            <label class="label" for="bac-grade">Уровень языка</label>
            <el-select id="bac-grade" placeholder="Выберите" v-model="formData.language_level">
              <el-option
                v-for="(level, key) in this.languages.language_levels"
                :key="key"
                :label="level"
                :value="level">
              </el-option>
            </el-select>
          </div>

          <p class="password-label" for="password-block">Изменить пароль</p>
          <div class="password-block" id="password-block">
            <el-form-item prop="password">
              <label class="password-label-first" for="password">Старый пароль</label>
              <el-input type="password"  id="password"  class="input" placeholder="Введите старый пароль" v-model="formData.old_password"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <label class="label" for="password">Новый пароль</label>
              <el-input type="password"  id="password"  class="input" placeholder="Введите новый пароль" v-model="formData.new_password"></el-input>
              <p class="error-message"
                  v-if="this.errors.hasOwnProperty('password')"
              >{{this.errors.password}}</p>
            </el-form-item>

            <el-form-item prop="password">
              <label class="label" for="password">Повторите новый пароль</label>
              <el-input type="password"  id="password"  class="input" placeholder="Повторите новый пароль" v-model="formData.new_password_confirmation"></el-input>
              <p class="error-message"
                  v-if="this.errors.hasOwnProperty('password')"
              >{{this.errors.password}}</p>
            </el-form-item>
          </div>



          </div>
        </div>
          <el-form-item class="one-button-row-profile">
            <el-button class="button-save" type="primary" @click="submit">Сохранить</el-button>
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
    languages: {},
    user: {},
    formData: {},
    request: {},
    errors: {},
  }),

  methods:{
    ...mapActions(['getUser', 'updateUser', 'getAllUserLanguages']),
    async submit(){
      this.loading = true;

      if (this.formData.new_password === this.formData.new_password_confirmation) {
        const formData = new FormData();
        formData.append('first_name', this.formData.first_name);
        formData.append('last_name', this.formData.last_name);
        formData.append('middle_name', this.formData.middle_name);
        formData.append('username', this.formData.username);
        formData.append('date_birth', this.formData.date_birth || '');
        formData.append('phone', this.formData.phone);
        formData.append('email', this.formData.email);
        formData.append('gender', this.formData.gender);
        if (this.$refs.upload.uploadFiles.length !== 0){
          formData.append('avatar', this.$refs.upload.uploadFiles[0].raw);
        }
        formData.append('about', this.formData.about);
        formData.append('key_skills', this.formData.key_skills);
        formData.append('language', this.formData.language || '');
        formData.append('language_level', this.formData.language_level || '');
        formData.append('old_password', this.formData.old_password || '');
        formData.append('new_password', this.formData.new_password);
        formData.append('new_password_confirmation', this.formData.new_password_confirmation);

        // this.request = formData;
        const response = await this.updateUser(formData);
        if (response) {
          alert('Данные успешно сохранены!');
          this.$router.push({ name: 'Personal', params: { username: this.user.username } });
        }
      }
      else{
        this.errors.password = 'Пароли не совпадают';
        this.loading = false;
      }
      // this.request.id = this.article.id;
      // const response = await this.updateArticle(this.request);
      // if (response) {
      //   alert('Данные успешно сохранены!');
      //   this.$router.push({ name: 'ArticleView', params: { id: response.id } });
      // }
    }
  },

  async created () {
    const response = await this.getUser();
    this.user = response;
    this.loading = false;
    this.formData = response;
    this.languages = await this.getAllUserLanguages();
    console.log(this.languages)
  }
}

</script>
