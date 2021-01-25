<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title fav-title">
          <h1>Подписки</h1>
        </div>
      </div>
      <div class="empty" v-if="this.count === 0">
        <p>У вас пока нет подписок</p>
      </div>
      <div v-else>
        <div v-if="loading" class="loading">
          <img src="/img/preloader.svg" alt="Загрузка данных">
        </div>
        <div v-else class="subscriptions">
          <div class="user-subscriptions">
            <div class="card-main-info">
              <h2>Категории</h2>
              <div class="categories">
                <button class="category"
                        v-for="category in this.categories"
                        :key='category.id'
                >
                  {{ category.name }}
                </button>
              </div>
            </div>
            <div class="card-main-info">
              <h2>Пользователи</h2>
              <div class="users"
                   v-for="user in this.users"
                   :key='user.id'
              >
                <div class="user-info">
                  <img :src="user.avatar"  alt="" class="profile-photo">
                  <div class="profile-card-text">
                    <p class="mini-hover">@{{ user.username }}</p>
                    <p>{{ user.first_name + ' ' + user.last_name }}</p>
                  </div>
                </div>
                <p>Подписчиков: {{ user.followers_count }}</p>
              </div>
            </div>
            <div class="card-main-info">
              <h2>Компании</h2>
              <div class="companies"
                   v-for="company in this.companies"
                   :key='company.id'
              >
                <div class="company-info">
                  <img src="/img/no-avatar.png"  alt="" class="profile-photo">
                  <div class="profile-card-text">
                    <p class="mini-hover">{{ company.name }}</p>
                  </div>
                </div>
                <p>Подписчиков: {{ company.followers_count }}</p>
              </div>
            </div>
          </div>
          <div class="suggestion-subscriptions">
            <h4>Возможно, вам понравится:</h4>
            <h6>Категории</h6>
            <div class="suggestion-categories">
              <p class="mini-hover"
                 v-for="category in this.categories"
                 :key='category.id'
              >
                {{ category.name }}
              </p>
            </div>
            <h6>Пользователи</h6>
            <div class="suggestion-users">
              <div class="users suggestion"
                   v-for="user in this.users"
                   :key='user.id'
              >
                <div class="user-info">
                  <p class="mini-hover">@{{ user.username }}</p>
                  <p>{{ user.first_name + ' ' + user.last_name }}</p>
                </div>
                <p>Подписчиков: {{ user.followers_count }}</p>
              </div>
            </div>
            <h6>Компании</h6>
            <div class="companies suggestion"
                 v-for="company in this.companies"
                 :key='company.id'
            >
              <div class="company-info">
                <p class="mini-hover">{{ company.name }}</p>
              </div>
              <p>Подписчиков: {{ company.followers_count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('ru')
import api from '@/network/api'


export default {
  data: () => ({
    loading: true,
    search: '',
    count: '',
    categories: [
      {
        name: '',
        slug: ''
      }
    ],
    users: [
      {
        username: '',
        avatar: '',
        first_name: '',
        last_name: '',
        followers_count: ''
      }
    ],
    companies: [
      {
        name: '',
        followers_count: ''
      }
    ]
  }),

  async created () {
    const response = await api.getUserSubscriptions(this.$store.getters.getAuthToken)
    console.log(response)

     if (response.status === 200){
      this.count = response.data.users.length + response.data.categories.length + response.data.companies.length

      if (this.count !== 0){
        const parsedCategories = []
        const parsedUsers = []
        const parsedCompanies = []

        response.data.categories.forEach(function (category, key, categories) {
          parsedCategories.push({
            name: category.name,
            slug: category.slug
          })
        })

        response.data.users.forEach(function (user, key, users) {
          parsedUsers.push({
            username: user.username,
            avatar: user.avatar,
            first_name: user.first_name,
            last_name: user.last_name,
            followers_count: user.followers.length
          })
        })

        response.data.companies.forEach(function (company, key, companies) {
          parsedCompanies.push({
            name: company.name,
            followers_count: company.followers.length
          })
        })

        this.categories = parsedCategories
        this.users = parsedUsers
        this.companies = parsedCompanies
        this.loading = false
        console.log(this.categories)
      }
    }
    else {
      alert("Произошла ошибка")
    }
  }
}

</script>
