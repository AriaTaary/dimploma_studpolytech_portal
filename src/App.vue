<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
import AdminLayout from '@/layouts/AdminLayout'
import PersonalLayout from '@/layouts/PersonalLayout'
import VacanciesLayout from '@/layouts/VacanciesLayout'

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },
  components: {
    MainLayout, AuthLayout, AdminLayout, PersonalLayout, VacanciesLayout
  }
}
</script>

<style>
@import "assets/CSS/main.css";
@import "assets/CSS/feed.css";
@import "assets/CSS/profile.css";
@import "assets/CSS/media.css";
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap";
@import "https://unpkg.com/element-ui/lib/theme-chalk/index.css";

/* TODO: разобраться с подключением */
/* @import "https://fonts.gstatic.com"; */
/* @import "https://unpkg.com/element-ui/lib/index.js"; */
</style>
