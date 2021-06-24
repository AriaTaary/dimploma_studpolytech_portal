<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Подробная информация о статье</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="article" :model="article">
          <el-form-item class="row-form" prop="id">
            <label class="row-label" for="id">Id</label>
            <span id="id" class="form-text">{{ this.article.id }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="author">
            <label class="row-label" for="author">Автор</label>
            <router-link
              class="form-text form-link"
              :to="{ name: 'ViewForeignProfile',
              params: { username: this.article.author.username} }
              ">@{{ this.article.author.username }}</router-link>
          </el-form-item>

          <el-form-item class="row-form" prop="created_at">
            <label class="row-label" for="created_at">Дата создания</label>
            <span id="created_at" class="form-text">{{ this.article.created_at }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="title">
            <label class="row-label" for="title">Название</label>
            <span id="title" class="form-text">{{ this.article.title}}</span>
          </el-form-item>

           <el-form-item class="row-form" prop="cut">
            <label class="row-label" for="cut">Превью</label>
            <span id="cut" class="form-text">{{ this.article.cut }}</span>
          </el-form-item>

           <el-form-item class="row-form" prop="text">
            <label class="row-label" for="text">Текст</label>
            <span id="text" class="form-text">{{ this.article.text }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="text">
            <label class="row-label" for="text">Изображение</label>
            <span id="text" class="form-text">{{ this.article.image.filename }}</span>
          </el-form-item>

          <el-form-item class="row-form last-child" prop="categories">
          <label class="row-label" for="categories">Категории</label>
            <span id="categories" class="form-text">
              <ul class="admin-list">
                <li
                  v-for="category in this.article.categories"
                  :key="category.id"
                  class="admin-list-item"
                >
                  {{ category.name }}
                </li>
              </ul>
            </span>
          </el-form-item>

          <el-form-item class="one-button-row">
            <a href="/admin/articles"><el-button size="big" class="button-change">Назад</el-button> </a>
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
    article: {},
  }),

  async created () {
    const article = await api.getArticle(this.$store.getters.getAuthToken, this.$route.params.id)
    this.article = article.data.data

    this.loading = false
  }
}
</script>
