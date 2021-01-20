<template>
  <div class="container">
    <div class="personal-content">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>
      <div v-else>
        <h1 class="welcome-title">Добро пожаловать в личный кабинет, {{ this.$store.getters.getUser.first_name }} {{ this.$store.getters.getUser.last_name }}</h1>
        <div class="button-personal">
          <a href="/admin"><el-button size="big" class="button-change">Перейти в админ-панель</el-button> </a>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  })
}
</script>
