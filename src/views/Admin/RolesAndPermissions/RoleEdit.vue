<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Изменение данных роли</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="role" :model="role">

          <el-form-item prop="name">
            <label class="label" for="name">Название</label>
            <el-input id="name" type="text" class="input" placeholder="Введите название" v-model="role.name" disabled="true"></el-input>
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
    role: {
      id: '',
      name: '',
      permissions: [
        {
          id: '1',
          name: '1'
        }
      ]
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
        await this.$store.dispatch('updateUserData', this.user)
        this.user = this.$store.getters.getUser

        alert('Данные успешно сохранены!')
      }
    }
  },
  async created () {
    const role = await api.getRole(this.$store.getters.getAuthToken, this.$route.params.id)
    this.role = role.data.data

    this.loading = false
  }
}
</script>
