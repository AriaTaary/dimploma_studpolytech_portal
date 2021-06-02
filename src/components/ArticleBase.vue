<template>
  <div class="card-info">
    <div class="card-about-info">
      <p class="author mini-hover">@{{ this.article.author}}</p>
      <p>{{ this.article.created_at }}</p>
    </div>
    <div class="card-categories">
      <p
      v-for="category in this.article.categories"
      :key='category.id'
      class="mini-hover"
      >
        {{ category.name }}
      </p>
    </div>
    <div class="card-main-info">
      <h2>{{ this.article.title }}</h2>
      <img class="article-photo" src="/img/article-photo.png" alt="article-photo">
      <p class="card-description">{{ this.article.cut }}</p>
      <div class="row-group">
        <router-link class="button-not-main"
              :to="{ name: 'ViewArticle',
              params: { id: this.article.id } }
              ">Подробнее >></router-link>
      </div>
      <div class="ratings">
        <div class="views">
          <img src="/img/view.svg" alt="">
          <span>{{ this.article.views }}</span>
        </div>
        <div class="likes">
          <img src="/img/like.svg" alt="">
          <span>{{ this.article.rating }}</span>
        </div>
        <div class="bookmarks">
          <img src="/img/bookmark.svg" alt="">
          <span>{{ this.article.saved }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import moment from 'moment'

moment.locale('ru')

export default {
  props: {
    article: Object
  }
}

</script>
