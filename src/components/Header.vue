<template>
  <div class="container">
    <div class="header-content">
      <div class="logo">
        <a href="/"><img class="logo" src="/img/polytech-logo-white.svg" alt="Polytech logo"></a>
      </div>
      <div class="menu">
        <ul class="menu-list">
          <li class="menu-item">
            <a href="/" class="menu-link">Новости</a>
          </li>
          <li class="menu-item">
            <a href="/articles" class="menu-link">Статьи</a>
          </li>
          <li class="menu-item">
            <a href="/vacancies" class="menu-link">Вакансии</a>
          </li>
          <li v-if="this.$store.getters.getAuthToken" class="menu-item">
              <router-link class="menu-link"
              :to="{ name: 'Personal',
              params: { username: this.$store.getters.getUser.username } }
              ">
              Профиль
              </router-link>
              <el-form>
                <el-button class="button-menu-link-auth button-exit" type="submit" @click="logout">Выйти</el-button>
              </el-form>
          </li>
          <li v-else class="menu-item">
            <a href="/login" class="menu-link menu-link-auth">Вход</a>
          </li>
        </ul>
      </div>

      <div class="menu-mobile">
            <Slide right>
            <!-- <a id="home" href="#">
              <span>Home</span>
            </a> -->
            <ul class="menu-mobile-list">
              <li class="menu-item">
                <a href="/" class="menu-mobile-link">Новости</a>
              </li>
              <li class="menu-item">
                <a href="/articles" class="menu-mobile-link">Статьи</a>
              </li>
              <li class="menu-item">
                <a href="/vacancies" class="menu-mobile-link">Вакансии</a>
              </li>
              <li v-if="this.$store.getters.getAuthToken" class="menu-mobile-item">
                <div class="menu-mobile-list">
                  <router-link class="menu-mobile-link"
                  :to="{ name: 'Personal',
                  params: { username: this.$store.getters.getUser.username } }
                  ">
                  Профиль
                  </router-link>
                  <el-form>
                    <el-button class="menu-link mobile-exit" type="submit" @click="logout">Выйти</el-button>
                  </el-form>
                </div>
              </li>
              <li v-else class="menu-mobile-item">
                <a href="/login" class="menu-mobile-link menu-link-auth mobile-enter">Вход</a>
              </li>
            </ul>
            </Slide>
      </div>

    </div>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'

export default {
components: {
      Slide
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push({ name: 'Main' })
    }
  },
  }
</script>
