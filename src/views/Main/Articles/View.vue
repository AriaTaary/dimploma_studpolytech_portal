<template>
  <div class="container">
    <div class="content">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>
      <div v-else class="feed-body">
        <div class="feed">
          <div class="vacancy-feed">
            <ArticleMain
              v-bind:article="article"
            />
          </div>
        </div>
        <div class="advisory">
          <div class="advisory-block">
            <h4>Похожие статьи</h4>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название статьи</p>
              <!-- <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
              </div> -->
            </div>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название статьи</p>
              <!-- <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
              </div> -->
            </div>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название статьи</p>
              <!-- <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from 'moment'
import api from '@/network/api'
import ArticleMain from '@/components/ArticleMain'

moment.locale('ru')

export default {
  components: {
    ArticleMain
  },

  data: () => ({
    loading: true,
    searchText: '',
    count: '',
    article:{
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
  }),

  methods: {
      // editAction () {
      //   this.$router.push({ name: 'VacancyEdit' })
      // }
  },

  async created () {
    let response = await api.getArticle(this.$store.getters.getAuthToken, this.$route.params.id)
    console.log(response);

    if (response.status === 200){
      this.article.id = response.data.id,
      this.article.author = response.data.author.username,
      this.article.title = response.data.title,
      this.article.cut = response.data.cut,
      this.article.text = response.data.text,
      this.article.created_at = moment(response.data.created_at).format('ll'),
      this.article.categories = response.data.categories,
      this.article.views = response.data.views,
      this.article.rating = response.data.rating,
      this.article.saved = response.data.saved,

      this.loading = false
    }
    else {
      alert("Произошла ошибка")
    }
  }
}

</script>
