<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Подробная информация о вакансии</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="vacancy" :model="vacancy">
          <el-form-item class="row-form" prop="id">
            <label class="row-label" for="id">Id</label>
            <span id="id" class="form-text">{{ this.vacancy.id }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="created_at">
            <label class="row-label" for="created_at">Дата создания</label>
            <span id="created_at" class="form-text">{{ this.vacancy.created_at }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="author">
            <label class="row-label" for="author">Автор</label>
            <router-link
              class="form-text form-link"
              :to="{ name: 'ViewForeignProfile',
              params: { username: this.vacancy.author.username} }
              ">@{{ this.vacancy.author.username }}</router-link>
          </el-form-item>

          <el-form-item class="row-form" prop="title">
            <label class="row-label" for="title">Название</label>
            <span id="title" class="form-text">{{ this.vacancy.title}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="company_name">
            <label class="row-label" for="company_name">Название компании</label>
            <span id="company_name" class="form-text">{{ this.vacancy.company_name}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="city">
            <label class="row-label" for="city">Город</label>
            <span id="city" class="form-text">{{ this.vacancy.city}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="experience">
            <label class="row-label" for="experience">Требуемый опыт работы</label>
            <span id="experience" class="form-text">{{ this.experiences[this.vacancy.needed_work_experience] }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="employment">
            <label class="row-label" for="employment">Тип занятости</label>
            <span id="employment" class="form-text">{{ this.employments[this.vacancy.employment_type] }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="employment">
            <label class="row-label" for="employment">График работы</label>
            <span id="employment" class="form-text">{{ this.schedules[this.vacancy.work_schedule] }}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="categories">
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

          <!-- <el-form-item prop="categories" class="input">
            <label class="label" for="categories">Категории</label>
            <el-select
              class="input"
              id="categories"
              placeholder="Выберите"
              multiple
              v-model="formData.categories">
              <el-option
                class="input"
                v-for="category in categories"
                :key='category.id'
                :value='category.id'
                :label='category.name'
                >{{ category.name }}
              </el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item class="row-form" prop="company_address">
            <label class="row-label" for="company_address">Адрес</label>
            <span id="company_address" class="form-text">{{ this.vacancy.company_address}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="company_phone">
            <label class="row-label" for="company_phone">Телефон</label>
            <span id="company_phone" class="form-text">{{ this.vacancy.company_phone}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="company_email">
            <label class="row-label" for="company_email">E-mail</label>
            <span id="company_email" class="form-text">{{ this.vacancy.company_email}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="company_site">
            <label class="row-label" for="company_site">Сайт</label>
            <span id="company_site" class="form-text">{{ this.vacancy.company_site}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="common_description">
            <label class="row-label" for="city">Описание</label>
            <span id="common_description" class="form-text">{{ this.vacancy.common_description}}</span>
          </el-form-item>

          <el-form-item class="row-form" prop="requirements_description">
            <label class="row-label" for="requirements_description">Требования</label>
            <span id="requirements_description" class="form-text">{{ this.vacancy.requirements_description}}</span>
          </el-form-item>

           <el-form-item class="row-form" prop="condition_description">
            <label class="row-label" for="condition_description">Условия</label>
            <span id="condition_description" class="form-text">{{ this.vacancy.condition_description }}</span>
          </el-form-item>

          <el-form-item class="row-form last-child" prop="salary">
            <label class="row-label" for="salary">Оплата (в рублях)</label>
            <span v-if="this.vacancy.salary !== null" id="salary" class="form-text">{{ this.vacancy.salary }} ₽</span>
            <span v-else id="salary" class="form-text">-</span>
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
import {mapActions} from 'vuex'

export default {
  data: () => ({
    loading: true,
    vacancy: {},
    employments: {},
    experiences: {},
    schedules: {}
  }),
  methods: {
    ...mapActions(['getVacanciesData']),
  },
  async created () {
    const vacancy = await api.getVacancy(this.$store.getters.getAuthToken, this.$route.params.id)
    this.vacancy = vacancy.data.data

    const vacanciesData = await this.getVacanciesData();
    this.employments = vacanciesData.employments;
    this.experiences = vacanciesData.experiences;
    this.schedules = vacanciesData.schedules;

    this.loading = false
  }
}
</script>
