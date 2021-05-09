<template>
  <div class="vacancy-block">
    <div class="card-info">
      <router-link class="link-card"
              :to="{ name: 'ViewVacancy',
              params: { id: this.vacancy.id } }
              ">
        <div class="card-about-info">
          <p class="author">@{{ this.vacancy.author}}</p>
          <p>{{ this.vacancy.created_at }}</p>
        </div>
        <div class="card-categories">
          <p
          v-for="category in this.vacancy.categories"
          :key='category.id'
          class="mini-hover"
          >
            {{ category.name }}
          </p>
        </div>
        <div class="card-main-info">
          <div class="card-main-info-title">
            <h2>{{ this.vacancy.title }}</h2>
            <p>{{ this.vacancy.salary }}</p>
          </div>
          <p class="card-description">{{ this.vacancy.description }}</p>
        </div>
        </router-link>
        <div class="row-group">
          <button class="button-main" @click="editAction ()">Откликнуться</button>
          <button class="button-favourite" @click="editAction ()">Добавить в избранное</button>
        </div>
        <!-- TODO: блок сохранений и просмотров на вакансии
        <div class="ratings">
          <div class="views">
            <img src="/img/view.svg" alt="">
            <span>{{ this.article.views }}</span>
          </div>
          <div class="likes">
            <img src="/img/like.svg" alt="">
            <span>{{ this.article.views }}</span>
          </div>
          <div class="bookmarks">
            <img src="/img/bookmark.svg" alt="">
            <span>{{ this.article.views }}</span>
          </div>
        </div> -->
    </div>
  </div>
</template>


<script>
import moment from 'moment'

moment.locale('ru')

export default {
  props: {
    vacancy: Object
  }
}

</script>

