<template>
  <div class="wrapper">
    <div class="header">
      <Header />
    </div>
    <div class="main-content admin-main-page">
      <router-view />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header, Footer
  }
}
</script>
