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
        <div v-if="loading" class="loading">
          <img src="/img/preloader.svg" alt="Загрузка данных">
        </div>
        <!-- <ArticleMini
          v-else
          v-for="article in this.articles"
          :key='article.id'
          v-bind:article="article"
        /> -->
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
import api from '@/network/api'
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
    articles: [
      {
        id: '',
        author: '',
        title: '',
        cut: '',
        text: '',
        created_at: '',
        categories: [
          {
            id: '',
            name: ''
          }
        ],
        views: '',
        rating: '',
        saved: '',
        rating_users: [
          {
          id: '',
          user_id: '',
          article_id: '',
          rating: '',
          created_at: '',
          updated_at: '',
          }
        ],
        rating_user: '',
        saved_user: '',
      }
    ]
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
    this.loading = false;
    // const response = await api.getUserLiked(this.$store.getters.getAuthToken);
    // // console.log(response);

    // const userTag = this.$store.getters.getUser.id;

    // if (response.status === 200){
    //   this.count = response.data.count;

    //   // console.log(this.count);

    //   if (this.count !== 0){
    //     const parsedArticles = []

    //     response.data.articles.forEach(function(article, key, articles){
    //       const categories = []

    //       article.categories.forEach(
    //         function (category, categoryKey, categoriesArray){
    //           categories.push(
    //           {
    //             slug: category.slug,
    //             name: category.name
    //           }
    //         )}
    //       )

    //       let ratingTag = null;

    //       article.rating_users.forEach(
    //         function (rating_user, rating_usersKey, rating_usersArray) {
    //           if (rating_user.id === userTag) {
    //             ratingTag = 1;
    //           }
    //       })

    //       let saveTag = null;

    //       article.saved_users.forEach(
    //         function (saved_user, saved_usersKey, saved_usersArray) {
    //           if (saved_user.id === userTag) {
    //             saveTag = 1;
    //           }
    //         })

    //       parsedArticles.push({
    //         id: article.id,
    //         author: article.author.username,
    //         title: article.title,
    //         cut: article.cut,
    //         created_at: moment(article.created_at).format('llll'),
    //         categories: categories,
    //         views: article.views,
    //         rating: article.rating,
    //         saved: article.saved,
    //         rating_user: ratingTag,
    //         saved_user: saveTag,
    //       })
    //     })

    //     this.articles = parsedArticles;
    //     console.log(this.articles);
    //     this.loading = false
    //   }
    // }
    // else {
    //   alert("Произошла ошибка")
    // }
  }
}

</script>

