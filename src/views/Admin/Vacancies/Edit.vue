<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Изменение данных вакансии</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="vacancy">

          <!-- <el-form-item prop="title">
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
          </el-form-item> -->

           <el-form-item prop="title">
            <label class="label" for="title">Автор</label>
            <el-input id="title" type="text" class="input" placeholder="Введите автора" v-model="vacancy.author.username" disabled="true"></el-input>
          </el-form-item>

          <el-form-item prop="name">
            <label class="required-label label" for="name">Название вакансии</label>
            <el-input id="name" type="text" class="input" placeholder="Введите название вакансии" v-model="formData.title"></el-input>
          </el-form-item>

          <el-form-item prop="company_name">
            <label class="required-label label" for="company_name">Название компании</label>
            <el-input id="company_name" type="text" class="input" placeholder="Введите название компании" v-model="formData.company_name"></el-input>
          </el-form-item>

          <el-form-item prop="city">
            <label class="required-label label" for="city">Город</label>
            <el-input id="city" type="text" class="input" placeholder="Введите название" v-model="formData.city"></el-input>
          </el-form-item>

          <el-form-item prop="experience">
            <label class="required-label label" for="experience">Требуемый опыт работы</label>
            <el-select id="experience" v-model="formData.needed_work_experience" placeholder="Выберите требуемый опыт работы">
              <el-option
                v-for="(experienceName, key) in experiences"
                :key="key"
                :label="experienceName"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="employment">
            <label class="required-label label" for="employment">Тип занятости</label>
            <el-select id="employment" v-model="formData.employment_type" placeholder="Выберите тип занятости">
              <el-option
                v-for="(employmentName, key) in employments"
                :key="key"
                :label="employmentName"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="employment">
            <label class="required-label label" for="employment">График работы</label>
            <el-select id="employment" v-model="formData.work_schedule" placeholder="Выберите тип занятости">
              <el-option
                v-for="(scheduleName, key) in schedules"
                :key="key"
                :label="scheduleName"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="categories" class="input">
            <label class="label" for="categories">Категории вакансии</label>
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
          </el-form-item>

          <el-form-item prop="address">
            <label class="required-label label" for="address">Адрес</label>
            <el-input id="address" type="text" class="input" placeholder="Введите адрес" v-model="formData.company_address"></el-input>
          </el-form-item>

          <el-form-item prop="tel">
            <label class="label" for="tel">Телефон</label>
            <el-input id="tel" type="text" class="input" placeholder="Введите ваш телефон" v-model="formData.company_phone"></el-input>
          </el-form-item>

          <el-form-item prop="email">
            <label class="label" for="email">E-mail</label>
            <el-input id="email" type="text" class="input" placeholder="Введите ваш e-mail" v-model="formData.company_email"></el-input>
          </el-form-item>

          <el-form-item prop="site">
            <label class="label" for="site">Сайт</label>
            <el-input id="site" type="text" class="input" placeholder="Введите ссылку на ваш сайт" v-model="formData.company_site"></el-input>
          </el-form-item>

          <el-form-item prop="description">
          <label class="required-label label" for="description">Описание</label>
          <el-input
            id="description"
            type="textarea"
            :rows="5"
            placeholder="Введите описание"
            v-model="formData.common_description"
            >
          </el-input>
        </el-form-item>

        <el-form-item prop="postulata">
          <label class="required-label label" for="postulata">Требования</label>
          <el-input
            id="postulata"
            type="textarea"
            :rows="5"
            placeholder="Введите требования"
            v-model="formData.requirements_description"
            >
          </el-input>
        </el-form-item>

        <el-form-item prop="circumstances">
          <label class="required-label label" for="circumstances">Условия</label>
          <el-input
            id="circumstances"
            type="textarea"
            :rows="5"
            placeholder="Введите условия"
            v-model="formData.condition_description"
            >
          </el-input>
        </el-form-item>

        <el-form-item prop="salary">
            <label class="label" for="salary">Оплата (в рублях)</label>
            <el-input id="salary" type="text" class="input" placeholder="Введите стоимость" v-model="formData.salary"></el-input>
          </el-form-item>

        <el-form-item class="one-button-row">
          <el-button class="button-save" type="primary" @click="submit">Сохранить</el-button>
        </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/network/api'
import {mapActions} from 'vuex'

import prepareDate from "@/helpers/prepareDate"

export default {
  data: () => ({
    loading: true,
    search: '',
    selectedCategories: [],
    vacancy: {},
    employments: {},
    experiences: {},
    schedules: {},
    categories: [],
    formData: {},
    request: {},
  }),
  methods: {
    ...mapActions(['getVacanciesData', 'getCategories']),
    async submit() {
      // await api.updateAdminVacancy (this.$store.getters.getAuthToken, this.vacancy)

      // alert('Данные успешно сохранены!')

      // this.$router.push({ name: 'VacanciesAdmin' })

      this.loading = true;
      this.request.formData = this.formData;
      this.request.id = this.vacancy.id;
        const response = await api.updateAdminVacancy (this.$store.getters.getAuthToken, this.request)
          if (response){
            const newResponse = prepareDate.vacancy(response.data.data);
            alert('Данные успешно сохранены!');
            this.$router.push({ name: 'ViewVacancy', params: { id: newResponse.id } });
          }
    }
  },

  async created () {
    const vacancy = await api.getVacancy(this.$store.getters.getAuthToken, this.$route.params.id);
    this.vacancy = vacancy.data.data;

    this.formData.title = this.vacancy.title;
    this.formData.company_name = this.vacancy.company_name;
    this.formData.city = this.vacancy.city;
    this.formData.needed_work_experience = this.vacancy.needed_work_experience;
    this.formData.employment_type = this.vacancy.employment_type;
    this.formData.work_schedule = this.vacancy.work_schedule;
    this.formData.company_address = this.vacancy.company_address;
    this.formData.common_description = this.vacancy.common_description;
    this.formData.requirements_description = this.vacancy.requirements_description;
    this.formData.condition_description = this.vacancy.condition_description;
    this.formData.company_phone = this.vacancy.company_phone;
    this.formData.company_email = this.vacancy.company_email;
    this.formData.company_site = this.vacancy.company_site;
    this.formData.salary = this.vacancy.salary;

    const vacanciesData = await this.getVacanciesData();
    this.employments = vacanciesData.employments;
    this.experiences = vacanciesData.experiences;
    this.schedules = vacanciesData.schedules;
    // this.vacancy.author_name = vacancy.data.author.first_name + ' ' + vacancy.data.author.last_name

    let defaultCategories = await this.getCategories();
    this.categories = []
    for (const category of defaultCategories) {
      this.categories.push({
        id: category.id,
        name: category.name
      })
    }

    for (const category of vacancy.data.data.categories) {
      this.formData.categories.push(category.id)
    }

    this.loading = false
  },
}
</script>
