<template>
  <div class="wrapper">
    <div class="header">
      <Header />
    </div>
    <div class="main-content">
      <AddHeader />
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
import AddHeader from '@/components/Add-header-articles'

export default {
  components: {
    Header, Footer, AddHeader
  }
}
</script>
