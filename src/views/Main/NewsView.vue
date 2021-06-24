<template>
<div class="content">
    <div class="container">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>
      <div v-else class="news-main">
        <p class="news-main-date">{{ this.news.created_at }}</p>
        <h2 class="news-main-title">{{ this.news.title }}</h2>
        <img
            v-bind:src="'data:image/' + this.news.image.content_type + ';base64,' + this.news.image.base64"
            alt="news-photo"
          >
        <p class="news-main-text">{{ this.news.text }}</p>
        <div class="news_ratings">
          <div class="views">
            <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.3849 7.04225C23.1747 6.75464 18.1652 0 11.7671 0C5.36909 0 0.359361 6.75464 0.149343 7.04197C-0.049781 7.31483 -0.049781 7.6849 0.149343 7.95775C0.359361 8.24536 5.36909 15 11.7671 15C18.1652 15 23.1747 8.24531 23.3849 7.95798C23.5843 7.68517 23.5843 7.31483 23.3849 7.04225ZM11.7671 13.4483C7.05429 13.4483 2.97248 8.96509 1.76417 7.49947C2.97091 6.03256 7.04418 1.55172 11.7671 1.55172C16.4797 1.55172 20.5613 6.03412 21.7701 7.50053C20.5633 8.96739 16.4901 13.4483 11.7671 13.4483Z" fill="black" fill-opacity="0.3"/>
              <path d="M11.7671 2.84482C9.20031 2.84482 7.11194 4.93319 7.11194 7.50001C7.11194 10.0668 9.20031 12.1552 11.7671 12.1552C14.334 12.1552 16.4223 10.0668 16.4223 7.50001C16.4223 4.93319 14.334 2.84482 11.7671 2.84482ZM11.7671 10.6034C10.0558 10.6034 8.6637 9.21128 8.6637 7.50001C8.6637 5.78875 10.0559 4.39658 11.7671 4.39658C13.4784 4.39658 14.8706 5.78875 14.8706 7.50001C14.8706 9.21128 13.4784 10.6034 11.7671 10.6034Z" fill="black" fill-opacity="0.3"/>
            </svg>
            <span>{{ this.news.views }}</span>
          </div>
        </div>
        <div class="news-button">
          <router-link
            class="button-not-main"
            :to="{ name: 'Main' }">
            << На главную
          </router-link>
        </div>
      </div>
  </div>
</div>
</template>


<script>
import moment from 'moment'
import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate";

moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    request: {
      sort: {
        date: null,
        views: null,
      },
      filter: {
        categories: []
      }
    },
    news: [],
    categories: [],
    current_page: null,
    total: null,
    per_page: null,
  }),

  async created () {
    let response = await api.getMainNews(this.$store.getters.getAuthToken, this.$route.params.id)

    if (response.status === 200){
      this.news = prepareDate.news(response.data.data, this.$store.getters.getUser.id);

      this.loading = false;
    }
    else {
      alert("Произошла ошибка");
    }
  }
}

</script>
