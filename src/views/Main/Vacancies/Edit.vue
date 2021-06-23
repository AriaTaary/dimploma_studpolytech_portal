<template>
  <div class="container">
    <div class="content">
      <div class="feed-body">
        <div class="feed">
          <div class="vacancy-feed">
            <div class="vacancy-block edit-block">
            <h1 class="vacancy-title">Изменение вакансии</h1>
            <div v-if="loading" class="loading-main">
              <img src="/img/preloader.svg" alt="Загрузка данных">
            </div>
            <el-form v-else>
              <div class="row-group row-group-profile">
                <div>
                  <el-form-item prop="name">
                    <label class="required-label label" for="name">Название вакансии</label>
                    <el-input id="name" type="text" class="input" :placeholder="this.vacancy.title" v-model="formData.title"></el-input>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('title')"
                    >{{this.errors.title[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="company_name">
                    <label class="required-label label" for="company_name">Название компании</label>
                    <el-input id="company_name" type="text" class="input" :placeholder="this.vacancy.company_name" v-model="formData.company_name"></el-input>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('company_name')"
                    >{{this.errors.company_name[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="city">
                    <label class="required-label label" for="city">Город</label>
                    <el-input id="city" type="text" class="input" :placeholder="this.vacancy.city" v-model="formData.city"></el-input>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('city')"
                    >{{this.errors.city[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="experience">
                    <label class="required-label label" for="experience">Требуемый опыт работы</label>
                    <el-select id="experience" v-model="formData.needed_work_experience" :placeholder="this.vacancy.needed_work_experience">
                      <el-option
                        v-for="(experienceName, key) in experiences"
                        :key="key"
                        :label="experienceName"
                        :value="key">
                      </el-option>
                    </el-select>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('needed_work_experience')"
                    >{{this.errors.needed_work_experience[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="employment">
                    <label class="required-label label" for="employment">Тип занятости</label>
                    <el-select id="employment" v-model="formData.employment_type" :placeholder="this.vacancy.employment_type">
                      <el-option
                        v-for="(employmentName, key) in employments"
                        :key="key"
                        :label="employmentName"
                        :value="key">
                      </el-option>
                    </el-select>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('employment_type')"
                    >{{this.errors.employment_type[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="employment">
                    <label class="required-label label" for="employment">График работы</label>
                    <el-select id="employment" v-model="formData.work_schedule" :placeholder="this.vacancy.work_schedule">
                      <el-option
                        v-for="(scheduleName, key) in schedules"
                        :key="key"
                        :label="scheduleName"
                        :value="key">
                      </el-option>
                    </el-select>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('work_schedule')"
                    >{{this.errors.work_schedule[0]}}</p>
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
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('categories')"
                    >{{this.errors.categories[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="address">
                    <label class="required-label label" for="address">Адрес</label>
                    <el-input id="address" type="text" class="input" :placeholder="this.vacancy.company_address" v-model="formData.company_address"></el-input>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('company_address')"
                    >{{this.errors.company_address[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="tel">
                    <label class="label" for="tel">Телефон</label>
                    <el-input id="tel" type="text" class="input" :placeholder="this.vacancy.company_phone" v-model="formData.company_phone"></el-input>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('company_phone')"
                    >{{this.errors.company_phone[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="email">
                    <label class="label" for="email">E-mail</label>
                    <el-input id="email" type="text" class="input" :placeholder="this.vacancy.company_email" v-model="formData.company_email"></el-input>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('company_email')"
                    >{{this.errors.company_email[0]}}</p>
                  </el-form-item>

                  <el-form-item prop="site">
                    <label class="label" for="site">Сайт</label>
                    <el-input id="site" type="text" class="input" :placeholder="this.vacancy.company_site" v-model="formData.company_site"></el-input>
                    <p class="error-message"
                    v-if="this.errors.hasOwnProperty('company_site')"
                    >{{this.errors.site[0]}}</p>
                  </el-form-item>
                </div>

                <div>
                  <el-form-item prop="description">
                  <label class="required-label label" for="description">Описание</label>
                  <el-input
                    id="description"
                    type="textarea"
                    :rows="11"
                    :placeholder="this.vacancy.common_description"
                    v-model="formData.common_description"
                    >
                  </el-input>
                  <p class="error-message"
                  v-if="this.errors.hasOwnProperty('comcommon_descriptionpany_site')"
                  >{{this.errors.common_description[0]}}</p>
                </el-form-item>

                <el-form-item prop="postulata">
                  <label class="required-label label" for="postulata">Требования</label>
                  <el-input
                    id="postulata"
                    type="textarea"
                    :rows="11"
                    :placeholder="this.vacancy.requirements_description"
                    v-model="formData.requirements_description"
                    >
                  </el-input>
                  <p class="error-message"
                  v-if="this.errors.hasOwnProperty('requirements_description')"
                  >{{this.errors.requirements_description[0]}}</p>
                </el-form-item>

                <el-form-item prop="circumstances">
                  <label class="required-label label" for="circumstances">Условия</label>
                  <el-input
                    id="circumstances"
                    type="textarea"
                    :rows="11"
                    :placeholder="this.vacancy.condition_description"
                    v-model="formData.condition_description"
                    >
                  </el-input>
                  <p class="error-message"
                  v-if="this.errors.hasOwnProperty('condition_description')"
                  >{{this.errors.condition_description[0]}}</p>
                </el-form-item>

                </div>
              </div>

              <el-form-item class="one-button-row-profile">
                <el-button class="button-save" type="primary" @click="submit">Сохранить</el-button>
              </el-form-item>

              </el-form>
          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate"

export default {
  data: () => ({
    categories: [],
    loading: true,
    errors: {},
    employments: {},
    experiences: {},
    schedules: {},
    vacancy: {},
    formData: {
      title: '',
      company_name: '',
      city: '',
      needed_work_experience: '',
      employment_type: '',
      work_schedule: '',
      categories: [],
      company_address: '',
      common_description: '',
      requirements_description: '',
      condition_description: '',
      company_phone: '',
      company_email: '',
      company_site: '',
    },
    request: {
      formData: '',
      id: '',
    }
  }),
  methods:{
    ...mapActions(['updateVacancy','getCategories', 'getVacanciesData']),
    async submit(){
      this.loading = true;
      this.request.formData = this.formData;
      this.request.id = this.vacancy.id;
      const response = await this.updateVacancy(this.request);
      if (response) {
        alert('Данные успешно сохранены!');
        this.$router.push({ name: 'VacancyView', params: { id: response.id } });
      }
    }
  },
  async created () {
    this.categories = await this.getCategories();
    const vacanciesData = await this.getVacanciesData();
    this.employments = vacanciesData.employments;
    this.experiences = vacanciesData.experiences;
    this.schedules = vacanciesData.schedules;
    let response = await api.getMainVacancy(this.$store.getters.getAuthToken, this.$route.params.id);
    if (response.status === 200){
      this.vacancy = prepareDate.vacancy(response.data.data, this.$store.getters.getUser.id);
      this.loading = false;

      this.formData.title = this.vacancy.title;
      this.formData.company_name = this.vacancy.company_name;
      this.formData.city = this.vacancy.city;
      this.formData.needed_work_experience = this.vacancy.needed_work_experience;
      this.formData.employment_type = this.vacancy.employment_type;
      this.formData.work_schedule = this.vacancy.work_schedule;
      this.formData.categories = this.vacancy.categories;
      this.formData.company_address = this.vacancy.company_address;
      this.formData.common_description = this.vacancy.common_description;
      this.formData.requirements_description = this.vacancy.requirements_description;
      this.formData.condition_description = this.vacancy.condition_description;
      this.formData.company_phone = this.vacancy.company_phone;
      this.formData.company_email = this.vacancy.company_email;
      this.formData.company_site = this.vacancy.company_site;
    }
    else {
      alert("Произошла ошибка");
    }
  },
}
</script>
