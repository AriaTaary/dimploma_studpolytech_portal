<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Изменение данных категории новостей</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="newsCategory" :model="newsCategory">

          <el-form-item prop="name">
            <label class="label" for="name">Название</label>
            <el-input id="name" type="text" class="input" placeholder="Введите название" v-model="newsCategory.name"></el-input>
          </el-form-item>

          <el-form-item prop="slug">
            <label class="label" for="slug">Slug</label>
            <el-input id="slug" type="text" class="input" placeholder="Введите превью" v-model="newsCategory.slug"></el-input>
          </el-form-item>

          <el-form-item class="one-button-row">
            <el-button class="button-save" type="primary" @click="submitForm('newsCategory')">Сохранить</el-button>
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
    newsCategory: {
      id: '',
      name: '',
      slug: ''
    },
    rules: {
      name: [
        { required: true, message: 'Это поле обязательно к заполнению', triggered: 'blur' }
      ],
      slug: [
        { required: true, message: 'Это поле обязательно к заполнению', triggered: 'blur' }
      ]
    }
  }),

  async created () {
    const newsCategory = await api.getNewsCategory(this.$store.getters.getAuthToken, this.$route.params.id)
    this.newsCategory = newsCategory.data

    this.loading = false
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
        await api.updateAdminNewsCategory (this.$store.getters.getAuthToken, this.newsCategory)

        alert('Данные успешно сохранены!')

        this.$router.push({ name: 'NewsCategories' })
      }
    }
  }
}
</script>
