<template>
  <div class="vacancy-block">
    <div class="card-info-view">
      <div class="card-about-info">
        <div class="card-about-main-info">
          <p class="author mini-hover">@{{ this.vacancy.company_name}}</p>
          <p>{{ this.vacancy.created_at }}</p>
        </div>
        <div v-if="this.vacancy.author.id === this.$store.getters.getUser.id">
          <router-link class="button-main"
            :to="{ name: 'VacancyEdit'}
            ">Редактировать</router-link>
        </div>
      </div>
      <div class="card-categories">
        <p
        v-for="category in this.vacancy.categories"
        :key='category.id'
        class="mini-hover"
        >
          {{ category.name }}
        </p>
      </div>
      <div class="card-main-info">
        <div class="card-main-info-title">
          <h1>{{ this.vacancy.title }}</h1>
          <p>{{ this.vacancy.salary }}</p>
        </div>
        <p class="card-description not-main">Город: {{ this.vacancy.city }}</p>
        <div class="row-group">
          <button
            v-if="vacancy.responses.filter(user => user.id === this.$store.getters.getUser.id).length !== 0"
            class="button-main button-main-active" disabled
          >Отклик отправлен</button>
          <button
            v-else
            class="button-main" @click="responseVacancy()"
          >Откликнуться</button>
          <button v-if="vacancy.saved_users.filter(user => user.id === this.$store.getters.getUser.id).length !== 0" class="post-button post-button-active" @click="saveVacancy()">
            <div class="bookmarks">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.42788 0.269325C7.50928 0.104406 7.67723 7.30754e-09 7.86116 7.30754e-09C8.04509 -3.18919e-05 8.21307 0.104374 8.29448 0.269293L10.1792 4.08753C10.3564 4.44655 10.6989 4.69546 11.0952 4.75301L15.3091 5.36557C15.4911 5.39204 15.6423 5.51951 15.6992 5.69445C15.756 5.86935 15.7086 6.06138 15.5769 6.18978L12.5279 9.16218C12.2412 9.44171 12.1104 9.84437 12.178 10.239L12.8975 14.4352C12.9285 14.6165 12.854 14.7997 12.7052 14.9077C12.5564 15.0159 12.3592 15.0301 12.1964 14.9445L8.42731 12.9633C8.07291 12.7771 7.64951 12.7771 7.29505 12.9634L3.52632 14.9444C3.36351 15.03 3.16624 15.0157 3.01746 14.9076C2.86865 14.7995 2.79417 14.6163 2.82524 14.4351L3.54498 10.2392C3.6127 9.84444 3.48185 9.44171 3.19508 9.16211L0.145932 6.18981C0.0142525 6.06142 -0.0331816 5.86938 0.0236627 5.69448C0.080507 5.51958 0.231709 5.39211 0.413726 5.3656L4.62748 4.75307C5.02373 4.69546 5.3663 4.44659 5.54353 4.0875L7.42788 0.269325Z" fill="#D5444C"/>
              </svg>
              <span>Удалить из избранного</span>
            </div>
          </button>
          <button v-else class="post-button" @click="saveVacancy()">
            <div class="bookmarks">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.50333 15C3.33184 15 3.16155 14.9465 3.01621 14.8414C2.74548 14.6452 2.61902 14.308 2.6927 13.9825L3.69966 9.54688L0.284693 6.55204C0.0336703 6.3329 -0.0622248 5.98586 0.0408356 5.66832C0.143896 5.35138 0.424297 5.12698 0.756287 5.09629L5.2747 4.68608L7.06112 0.505509C7.19284 0.198358 7.49283 0 7.82613 0C8.15944 0 8.45942 0.198358 8.59114 0.504793L10.3776 4.68608L14.8953 5.09629C15.228 5.12627 15.5084 5.35138 15.6114 5.66832C15.7145 5.98526 15.6192 6.3329 15.3682 6.55204L11.9532 9.54628L12.9602 13.9818C13.034 14.308 12.9074 14.6452 12.6368 14.8408C12.3668 15.0364 12.0067 15.0515 11.7224 14.8806L7.82613 12.5522L3.9299 14.8819C3.79818 14.9601 3.65141 15 3.50333 15ZM7.82613 11.5492C7.97421 11.5492 8.12086 11.589 8.2527 11.6672L11.9298 13.8665L10.9794 9.67991C10.9116 9.38196 11.0128 9.07086 11.243 8.86928L14.4675 6.04139L10.2014 5.65399C9.89427 5.62593 9.63011 5.43282 9.51009 5.14979L7.82613 1.2046L6.14015 5.15039C6.02144 5.43151 5.75728 5.62461 5.45085 5.65268L1.18417 6.04008L4.40854 8.86797C4.6395 9.07015 4.74053 9.38064 4.6721 9.67931L3.72247 13.8657L7.39956 11.6672C7.53128 11.589 7.67805 11.5492 7.82613 11.5492ZM5.24019 4.76693C5.24019 4.76693 5.24019 4.76765 5.23947 4.76824L5.24019 4.76693ZM10.4108 4.76502L10.4115 4.76633C10.4115 4.76562 10.4115 4.76562 10.4108 4.76502Z" fill="black" fill-opacity="0.3"/>
              </svg>
              <span>Добавить в избранное</span>
            </div>
          </button>
        </div>
        <div class="card-text">
          <div class="vacancy-info-block">
            <p>Требуемый опыт работы: {{ this.experiences[this.vacancy.needed_work_experience] }}</p>
            <p>Тип занятости: {{ this.employments[this.vacancy.employment_type] }}</p>
            <p>График работы: {{ this.schedules[this.vacancy.work_schedule] }}</p>
          </div>
          <div class="vacancy-info-block">
            <h5>Описание:</h5>
            <p>{{ this.vacancy.description }}</p>
          </div>
          <div class="vacancy-info-block">
            <h5>Требования:</h5>
            <p>{{ this.vacancy.requirements_description }}</p>
          </div>
          <div class="vacancy-info-block">
            <h5>Условия:</h5>
            <p>{{ this.vacancy.condition_description }}</p>
          </div>
          <div class="vacancy-info-block">
            <h5>Адрес:</h5>
            <p>{{ this.vacancy.company_address }}</p>
          </div>
          <div v-if="this.vacancy.company_phone !== null || this.vacancy.company_email !== null || this.vacancy.company_site !== null"
          class="vacancy-info-block">
            <h5>Контакты:</h5>
            <ul class="vacancy-info-list">
              <li v-if="this.vacancy.company_phone !== null">Телефон: {{ this.vacancy.company_phone }}</li>
              <li v-if="this.vacancy.company_email !== null">Email: {{ this.vacancy.company_email }}</li>
              <li v-if="this.vacancy.company_site !== null">Сайт: {{ this.vacancy.company_site}}</li>
            </ul>
          </div>
        </div>
          <div class="row-group">
          <button
            v-if="vacancy.responses.filter(user => user.id === this.$store.getters.getUser.id).length !== 0"
            class="button-main button-main-active" disabled
          >Отклик отправлен</button>
          <button
            v-else
            class="button-main" @click="responseVacancy()"
          >Откликнуться</button>
          <button v-if="vacancy.saved_users.filter(user => user.id === this.$store.getters.getUser.id).length !== 0" class="post-button post-button-active" @click="saveVacancy()">
            <div class="bookmarks">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.42788 0.269325C7.50928 0.104406 7.67723 7.30754e-09 7.86116 7.30754e-09C8.04509 -3.18919e-05 8.21307 0.104374 8.29448 0.269293L10.1792 4.08753C10.3564 4.44655 10.6989 4.69546 11.0952 4.75301L15.3091 5.36557C15.4911 5.39204 15.6423 5.51951 15.6992 5.69445C15.756 5.86935 15.7086 6.06138 15.5769 6.18978L12.5279 9.16218C12.2412 9.44171 12.1104 9.84437 12.178 10.239L12.8975 14.4352C12.9285 14.6165 12.854 14.7997 12.7052 14.9077C12.5564 15.0159 12.3592 15.0301 12.1964 14.9445L8.42731 12.9633C8.07291 12.7771 7.64951 12.7771 7.29505 12.9634L3.52632 14.9444C3.36351 15.03 3.16624 15.0157 3.01746 14.9076C2.86865 14.7995 2.79417 14.6163 2.82524 14.4351L3.54498 10.2392C3.6127 9.84444 3.48185 9.44171 3.19508 9.16211L0.145932 6.18981C0.0142525 6.06142 -0.0331816 5.86938 0.0236627 5.69448C0.080507 5.51958 0.231709 5.39211 0.413726 5.3656L4.62748 4.75307C5.02373 4.69546 5.3663 4.44659 5.54353 4.0875L7.42788 0.269325Z" fill="#D5444C"/>
              </svg>
              <span>Удалить из избранного</span>
            </div>
          </button>
          <button v-else class="post-button" @click="saveVacancy()">
            <div class="bookmarks">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.50333 15C3.33184 15 3.16155 14.9465 3.01621 14.8414C2.74548 14.6452 2.61902 14.308 2.6927 13.9825L3.69966 9.54688L0.284693 6.55204C0.0336703 6.3329 -0.0622248 5.98586 0.0408356 5.66832C0.143896 5.35138 0.424297 5.12698 0.756287 5.09629L5.2747 4.68608L7.06112 0.505509C7.19284 0.198358 7.49283 0 7.82613 0C8.15944 0 8.45942 0.198358 8.59114 0.504793L10.3776 4.68608L14.8953 5.09629C15.228 5.12627 15.5084 5.35138 15.6114 5.66832C15.7145 5.98526 15.6192 6.3329 15.3682 6.55204L11.9532 9.54628L12.9602 13.9818C13.034 14.308 12.9074 14.6452 12.6368 14.8408C12.3668 15.0364 12.0067 15.0515 11.7224 14.8806L7.82613 12.5522L3.9299 14.8819C3.79818 14.9601 3.65141 15 3.50333 15ZM7.82613 11.5492C7.97421 11.5492 8.12086 11.589 8.2527 11.6672L11.9298 13.8665L10.9794 9.67991C10.9116 9.38196 11.0128 9.07086 11.243 8.86928L14.4675 6.04139L10.2014 5.65399C9.89427 5.62593 9.63011 5.43282 9.51009 5.14979L7.82613 1.2046L6.14015 5.15039C6.02144 5.43151 5.75728 5.62461 5.45085 5.65268L1.18417 6.04008L4.40854 8.86797C4.6395 9.07015 4.74053 9.38064 4.6721 9.67931L3.72247 13.8657L7.39956 11.6672C7.53128 11.589 7.67805 11.5492 7.82613 11.5492ZM5.24019 4.76693C5.24019 4.76693 5.24019 4.76765 5.23947 4.76824L5.24019 4.76693ZM10.4108 4.76502L10.4115 4.76633C10.4115 4.76562 10.4115 4.76562 10.4108 4.76502Z" fill="black" fill-opacity="0.3"/>
              </svg>
              <span>Добавить в избранное</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  props: {
    vacancy: Object,
    employments: Object,
    experiences: Object,
    schedules: Object,
  },
  methods: {
    ...mapActions(['getSavedVacancy', 'getResponsedVacancy']),
    async saveVacancy() {
      const vacancy = await this.getSavedVacancy(this.vacancy.id);
      this.$emit('vacancyUpdated', vacancy);
    },
    async responseVacancy() {
      const vacancy = await this.getResponsedVacancy(this.vacancy.id);
      this.$emit('vacancyUpdated', vacancy, this.index);
    }
  },
}

</script>
