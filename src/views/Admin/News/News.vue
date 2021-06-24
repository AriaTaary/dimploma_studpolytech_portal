<template>
  <div class="admin-content">
    <div class="admin-content-top">
      <h2>Все новости</h2>
      <router-link class="button-main admin-button-main"
              :to="{ name: 'CreateNews'}
              ">Создать</router-link>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-table v-else
        :data="news.filter(
          data => !search
          || data.title.toLowerCase().includes(search.toLowerCase())
          || data.cut.toLowerCase().includes(search.toLowerCase())
        )"
        :default-sort = "{prop: 'id', order: 'descending'}"
        style="width: 100%"
        max-height="700">
        <el-table-column
          prop="id"
          label="id"
          min-width="50"
          sortable>
        </el-table-column>
        <el-table-column
          prop="title"
          label="Название"
          min-width="250"
          sortable>
          <template slot-scope="scope">
          <router-link :to="{ name: 'ViewNews', params: { id: scope.row.id } }" class="link-admin">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="cut"
          label="Превью"
          min-width="250">
        </el-table-column> -->
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
    news: [
      {
        id: '',
        title: '',
        cut: '',
        text: '',
        created_at: '',
        categories: [
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
      this.$router.push({ name: 'EditNews', params: { id: row.id } })
    },
    viewAction (index, row) {
      this.$router.push({ name: 'ViewNews', params: { id: row.id } })
    },
    async deleteAction (index, row) {
      const result = await api.deleteAdminNews(this.$store.getters.getAuthToken, row.id);

      if (result.status === 204) {
          this.loading = true
          const news = await api.getNews(this.$store.getters.getAuthToken)
          this.news = news.data.data
          alert('Данные успешно удалены.')
          this.loading = false
      } else {
        alert('При удалении данных произошла ошибка.')
      }
    },
    formatDateTime (row, column) {
      return moment(column).format('LLL')
    },
  },

  async created () {
    const news = await api.getNews(this.$store.getters.getAuthToken)

    this.news = news.data.data
    this.loading = false
  }
}
</script>
