<template>
  <div class="admin-content">
    <div class="admin-content-top">
      <h2>Все роли</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-table v-else
        :data="roles.filter(
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
          label="Роль"
          min-width="150"
          sortable>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Дата создания"
          min-width="150"
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
          <template slot-scope="scope">
            <div class="operation-buttons">
              <el-button
              size="mini"
              class="button-admin button-change button-view"
              @click="viewAction(scope.$index, scope.row)">Подробнее</el-button>
            </div>
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
    roles: [
      {
        id: '',
        name: '',
        created_at: '',
        permissions: [
          {
            id: '',
            name: ''
          }
        ]
      }
    ]
  }),
  methods: {
    editAction (index, row) {
      this.$router.push({ name: 'EditRole', params: { id: row.id } })
    },
    viewAction (index, row) {
      this.$router.push({ name: 'ViewRole', params: { id: row.id } })
    },
    deleteAction (index, row) {
      console.log(index, row)
    },
    formatDateTime (row, column) {
      return moment(column).format('LL')
    }
  },

  async created () {
    const rolesAndPermissions = await api.getRolesAndPermissions(this.$store.getters.getAuthToken)

    if (rolesAndPermissions.status === 200) {
      this.roles = rolesAndPermissions.data.data.roles
      this.loading = false
    }
  }
}
</script>
