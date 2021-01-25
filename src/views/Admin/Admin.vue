<template>
  <div class="admin-content admin-main-page">
    <div class="admin-content-top">
        <h2>Добро пожаловать в админ-панель, {{ this.$store.getters.getUser.first_name }} {{ this.$store.getters.getUser.last_name }}</h2>
    </div>
  </div>
</template>
