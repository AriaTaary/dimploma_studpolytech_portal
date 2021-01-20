<template>
  <div class="wrapper admin-background">
    <div class="header">
      <HeaderAdmin />
    </div>
    <div class="main-content admin container">
      <SidemenuAdmin />
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderAdmin from '@/components/Header-admin'
import SidemenuAdmin from '@/components/Sidemenu-admin'

export default {
  components: {
    HeaderAdmin, SidemenuAdmin
  }
}
</script>
