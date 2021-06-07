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
              v-on:articleUpdated="updateArticle"
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
import prepareDate from "@/helpers/prepareDate";

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
    updateArticle(article){
      this.loading = true;
      this.article = article;
      this.loading = false;
    }
  },

  async created () {
    let response = await api.getMainArticle(this.$store.getters.getAuthToken, this.$route.params.id)

    if (response.status === 200){
      this.article = prepareDate.article(response.data, this.$store.getters.getUser.id);

      this.loading = false;
    }
    else {
      alert("Произошла ошибка");
    }
  }
}

</script>
