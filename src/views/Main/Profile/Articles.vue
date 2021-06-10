<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title">
          <h1>Мои статьи</h1>
        </div>
      </div>
      <div class="empty" v-if="this.count === 0">
        <p>Вы пока не добавляли статьи</p>
      </div>
      <div v-else>
        <div v-if="loading" class="loading">
          <img src="/img/preloader.svg" alt="Загрузка данных">
        </div>
        <ArticleMini
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
import ArticleMini from '@/components/ArticleMini'
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  components: {
    ArticleMini
  },
  data: () => ({
    loading: true,
    articles: [],
    count: '',
  }),
  methods:{
    ...mapActions(['getUserArticles']),
    updateArticle(article, index){
      this.loading = true;
      this.articles[index] = article;
      this.loading = false;
    }
  },
  async created () {
    this.articles = await this.getUserArticles();
    this.count = this.articles.length;
    this.loading = false;
  }
}

</script>
