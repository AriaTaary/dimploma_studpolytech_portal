<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Подробная информация о новости</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="news" :model="news">
          <el-form-item class="row-form" prop="id">
            <label class="row-label" for="id">Id</label>
            <span id="id" class="form-text">{{ this.news.id }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="title">
            <label class="row-label" for="title">Название</label>
            <span id="title" class="form-text">{{ this.news.title }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="author">
            <label class="row-label" for="author">Автор</label>
            <!-- <span id="author" class="form-text">@{{ this.news.author.username }}</span> -->
            <router-link
              class="form-text form-link"
              :to="{ name: 'ViewForeignProfile',
              params: { username: this.news.author.username} }
              ">@{{ this.news.author.username }}</router-link>
          </el-form-item>

          <el-form-item class="row-form" prop="created_at">
            <label class="row-label" for="created_at">Дата создания</label>
            <span id="created_at" class="form-text">{{ this.news.created_at }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="cut">
            <label class="row-label" for="cut">Превью</label>
            <span id="cut" class="form-text">{{ this.news.cut }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="text">
            <label class="row-label" for="text">Текст</label>
            <span id="text" class="form-text">{{ this.news.text }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="image">
            <label class="row-label" for="image">Изображение</label>
            <span id="image" class="form-text">{{ this.news.image.filename }}</span>
          </el-form-item>

          <el-form-item class="row-form last-child" prop="categories">
          <label class="row-label" for="categories">Категории</label>
            <span id="categories" class="form-text">
              <ul class="admin-list">
                <li
                  v-for="category in this.news.categories"
                  :key="category.id"
                  class="admin-list-item"
                >
                  {{ category.name }}
                </li>
              </ul>
            </span>
          </el-form-item>

          <el-form-item class="one-button-row">
            <a href="/admin/news"><el-button size="big" class="button-change">Назад</el-button> </a>
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
    news: {}
  }),

  async created () {
    const news = await api.getNewsData(this.$store.getters.getAuthToken, this.$route.params.id)
    this.news = news.data.data

    this.loading = false
  }
}
</script>
