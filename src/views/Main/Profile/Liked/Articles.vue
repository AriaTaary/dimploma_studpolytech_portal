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
        <ArticleMini
          v-else
          v-for="article in this.articles"
          :key='article.id'
          v-bind:article="article"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/network/api'
import ArticleMini from '@/components/ArticleMini'

moment.locale('ru')

export default {
  components: {
    ArticleMini
  },
  data: () => ({
    loading: true,
    search: '',
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
        saved: ''
      }
    ]
  }),

  async created () {
    const response = await api.getUserLiked(this.$store.getters.getAuthToken)

    if (response.status === 200){
      this.count = response.data.count

      if (this.count !== 0){
        const parsedArticles = []

        response.data.articles.forEach(function(article, key, articles){
          const categories = []

          article.categories.forEach(
            function (category, categoryKey, categoriesArray){
              categories.push(
              {
                slug: category.slug,
                name: category.name
              }
            )}
          )

          parsedArticles.push({
            id: article.id,
            author: article.author.username,
            title: article.title,
            cut: article.cut,
            created_at: moment(article.created_at).format('llll'),
            categories: categories,
            views: article.views,
            rating: article.rating,
            saved: article.saved
          })
        })

        this.articles = parsedArticles
        this.loading = false
      }
    }
    else {
      alert("Произошла ошибка")
    }
  }
}

</script>

