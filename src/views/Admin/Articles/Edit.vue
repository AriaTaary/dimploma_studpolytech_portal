<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Изменение данных статьи</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="article" :model="article">

          <el-form-item prop="title">
            <label class="label" for="title">Автор</label>
            <el-input id="title" type="text" class="input" placeholder="Введите автора" v-model="article.author_name" disabled="true"></el-input>
          </el-form-item>

          <el-form-item prop="title">
            <label class="label" for="title">Название</label>
            <el-input id="title" type="text" class="input" placeholder="Введите название" v-model="article.title"></el-input>
          </el-form-item>

          <el-form-item prop="cut">
            <label class="label" for="cut">Превью</label>
            <el-input id="cut" type="text" class="input" placeholder="Введите превью" v-model="article.cut"></el-input>
          </el-form-item>

          <el-form-item prop="text">
            <label class="label" for="text">Текст</label>
            <el-input id="text" type="text" class="input" placeholder="Введите текст" v-model="article.text"></el-input>
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
            <el-button class="button-save" type="primary" @click="submitForm('article')">Сохранить</el-button>
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
    article: {
      id: '',
      author: '',
      title: '',
      cut: '',
      text: '',
      categories: [
        {
          id: '',
          name: ''
        }
      ],
      views: ''
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
      cut: [
        {
          required: true,
          message: 'Это поле обязательно к заполнению',
          trigger: 'blur'
        }
      ],
      text: [
        {
          required: true,
          message: 'Это поле обязательно к заполнению',
          trigger: 'blur'
        }
      ]
    }
  }),

  async created () {
    const article = await api.getArticle(this.$store.getters.getAuthToken, this.$route.params.id)
    this.article = article.data

    this.article.author_name = article.data.author.first_name + ' ' + article.data.author.last_name

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
        await api.updateAdminArticle (this.$store.getters.getAuthToken, this.article)

        alert('Данные успешно сохранены!')

        this.$router.push({ name: 'ArticlesAdmin' })
      }
    }
  }
}
</script>
