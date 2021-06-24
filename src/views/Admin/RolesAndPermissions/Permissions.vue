<template>
  <div class="admin-content">
    <div class="admin-content-top">
      <h2>Все разрешения</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-table v-else
         :data="permissions.filter(
          data => !search
          || data.name.toLowerCase().includes(search.toLowerCase())
        )"
        :default-sort = "{prop: 'created_at', order: 'ascending'}"
        style="width: 100%"
        max-height="700">
        <el-table-column
          prop="id"
          label="id"
          min-width="50"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="Название"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Дата создания"
          min-width="100"
          sortable
          :formatter="formatDateTime">
        </el-table-column>
        <el-table-column
          label="Операции"
          width="200">
          <template
            slot="header"
            slot-scope="scope"
          >
            <el-input
              v-model="search"
              size="mini"
              placeholder="Поиск" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from '@/network/api'
import moment from 'moment'
moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    search: '',
    created_at: '',
    permissions: [
      {
        id: '',
        name: ''
      }
    ]
  }),
  methods: {
    formatDateTime (row, column) {
      return moment(column).format('LL')
    }
  },
  async created () {
    const rolesAndPermissions = await api.getRolesAndPermissions(this.$store.getters.getAuthToken)

    if (rolesAndPermissions.status === 200) {
      this.permissions = rolesAndPermissions.data.data.permissions
      this.loading = false
    }
  }
}
</script>
