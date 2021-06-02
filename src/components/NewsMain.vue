<template>
  <div class="card-info">
    <div class="card-about-info">
      <p class="author mini-hover">@автор</p>
      <p>21.21.21</p>
    </div>
    <div class="card-categories">
      <p
      class="mini-hover"
      >
        Категория
      </p>
    </div>
    <div class="card-main-info">
      <h2>Название</h2>
      <img class="article-photo" src="/img/article-photo.png" alt="article-photo">
      <p class="card-description">Текст</p>
      <div class="row-group">
        <router-link class="link-card"
              :to="{ name: 'ViewArticle' }
              ">Подробнее >></router-link>
      </div>
      <div class="ratings">
        <div class="views">
          <img src="/img/view.svg" alt="">
          <span>34</span>
        </div>
        <div class="likes">
          <img src="/img/like.svg" alt="">
          <span>34</span>
        </div>
        <div class="bookmarks">
          <img src="/img/bookmark.svg" alt="">
          <span>34</span>
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
