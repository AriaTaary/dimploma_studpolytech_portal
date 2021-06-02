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
          <li class="menu-item">
            <a href="" class="menu-link">Проекты</a>
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
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push({ name: 'Main' })
    }
  }
}
</script>
