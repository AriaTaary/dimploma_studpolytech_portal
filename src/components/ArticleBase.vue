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
          <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.3849 7.04225C23.1747 6.75464 18.1652 0 11.7671 0C5.36909 0 0.359361 6.75464 0.149343 7.04197C-0.049781 7.31483 -0.049781 7.6849 0.149343 7.95775C0.359361 8.24536 5.36909 15 11.7671 15C18.1652 15 23.1747 8.24531 23.3849 7.95798C23.5843 7.68517 23.5843 7.31483 23.3849 7.04225ZM11.7671 13.4483C7.05429 13.4483 2.97248 8.96509 1.76417 7.49947C2.97091 6.03256 7.04418 1.55172 11.7671 1.55172C16.4797 1.55172 20.5613 6.03412 21.7701 7.50053C20.5633 8.96739 16.4901 13.4483 11.7671 13.4483Z" fill="black" fill-opacity="0.3"/>
            <path d="M11.7671 2.84482C9.20031 2.84482 7.11194 4.93319 7.11194 7.50001C7.11194 10.0668 9.20031 12.1552 11.7671 12.1552C14.334 12.1552 16.4223 10.0668 16.4223 7.50001C16.4223 4.93319 14.334 2.84482 11.7671 2.84482ZM11.7671 10.6034C10.0558 10.6034 8.6637 9.21128 8.6637 7.50001C8.6637 5.78875 10.0559 4.39658 11.7671 4.39658C13.4784 4.39658 14.8706 5.78875 14.8706 7.50001C14.8706 9.21128 13.4784 10.6034 11.7671 10.6034Z" fill="black" fill-opacity="0.3"/>
          </svg>
          <span>{{ this.article.views }}</span>
        </div>
        <button v-if="this.article.rating_user === 1" class="post-button post-button-active" @click="likeArticle()">
          <div class="likes">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7733 1.31029C12.9975 0.476347 11.9103 0.00184636 10.7712 8.7322e-05C9.63129 0.0014066 8.54298 0.475655 7.76593 1.30975L7.5011 1.5896L7.23627 1.30975C5.69438 -0.349741 3.09914 -0.445043 1.43965 1.09685C1.36611 1.1652 1.29509 1.23619 1.22674 1.30975C-0.408913 3.074 -0.408913 5.80057 1.22674 7.56483L7.11191 13.7711C7.31552 13.9861 7.65483 13.9953 7.86977 13.7917C7.87681 13.785 7.88366 13.7782 7.89032 13.7711L13.7734 7.56483C15.4089 5.80076 15.4089 3.07435 13.7733 1.31029Z" fill="#D5444C"/>
            </svg>
            <span>{{ this.article.rating }}</span>
          </div>
        </button>
        <button v-if="this.article.rating_user === null" class="post-button" @click="likeArticle()">
          <div class="likes">
            <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.8222 1.41007C13.9873 0.512622 12.8173 0.00198696 11.5915 9.39718e-05C10.3647 0.00151372 9.19355 0.511878 8.35732 1.40949L8.07233 1.71065L7.78733 1.40949C6.12802 -0.376375 3.33511 -0.478935 1.54928 1.18037C1.47014 1.25393 1.39372 1.33033 1.32016 1.40949C-0.440053 3.3081 -0.440053 6.2423 1.32016 8.14091L7.6535 14.8198C7.87262 15.0511 8.23776 15.061 8.46908 14.8419C8.47665 14.8348 8.48402 14.8274 8.49118 14.8198L14.8222 8.14091C16.5823 6.24251 16.5823 3.30847 14.8222 1.41007ZM13.9874 7.34649H13.9868L8.07233 13.5846L2.15727 7.34649C0.812567 5.89578 0.812567 3.65404 2.15727 2.20333C3.37842 0.879795 5.44134 0.796807 6.76488 2.01796C6.82914 2.07725 6.89096 2.13907 6.95026 2.20333L7.6535 2.94525C7.88526 3.17552 8.25943 3.17552 8.49118 2.94525L9.19443 2.20391C10.4156 0.880369 12.4785 0.797382 13.802 2.01853C13.8663 2.07782 13.9281 2.13965 13.9874 2.20391C15.3438 3.65692 15.3538 5.90275 13.9874 7.34649Z" fill="black" fill-opacity="0.3"/>
            </svg>
            <span>{{ this.article.rating }}</span>
          </div>
        </button>
        <button v-if="this.article.saved_user === 1" class="post-button post-button-active" @click="saveArticle()">
          <div class="bookmarks">
            <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.65175 0H0.348115C0.155837 0 8.52455e-07 0.165986 8.52455e-07 0.37079V14.2579C-0.000407103 14.5361 0.145638 14.791 0.377896 14.9181C0.610289 15.0452 0.889869 15.0231 1.10187 14.8606L4.99993 11.8844L8.898 14.8607C9.11027 15.0226 9.38958 15.0447 9.62183 14.9176C9.85395 14.7906 10 14.536 10 14.2579V0.37079C10 0.165986 9.84403 0 9.65175 0Z" fill="#D5444C"/>
            </svg>
            <span>{{ this.article.saved }}</span>
          </div>
        </button>
        <button v-if="this.article.saved_user === null" class="post-button" @click="saveArticle()">
          <div class="bookmarks">
            <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.87912 0H0.94459C0.42375 0 0 0.42375 0 0.94459V14.4333C0 14.6388 0.111269 14.8281 0.290742 14.9282C0.376699 14.9762 0.471738 15 0.566748 15C0.670283 15 0.773438 14.9718 0.864668 14.9156L4.91297 12.4162L8.96071 14.8974C9.13564 15.0049 9.35499 15.0093 9.53388 14.9088C9.71279 14.8086 9.82368 14.6196 9.82368 14.4144V0.94459C9.82368 0.42375 9.39996 0 8.87912 0ZM8.69019 13.4019L5.20825 11.2674C5.02576 11.1555 4.79604 11.1561 4.61411 11.2683L1.1335 13.4172V1.1335H8.69019V13.4019Z" fill="black" fill-opacity="0.3"/>
            </svg>
            <span>{{ this.article.saved }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import moment from 'moment'
import api from '@/network/api'
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  props: {
    article: Object,
    index: Number,
  },
  data: () => ({
    rating: null,
  }),
  methods: {
    ...mapActions(['getSavedArticle', 'getLikedArticle']),
    async likeArticle() {
      // const userTag = this.$store.getters.getUser.id;

      // console.log(this.article.rating_user);

      // article.rating_users.forEach(
      //   function (rating_user, rating_usersKey, rating_usersArray) {
      //     if (rating_user.id === userTag) {

      //       console.log(this.article.rating_user.id);
      //       this.article.rating_user = 1;
      //     }
      // })

      if (this.article.rating_user === 1){
        // console.log(this.article.rating_user);
        // this.article.rating_user = null;
        // let ratingTag = 0;
        // // console.log(this.article.rating_user);
        // const responseAPI = await api.ratingArticle(this.$store.getters.getAuthToken, this.article.id, ratingTag);
        // console.log(ratingTag);
        // let response = await this.getArticle(responseAPI, this.article.id);
        // console.log(response);
        // this.$emit('articleUpdated', response, this.index);
        console.log('блядская жопа');
      }
      else{
        this.article.rating_user = 1;
        let ratingTag = 1;
        // console.log(ratingTag);
        const responseAPI = await api.ratingArticle(this.$store.getters.getAuthToken, this.article.id, ratingTag);
        // console.log(responseAPI);
        let response = await this.getLikedArticle(responseAPI);
        // console.log(response);
        this.$emit('articleUpdated', response, this.index);
      };

      // if (this.article.rating_user != 1){
      //   let ratingTag = 1;
      //   let response = await this.getLikedArticle(this.article.id, ratingTag);
      //   // let response = await this.getArticle(responseAPI, this.article.id);
      //   // console.log(response);
      //   // this.$emit('articleUpdated', response, this.index);
      // }
      // else{
      //   console.log('блядская жопа');
      //   // this.article.rating_user = 1;
      //   // let ratingTag = 1;
      //   // // console.log(ratingTag);
      //   // // const responseAPI = await api.ratingArticle(this.$store.getters.getAuthToken, this.article.id, ratingTag);
      //   // // console.log(responseAPI);
      //   // let response = await this.getLikedArticle(this.article.id, ratingTag);
      //   // console.log(response);
      //   // this.$emit('articleUpdated', response, this.index);
      // };
    },
    async saveArticle() {
      // const responseAPI = await api.saveArticle(this.$store.getters.getAuthToken, this.article.id);
      // this.article = response.data;
      // console.log(responseAPI.data);

      const response = await this.getSavedArticle(this.article.id);

      // console.log(response);
      // const userTag = this.$store.getters.getUser.id;
      // let saveTag = null;
      // let raitingTag = null;

      // response.data.saved_users.forEach(
      //   function (saved_user, saved_usersKey, saved_usersArray) {
      //     if (saved_user.id === userTag) {
      //       saveTag = 1;
      //     }
      //   })

      // response.data.rating_users.forEach(
      //   function (rating_user, rating_usersKey, rating_usersArray) {
      //     if (rating_user.id === userTag) {
      //       raitingTag = 1;
      //     }
      // })

      // response.data.saved_user = saveTag;
      // response.data.rating_user = raitingTag;

      console.log(response);

      this.$emit('articleUpdated', response, this.index);
    }
  }
}

</script>
