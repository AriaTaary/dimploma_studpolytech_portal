<template>
  <div class="container">
    <div class="header-content">
      <div class="menu-add">
        <ul class="menu-list-add">
          <router-link
            v-for="link in links"
            :key="link.component.name"
            tag="li"
            class="menu-item-add"
            active-class="menu-item-add-active"
            :to="link.component"
            :exact="link.exact"
          >
            <a href="#" class="menu-link-add">{{link.title}}</a>
          </router-link>
        </ul>
      </div>

      <div class="menu-mobile-profile">
            <Slide right>
            <!-- <a id="home" href="#">
              <span>Home</span>
            </a> -->
            <ul class="menu-mobile-list-profile-mobile">
              <router-link
            v-for="link in links"
            :key="link.component.name"
            tag="li"
            class="menu-item-add-mobile"
            active-class="menu-item-add-active-mobile"
            :to="link.component"
            :exact="link.exact"
          >
            <a href="#" class="menu-link-add">{{link.title}}</a>
          </router-link>
            </ul>
            </Slide>
      </div>


    </div>
  </div>
</template>

<script>
import {store} from '@/store'
import { Slide } from 'vue-burger-menu'

  export default {
    components: {
      Slide
  },
    data: () => ({
      links: [
        {title: 'Профиль', component: { name: 'Personal', params: { username: store.getters.getUser.username } }, exact: true},
        {title: 'Мои статьи', component: { name: 'PersonalArticles', params: { username: store.getters.getUser.username } }},
        {title: 'Мои вакансии', component: { name: 'PersonalVacancies', params: { username: store.getters.getUser.username } }},
        {title: 'Избранное', component: { name: 'PersonalFavouriteArticles', params: { username: store.getters.getUser.username } }},
        {title: 'Понравившееся', component: { name: 'PersonalLikedArticles', params: { username: store.getters.getUser.username } }},
        // {title: 'Подписки', component: { name: 'PersonalSubscriptions', params: { username: store.getters.getUser.username } }}
        // {title: 'Подписки', component: { name: 'PersonalSubscriptions', params: { username: store.getters.getUser.username } }},
        {title: 'Настройки', component: { name: 'PersonalEdit', params: { username: store.getters.getUser.username } }},
      ]
    }),

    methods: {
      async logout () {
        await this.$store.dispatch('logout')
        this.$router.push({ name: 'Main' })
      }
    }
  }
</script>
