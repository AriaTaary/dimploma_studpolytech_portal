<template>
  <div v-if="loading" class="big-loading">
    <img src="/img/preloader.svg" alt="Загрузка данных">
  </div>
  <div v-else class="auth-content registration">
    <h1 class="auth-header">Регистрация</h1>

    <el-form ref="user" :model="user" :rules="rules">

      <div class="row-group">
        <div class="column-group">
          <el-form-item prop="last_name">
            <label class="required-label" for="last_name">Фамилия</label>
            <el-input id="last_name" type="text" class="auth-input" placeholder="Введите фамилию" v-model="user.last_name"></el-input>
          </el-form-item>

          <el-form-item prop="first_name">
            <label class="required-label" for="first_name">Имя</label>
            <el-input id="first_name" type="text" class="auth-input" placeholder="Введите имя" v-model="user.first_name"></el-input>
          </el-form-item>

          <el-form-item prop="middle_name">
            <label class="label" for="middle_name">Отчество</label>
            <el-input id="middle_name" type="text" class="auth-input"  placeholder="Введите отчество" v-model="user.middle_name"></el-input>
          </el-form-item>
        </div>

        <div class="column-group">
          <el-col>
            <el-form-item prop="date_birth">
              <label class="label" for="date_birth">Дата рождения</label>
              <el-date-picker id="date_birth" type="date" class="auth-input" placeholder="Когда вы родились?" v-model="user.date_birth" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-form-item prop="gender">
            <label class="label" for="gender">Пол</label>
            <el-select id="gender" class="auth-input" placeholder="Выберите пол" v-model="user.gender">
              <el-option label="Мужской" value="male"></el-option>
              <el-option label="Женский" value="female"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="phone">
            <label class="label" for="email">Телефон</label>
            <el-input id="phone" class="auth-input" placeholder="Введите номер телефона" v-model="user.phone"></el-input>
          </el-form-item>
        </div>
      </div>

      <el-form-item prop="email">
        <label class="required-label" for="email">Email</label>
        <el-input id="email" type="email" class="auth-input" placeholder="Введите email" v-model="user.email"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <label class="required-label" for="password">Пароль</label>
        <el-input id="password" type="password" class="auth-input" placeholder="Введите пароль" v-model="user.password"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <label class="required-label" for="password">Подтвердите пароль</label>
        <el-input id="password_confirmation" type="password" class="auth-input" placeholder="Введите пароль ещё раз" v-model="user.password_confirmation"></el-input>
      </el-form-item>

      <div class="row-group reg-buttons">
        <el-form-item>
          <el-button class="button-auth" type="primary" @click="submitForm('user')">Зарегистрироваться</el-button>
        </el-form-item>
        <p>Уже есть учетная запись? <a class="link" href="/login">Войти</a></p>
      </div>

    </el-form>
  </div>
</template>

<script>
import api from '@/network/api'

export default {
  data () {
    return {
      loading: true,
      user: {
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        last_name: '',
        first_name: '',
        middle_name: '',
        gender: '',
        date_birth: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Это поле обязательно к заполнению',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Пожалуйста, введите корректный адрес электронной почты',
            trigger: ['blur', 'change']
          }
        ],
        phone: [],
        password: [
          {
            required: true,
            message: 'Это поле обязательно к заполнению',
            trigger: 'blur'
          }
        ],
        password_confirmation: [
          {
            required: true,
            message: 'Это поле обязательно к заполнению',
            trigger: 'blur'
          }
        ],
        last_name: [
          {
            required: true,
            message: 'Это поле обязательно к заполнению',
            trigger: 'blur'
          }
        ],
        first_name: [
          {
            required: true,
            message: 'Это поле обязательно к заполнению',
            trigger: 'blur'
          }
        ],
        middle_name: [],
        gender: [],
        date_birth: []
      }
    }
  },
  created () {
    if (this.$store.getters.getAuthToken) {
      this.$router.push('personal')
    } else {
      this.loading = false
    }
  },
  methods: {
    async submitForm (formName) {
      let validation = false

      this.$refs[formName].validate((valid) => {
        if (valid) {
          validation = true
        }
      })

      if (validation) {
        const response = await api.register(this.user)
        if (response.status === 200) {
          const data = response.data
          const authToken = data.data.Authorization
          this.$store.commit('setAuthToken', authToken)
          this.$router.push('personal')
        }
      }
    }
  }
}
</script>
