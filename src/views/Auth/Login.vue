<template>
  <div v-if="loading" class="big-loading">
    <img src="/img/preloader.svg" alt="Загрузка данных">
  </div>
  <div v-else class="auth-content authorization">
    <h1 class="auth-header">Авторизация</h1>
    <el-form ref="user" :model="user" :rules="rules">

      <el-form-item prop="email">
        <label class="required-label label" for="email">Email</label>
        <el-input id="email" type="email" class="auth-input" placeholder="Введите email" v-model="user.email"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <label class="required-label label" for="password">Пароль</label>
        <el-input id="password" type="password" class="auth-input" placeholder="Введите пароль" v-model="user.password"></el-input>
      </el-form-item>

      <el-form-item prop="remember" class="remember-me">
        <el-checkbox id="remember" name="remember" label="Запомнить меня" v-model="user.remember"></el-checkbox>
      </el-form-item>

      <div class="row-group auth-buttons">
        <el-form-item>
          <el-button class="button-auth" type="primary" @click="submitForm('user')">Войти</el-button>
        </el-form-item>
        <p><a href="/register" class="link">Создать учетную запись</a></p>
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
        username: '',
        password: '',
        remember: ''
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
        password: [
          {
            required: true,
            message: 'Это поле обязательно к заполнению',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    if (this.$store.getters.getAuthToken) {
      this.$router.push({name: 'Personal', params: { username: this.$store.getters.getUser.username } })
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
        const response = await api.login(this.user)
        if (response.status === 200) {
          const data = response.data
          const authToken = data.data.Authorization
          this.$store.commit('setAuthToken', authToken)
          await this.$store.dispatch('getUserData')
          this.$router.push({name: 'Personal', params: { username: this.$store.getters.getUser.username } })
        }
      }
    }
  }
}
</script>
