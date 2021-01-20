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

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },
  components: {
    MainLayout, AuthLayout, AdminLayout, PersonalLayout
  }
}
</script>

<style>
@import "assets/CSS/main.css";
@import "assets/CSS/media.css";
@import "https://fonts.gstatic.com";
@import "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap";
@import "https://unpkg.com/element-ui/lib/theme-chalk/index.css";
@import "https://unpkg.com/element-ui/lib/index.js";
</style>
