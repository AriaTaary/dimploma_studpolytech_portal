<template>
  <router-link
    :to="{ name: 'NewsView',
    params: { id: this.item.id } }">
      <div class="news-block">
        <div class="gradient">
          <!-- <img src="img/news.jpeg" alt=""> -->
          <img
            v-bind:src="'data:image/' + this.item.image.content_type + ';base64,' + this.item.image.base64"
            alt="news-photo"
            class="news-image"
          >
        </div>
        <div class="news-info">
          <div class="news-title">
            <p>{{ this.item.title }}</p>
          </div>
          <div class="news-data">
            <p>{{ this.item.created_at }}</p>
          </div>
        </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: Object
  },
}
</script>
