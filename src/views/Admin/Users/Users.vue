<template>
  <div class="admin-content">
    <div class="admin-content-top">
      <h2>Все пользователи</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-table
        v-else
        :data="users.filter(
          data => !search
          || data.email.toLowerCase().includes(search.toLowerCase())
          || data.last_name.toLowerCase().includes(search.toLowerCase())
          || data.first_name.toLowerCase().includes(search.toLowerCase())
          || data.middle_name.toLowerCase().includes(search.toLowerCase())
        )"
        :default-sort = "{prop: 'created_at', order: 'ascending'}"
        style="width: 100%"
        max-height="700"
        >

        <el-table-column
          prop="email"
          label="Email"
          min-width="200"
          sortable>
          <template slot-scope="scope">
          <router-link :to="{ name: 'ViewUser', params: { id: scope.row.id } }" class="link-admin">{{ scope.row.email }}</router-link>
          </template>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="Телефон"
          min-width="150"
          sortable>
        </el-table-column>
        <el-table-column
          prop="last_name"
          label="Фамилия"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="first_name"
          label="Имя"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="middle_name"
          label="Отчество"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Дата регистрации"
          min-width="160"
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
          <template slot-scope="scope">
            <div class="operation-buttons">
              <el-button
              size="mini"
              class="button-admin button-change button-view"
              @click="viewAction(scope.$index, scope.row)">Подробнее</el-button>
              <div class="buttons-row">
                <el-button
                size="mini"
                class="button-admin button-change"
                @click="editAction(scope.$index, scope.row)">Изменить</el-button>
                <el-button
                size="mini"
                type="danger"
                class="button-admin button-delete"
                @click="deleteAction(scope.$index, scope.row)">Удалить</el-button>
              </div>
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
    users: [
      {
        id: '',
        email: '',
        created_at: '',
        phone: '',
        last_name: '',
        first_name: '',
        middle_name: '',
        date_birth: '',
        gender: '',
        roles: [
          {
            id: '',
            name: ''
          }
        ],
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
      this.$router.push({ name: 'EditUser', params: { id: row.id } })
    },
    viewAction (index, row) {
      this.$router.push({ name: 'ViewUser', params: { id: row.id } })
    },
    async deleteAction (index, row) {
      const result = await api.deleteUserDataFromAdmin(this.$store.getters.getAuthToken, row.id)

      if (result.status === 200) {
        this.loading = true
        const users = await api.getUsersInAdmin(this.$store.getters.getAuthToken)
        this.users = users.data
        this.loading = false
      } else {
        alert('При удалении данных произошла ошибка.')
      }
    },
    formatDateTime (row, column) {
      return moment(column).format('LL')
    }
  },

  async created () {
    const users = await api.getUsersInAdmin(this.$store.getters.getAuthToken)

    if (users.status !== 200) {
      return null
    }

    this.users = users.data
    const userArray = []

    this.users.forEach(function (user, key, users) {
      user.date_birth = moment(user.date_birth).format('LL')
      userArray.push(user)
    })

    this.users = userArray
    this.loading = false
  }
}
</script>
