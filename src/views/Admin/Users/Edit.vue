<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Изменение данных пользователя</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="user" :model="user" :rules="rules">
          <el-form-item prop="username">
            <label class="required-label label" for="email">Username</label>
            <el-input id="username" type="text" class="input" placeholder="Введите имя пользователя" v-model="user.username"></el-input>
          </el-form-item>

          <el-form-item prop="email">
            <label class="required-label label" for="email">Email</label>
            <el-input id="email" type="email" class="input" placeholder="Введите электронную почту" v-model="user.email"></el-input>
          </el-form-item>

          <el-form-item prop="phone">
            <label class="label" for="phone">Телефон</label>
            <el-input id="phone" type="text" class="input" placeholder="Введите телефон" v-model="user.phone"></el-input>
          </el-form-item>

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

          <el-form-item prop="gender">
            <label class="label" for="gender">Пол</label>
            <el-select id="gender" class="form-item-select" placeholder="Выберите пол" v-model="user.gender">
              <el-option label="Мужской" value="male"></el-option>
              <el-option label="Женский" value="female"></el-option>
            </el-select>
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

          <el-form-item class="one-button-row">
            <el-button class="button-save" type="primary" @click="submitForm('user')">Сохранить</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/network/api'
import moment from 'moment'
moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    search: '',
    user: {
      id: '',
      username: '',
      email: '',
      phone: '',
      last_name: '',
      first_name: '',
      middle_name: '',
      date_birth: '',
      gender: '',
      roles: [
        {
          id: '',
          name: ''
        }
      ],
      permissions: [
        {
          id: '',
          name: ''
        }
      ]
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
    },
    pickerOptions: {
      firstDayOfWeek: 1
    }
  }),
  methods: {
    async submitForm (formName) {
      let validation = false

      this.$refs[formName].validate((valid) => {
        if (valid) {
          validation = true
        }
      })

      if (validation) {
        const result = await api.updateUserDataFromAdmin(
          this.$store.getters.getAuthToken,
          this.user.id,
          this.user
        )

        if (result.status === 200) {
          alert('Данные успешно сохранены!')
          this.$router.push({ name: 'UsersAdmin' })
        } else {
          alert('При изменении данных произошла ошибка.')
        }
      }
    }
  },
  async created () {
    const users = await api.getUserDataForEdit(this.$store.getters.getAuthToken, this.$route.params.id)

    if (users.status === 200) {
      this.user = users.data.data
      this.loading = false
    }
  }
}
</script>
