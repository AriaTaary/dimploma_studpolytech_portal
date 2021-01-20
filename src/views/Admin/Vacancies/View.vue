<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Подробная информация о вакансии</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="vacancy" :model="vacancy">
          <el-form-item class="row-form" prop="id">
            <label class="row-label" for="id">Id</label>
            <span id="id" class="form-text">{{ this.vacancy.id }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="title">
            <label class="row-label" for="title">Название</label>
            <span id="title" class="form-text">{{ this.vacancy.title}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="created_at">
            <label class="row-label" for="created_at">Дата создания</label>
            <span id="created_at" class="form-text">{{ this.vacancy.created_at }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="author">
            <label class="row-label" for="author">Автор</label>
            <span id="author" class="form-text">{{ this.vacancy.author.last_name + ' ' + this.vacancy.author.first_name }}</span>
          </el-form-item>

           <el-form-item class="row-form" prop="description">
            <label class="row-label" for="description">Описание</label>
            <span id="description" class="form-text">{{ this.vacancy.description }}</span>
          </el-form-item>

          <el-form-item class="row-form last-child" prop="categories">
          <label class="row-label" for="categories">Категории</label>
            <span id="categories" class="form-text">
              <ul class="admin-list">
                <li
                  v-for="category in this.vacancy.categories"
                  :key="category.id"
                  class="admin-list-item"
                >
                  {{ category.name }}
                </li>
              </ul>
            </span>
          </el-form-item>

          <el-form-item class="one-button-row">
            <a href="/admin/vacancies"><el-button size="big" class="button-change">Назад</el-button> </a>
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
    vacancy: {
      id: '',
      title: '',
      description: '',
      author: '',
      created_at: '',
      categories: [
        {
          id: '',
          name: ''
        }
      ]
    }
  }),

  async created () {
    const vacancy = await api.getVacancy(this.$store.getters.getAuthToken, this.$route.params.id)
    this.vacancy = vacancy.data

    this.loading = false
  }
}
</script>
