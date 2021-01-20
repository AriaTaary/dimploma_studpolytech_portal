<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Изменение данных вакансии</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="vacancy" :model="vacancy">

          <el-form-item prop="title">
            <label class="label" for="title">Автор</label>
            <el-input id="title" type="text" class="input" placeholder="Введите автора" v-model="vacancy.author_name" disabled="true"></el-input>
          </el-form-item>

          <el-form-item prop="title">
            <label class="label" for="title">Название</label>
            <el-input id="title" type="text" class="input" placeholder="Введите название" v-model="vacancy.title"></el-input>
          </el-form-item>

          <el-form-item prop="description">
            <label class="label" for="description">Описание</label>
            <el-input id="description" type="text" class="input" placeholder="Введите превью" v-model="vacancy.description"></el-input>
          </el-form-item>

          <el-form-item prop="categories">
            <label class="label" for="categories">Категории</label>
              <el-select id="categories" class="form-item-select" placeholder="Выберите категории" multiple v-model="selectedCategories">
              <el-option
                v-for="category in this.categories"
                :key="category.id"
                :value="category.id"
                :label="category.name"
              >{{ category.name }}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="one-button-row">
            <el-button class="button-save" type="primary" @click="submitForm('vacancy')">Сохранить</el-button>
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
    selectedCategories: [],
    vacancy: {
        id: '',
        title: '',
        description: '',
        author: '',
        categories: [
          {
            id: '',
            name: ''
          }
        ]
    },
    rules: {
      author: [
        {
          required: true,
          message: 'Это поле обязательно к заполнению',
          trigger: 'blur'
        }
      ],
      title: [
        {
          required: true,
          message: 'Это поле обязательно к заполнению',
          trigger: 'blur'
        }
      ],
      description: [
        {
          required: true,
          message: 'Это поле обязательно к заполнению',
          trigger: 'blur'
        }
      ]
    }
  }),

  async created () {
    const vacancy = await api.getVacancy(this.$store.getters.getAuthToken, this.$route.params.id)
    this.vacancy = vacancy.data

    this.vacancy.author_name = vacancy.data.author.first_name + ' ' + vacancy.data.author.last_name

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
        await api.updateAdminVacancy (this.$store.getters.getAuthToken, this.vacancy)

        alert('Данные успешно сохранены!')

        this.$router.push({ name: 'VacanciesAdmin' })
      }
    }
  }
}
</script>
