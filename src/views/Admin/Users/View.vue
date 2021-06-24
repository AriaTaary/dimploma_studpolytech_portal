<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Подробная информация о пользователе</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="user" :model="user">
          <el-form-item class="row-form" prop="email">
            <label class="row-label" for="email">Email</label>
            <span id="email" class="form-text">{{ this.user.email }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="created_at">
            <label class="row-label" for="created_at">Дата регистрации</label>
            <span id="created_at" class="form-text">{{ this.user.created_at }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="phone">
            <label class="row-label" for="phone">Телефон</label>
            <span class="form-text">{{ this.user.phone }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="last_name">
            <label class="row-label" for="last_name">Фамилия</label>
            <span class="form-text">{{ this.user.last_name }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="first_name">
            <label class="row-label" for="first_name">Имя</label>
            <span class="form-text">{{ this.user.first_name }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="middle_name">
            <label class="row-label" for="middle_name">Отчество</label>
            <span class="form-text">{{ this.user.middle_name }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="gender">
            <label class="row-label" for="gender">Пол</label>
            <span class="form-text">
              {{ (this.user.gender === 'male') ? 'Мужской' : 'Женский' }}
            </span>
          </el-form-item>

          <el-form-item class="row-form" prop="date_birth">
            <label class="row-label" for="date_birth">Дата рождения</label>
            <span class="form-text">{{ this.user.date_birth }}</span>
          </el-form-item>

          <el-form-item class="row-form last-child" prop="roles">
            <label class="row-label" for="roles">Роли</label>
            <span class="form-text">
              <ul class="admin-list">
                <li
                  v-for="role in this.user.roles"
                  :key="role.id"
                  class="admin-list-item"
                >
                  {{ role.name }}
                </li>
              </ul>
            </span>
          </el-form-item>

          <el-form-item class="one-button-row">
            <a href="/admin/users"><el-button size="big" class="button-change">Назад</el-button> </a>
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
      email: '',
      created_at: '',
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
    }
  }),

  async created () {
    const users = await api.getUserDataForEdit(this.$store.getters.getAuthToken, this.$route.params.id)

    if (users.status === 200) {
      this.user = users.data.data
      this.loading = false
    }
  }
}
</script>
