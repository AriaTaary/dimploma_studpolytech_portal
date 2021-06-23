<template>
  <div class="wrapper admin-background">
    <div class="header">
      <HeaderAdmin />
    </div>
    <div v-if="ACCESS_FAIL">
      <AdminError />
    </div>
    <div v-else class="admin container">
      <SidemenuAdmin />
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderAdmin from '@/components/Header-admin'
import SidemenuAdmin from '@/components/Sidemenu-admin'
import AdminError from '@/components/AdminError'
import {mapState} from "vuex";

export default {
  components: {
    HeaderAdmin, SidemenuAdmin, AdminError
  },
  computed: {
    ...mapState({
      ACCESS_FAIL: (state) => state.accessFail,
    }),
  },
}
</script>
