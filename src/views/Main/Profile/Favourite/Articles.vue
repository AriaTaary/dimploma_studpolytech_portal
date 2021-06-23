<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title fav-title">
          <h1>Избранное:</h1>
          <router-link class="profile-settings-title" :to="{ name: 'PersonalFavouriteArticles', params: { username: this.$store.getters.getUser.username } }">Статьи</router-link>
          <router-link class="profile-settings-title not-active-title" :to="{ name: 'PersonalFavouriteVacancies', params: { username: this.$store.getters.getUser.username } }">Вакансии</router-link>
        </div>
      </div>
      <div class="empty" v-if="this.count === 0">
        <p>Вы пока не добавляли статьи в избранное</p>
      </div>
      <div v-else>
        <div v-if="loading" class="loading">
          <img src="/img/preloader.svg" alt="Загрузка данных">
        </div>
        <ArticleBase
          v-else
          v-for="(article, index) in this.articles"
          :key='index'
          v-bind:article="article"
          v-bind:index="index"
          v-on:articleUpdated="updateArticle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapActions} from 'vuex'

import ArticleBase from '@/components/ArticleBase'

moment.locale('ru')

export default {
  components: {
    ArticleBase
  },
  data: () => ({
    loading: true,
    count: '',
    articles: [],
  }),
  methods:{
    ...mapActions(['getUserFavouriteArticles']),
    updateArticle(article, index){
      this.loading = true;
      this.articles[index] = article;
      this.loading = false;
    }
  },
  async created () {
    this.articles = await this.getUserFavouriteArticles();
    this.count = this.articles.length;
    this.loading = false;
  }
}
</script>

