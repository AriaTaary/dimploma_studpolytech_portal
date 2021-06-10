<template>
  <div class="admin-content admin-main-page">
    <div class="admin-content-top">
        <h2>{{ this.$store.getters.getUser.last_name }} {{ this.$store.getters.getUser.first_name }}, добро пожаловать в админ-панель</h2>
    </div>
  </div>
</template>
