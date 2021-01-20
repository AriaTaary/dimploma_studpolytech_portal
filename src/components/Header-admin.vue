<template>
  <div class="container">
    <div class="header-content">
      <div class="logo-admin">
        <a href="/"><img src="/img/polytech-logo-white.svg" alt="Polytech logo"></a>
        <p>панель администратора</p>
      </div>
      <div class="menu">
        <ul class="menu-list">
          <li class="menu-item">
            <a href="/" class="menu-link">Главная</a>
          </li>
          <li class="menu-item">
            <el-form>
              <el-button class="button-menu-link-auth" type="submit" @click="logout">Выйти</el-button>
            </el-form>
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
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
