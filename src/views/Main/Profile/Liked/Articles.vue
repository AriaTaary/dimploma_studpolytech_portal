<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title fav-title">
          <h1>Понравившееся</h1>
        </div>
      </div>
       <div class="empty" v-if="this.count === 0">
        <p>Вы пока не добавляли ничего в понравившееся</p>
      </div>
      <div v-else>
        <div v-if="loading" class="loading-main">
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
import ArticleBase from '@/components/ArticleBase'
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  components: {
    ArticleBase
  },
  data: () => ({
    loading: true,
    count: '',
    articles: []
  }),
  methods:{
    ...mapActions(['getUserLikedArticles']),
    updateArticle(article, index){
      this.loading = true;
      this.articles[index] = article;
      this.loading = false;
    }
  },
  async created () {
    this.articles = await this.getUserLikedArticles();
    this.count = this.articles.length;
    this.loading = false;
  }
}

</script>

