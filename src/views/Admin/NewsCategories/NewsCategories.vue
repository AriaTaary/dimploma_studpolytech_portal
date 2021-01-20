<template>
  <div class="admin-content">
    <div class="admin-content-top">
      <h2>Все категории новостей</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-table v-else
        :data="newsCategories.filter(
          data => !search
          || data.name.toLowerCase().includes(search.toLowerCase())
          || data.slug.toLowerCase().includes(search.toLowerCase())
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
          min-width="200"
          sortable>
        </el-table-column>
        <el-table-column
          prop="slug"
          label="URL-формат"
          min-width="110">
        </el-table-column>
         <el-table-column
          prop="created_at"
          label="Дата создания"
          min-width="110">
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
    newsCategories: [
      {
        id: '',
        name: '',
        created_at: '',
        slug: ''
      }
    ]
  }),
  methods: {
    editAction (index, row) {
      this.$router.push({ name: 'EditNewsCategory', params: { id: row.id } })
    },
    async deleteAction (index, row) {
      await api.deleteNewsCategory(this.$store.getters.getAuthToken, row.id)

      this.loading = true

      const newsCategories = await api.getNewsCategories(this.$store.getters.getAuthToken)

      this.newsCategories = newsCategories.data
      this.loading = false
    },
    formatDateTime (row, column) {
      return moment(column).format('LL')
    }
  },

  async created () {
    const newsCategories = await api.getNewsCategories(this.$store.getters.getAuthToken)

    this.newsCategories = newsCategories.data
    this.loading = false
  }
}
</script>
