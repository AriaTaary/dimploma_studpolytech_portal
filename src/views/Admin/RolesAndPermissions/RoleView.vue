<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Подробная информация о роли</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="role" :model="role">

          <el-form-item class="row-form" prop="id">
            <label class="row-label" for="id">Id</label>
            <span id="id" class="form-text">{{ this.role.id }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="name">
            <label class="row-label" for="name">Название</label>
            <span id="name" class="form-text">{{ this.role.name }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="created_at">
            <label class="row-label" for="created_at">Дата создания</label>
            <span id="created_at" class="form-text">{{ this.role.created_at }}</span>
          </el-form-item>

           <el-form-item class="row-form last-child" prop="permissions">
            <label class="row-label" for="categories">Разрешения</label>
            <span class="form-text">
              <ul class="admin-list">
                <li
                  v-for="permission in this.role.permissions"
                  :key="permission.id"
                  class="admin-list-item"
                >
                  {{ permission.name }}
                </li>
              </ul>
            </span>
          </el-form-item>

          <el-form-item class="one-button-row">
            <a href="/admin/users/roles"><el-button size="big" class="button-change">Назад</el-button> </a>
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
    role: {
      id: '',
      name: '',
      created_at: '',
      permissions: [
        {
          id: '',
          name: ''
        }
      ]
    }
  }),

  async created () {
    const role = await api.getRole(this.$store.getters.getAuthToken, this.$route.params.id)

    this.role = role.data.data
    this.loading = false
  }
}
</script>
