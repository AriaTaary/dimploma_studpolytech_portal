<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="profile-content-title">
          <h1>Настройки</h1>
          <router-link class="link-profile"
              :to="{ name: 'PersonalEdit',
              params: { username: this.user.username }}
          ">профиля</router-link>
          <router-link class="link-profile-active"
              :to="{ name: 'PersonalEditEducation',
              params: { username: this.user.username }}
          ">образования</router-link>

        </div>
      </div>

      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-form v-else ref="user" :model="user" :rules="rules">
        <div class="row-group row-group-profile">

         <div class="column-group-profile">

                      <div class="profile-settings-block">
              <p class="profile-settings-block-title">Бакалавриат / специалитет</p>

              <div class="column-form">
                <label class="label" for="bac-grade">Вид обучения</label>
                <el-select id="bac-grade"
                  placeholder="Выберите"
                  v-model="formData.firstEducation.education_type">
                  <el-option
                    v-for="(educationName, key) in educationTypes"
                    :key="key"
                    :label="educationName"
                    :value="key">
                  </el-option>
                </el-select>
              </div>

              <el-form-item prop="bac-uni">
                <label class="label" for="bac-uni">Учебное заведение</label>
                <el-input id="bac-uni" type="text" class="input" placeholder="Введите название учебного заведения" v-model="formData.firstEducation.university"></el-input>
              </el-form-item>

              <el-form-item prop="bac-faculty">
                <label class="label" for="bac-faculty">Факультет</label>
                <el-input id="bac-faculty" type="text" class="input" placeholder="Введите факультет" v-model="formData.firstEducation.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="bac-specialization">
                <label class="label" for="bac-specialization">Специализация</label>
                <el-input id="bac-specialization" type="text" class="input" placeholder="Введите специализацию" v-model="formData.firstEducation.speciality"></el-input>
              </el-form-item>

              <div class="column-form">
                <label class="label" for="bac-grade">Курс</label>
                <el-select id="bac-grade" placeholder="Выберите"
                  v-model="formData.firstEducation.education_type">
                  <el-option
                    v-for="(gradeName, key) in educationGrades"
                    :key="key"
                    :label="gradeName"
                    :value="key">
                  </el-option>
                </el-select>
              </div>

              <el-form-item prop="bac-projects">
                <label class="label" for="bac-projects">Проекты</label>
                <el-input type="textarea" :rows="2" id="bac-projects"  class="input" placeholder="Расскажите о выполненных проектах во время обучения" v-model="formData.firstEducation.projects"></el-input>
              </el-form-item>

              <el-form-item prop="bac-specialization">
                <label class="label" for="bac-specialization">Год окончания</label>
                <el-input id="bac-specialization" type="date" class="input" placeholder="Введите дату окончания" v-model="formData.firstEducation.date_end"></el-input>
              </el-form-item>
            </div>

         </div>

          <div class="column-group-profile">

            <div class="profile-settings-block">
              <p class="profile-settings-block-title">Магистратура</p>

              <el-form-item prop="mac-uni">
                <label class="label" for="mac-uni">Учебное заведение</label>
                <el-input id="mac-uni" type="text" class="input" placeholder="Введите название учебного заведения" v-model="formData.secondEducation.university"></el-input>
              </el-form-item>

              <el-form-item prop="mag-faculty">
                <label class="label" for="mag-faculty">Факультет</label>
                <el-input id="mag-faculty" type="text" class="input" placeholder="Введите факультет" v-model="formData.secondEducation.faculty"></el-input>
              </el-form-item>

              <el-form-item prop="mag-specialization">
                <label class="label" for="mag-specialization">Специализация</label>
                <el-input id="mag-specialization" type="text" class="input" placeholder="Введите специализацию" v-model="formData.secondEducation.speciality"></el-input>
              </el-form-item>

              <div class="column-form">
                <label class="label" for="mag-grade">Курс</label>
                <el-select id="mag-grade" placeholder="Выберите"
                  v-model="formData.secondEducation.education_type">
                  <el-option
                    v-for="(gradeName, key) in educationGrades"
                    :key="key"
                    :label="gradeName"
                    :value="key">
                  </el-option>
                </el-select>
              </div>

              <el-form-item prop="mag-projects">
                <label class="label" for="mag-projects">Проекты</label>
                <el-input type="textarea" :rows="2" id="mag-projects"  class="input" placeholder="Расскажите о выполненных проектах во время обучения" v-model="formData.secondEducation.projects"></el-input>
              </el-form-item>

              <el-form-item prop="bac-specialization">
                <label class="label" for="bac-specialization">Год окончания</label>
                <el-input id="bac-specialization" type="date" class="input" placeholder="Введите дату окончания" v-model="formData.secondEducation.date_end"></el-input>
              </el-form-item>
            </div>

            <div class="profile-settings-block">
              <p class="profile-settings-block-title">Курсы повышения квалификации</p>

              <el-form-item prop="university">
                <label class="label" for="unuversity">Учебное заведение</label>
                <el-input id="unuversity" type="text" class="input" placeholder="Введите название" v-model="formData.courses.university"></el-input>
              </el-form-item>

              <el-form-item prop="course-specialization">
                <label class="label" for="course-specialization">Специализация</label>
                <el-input id="course-specialization" type="text" class="input" placeholder="Введите специализацию" v-model="formData.courses.speciality"></el-input>
              </el-form-item>

              <el-form-item prop="bac-projects">
                <label class="label" for="bac-projects">Проекты</label>
                <el-input type="textarea" :rows="2" id="bac-projects"  class="input" placeholder="Расскажите о выполненных проектах во время обучения" v-model="formData.courses.projects"></el-input>
              </el-form-item>

              <el-form-item prop="bac-specialization">
                <label class="label" for="bac-specialization">Год окончания</label>
                <el-input id="bac-specialization" type="date" class="input" placeholder="Введите дату окончания" v-model="formData.courses.date_end"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
          <el-form-item class="one-button-row-profile">
            <el-button class="button-save" type="primary">Сохранить</el-button>
          </el-form-item>
        </el-form>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapActions} from 'vuex'
moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    search: '',
    educations: {},
    userEducation: {},
    user: {},
    formData: {
      firstEducation: {
        education_type: '',
        university: '',
        faculty: '',
        speciality: '',
        grade: '',
        projects: '',
        date_end: '',
      },
      secondEducation: {
        education_type: 'magistratura',
        university: '',
        faculty: '',
        speciality: '',
        grade: '',
        projects: '',
        date_end: '',
      },
      courses: {
        university: '',
        speciality: '',
        projects: '',
        date_end: '',
      }
    },
  }),
  methods:{
    ...mapActions(['getUser', 'getUserEducations', 'getAllUserEducations']),
    setData(response){
      this.user = response;
      console.log(this.user)
    }
  },
  async created () {
    const response = await this.getUser();
    this.setData(response);
    this.educations = await this.getAllUserEducations();
    console.log(this.educations);
    this.loading = false;
    // this.education = await this.getUserEducations();
    // const vacanciesData = await this.getVacanciesData();
    // this.employments = vacanciesData.employments;
    // this.experiences = vacanciesData.experiences;
    // this.schedules = vacanciesData.schedules;
    // let response = await api.getMainVacancy(this.$store.getters.getAuthToken, this.$route.params.id);
    // if (response.status === 200){
    //   this.vacancy = prepareDate.vacancy(response.data.data, this.$store.getters.getUser.id);
    //   this.loading = false;

    //   this.formData.title = this.vacancy.title;
    //   this.formData.company_name = this.vacancy.company_name;
    //   this.formData.city = this.vacancy.city;
    //   this.formData.needed_work_experience = this.vacancy.needed_work_experience;
    //   this.formData.employment_type = this.vacancy.employment_type;
    //   this.formData.work_schedule = this.vacancy.work_schedule;
    //   this.formData.categories = this.vacancy.categories;
    //   this.formData.company_address = this.vacancy.company_address;
    //   this.formData.common_description = this.vacancy.common_description;
    //   this.formData.requirements_description = this.vacancy.requirements_description;
    //   this.formData.condition_description = this.vacancy.condition_description;
    //   this.formData.company_phone = this.vacancy.company_phone;
    //   this.formData.company_email = this.vacancy.company_email;
    //   this.formData.company_site = this.vacancy.company_site;
    // }
    // else {
    //   alert("Произошла ошибка");
    // }
  },
}

</script>
