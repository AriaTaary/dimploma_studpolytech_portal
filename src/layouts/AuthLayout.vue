<template>
  <div class="wrapper">
    <div class="header">
      <HeaderAuth />
    </div>
    <div class="main-content auth">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderAuth from '@/components/Header-auth'

export default {
  components: {
    HeaderAuth
  }
}
</script>

<style>
/* @import "~bootstrap/dist/css/bootstrap-grid.min.css";
@import "~bootstrap/dist/css/bootstrap-reboot.min.css";
@import "~bootstrap/dist/css/bootstrap.min.css"; */
</style>
