<template>
  <div class="admin-content">
    <div class="admin-content-top">
      <h2>Все статьи</h2>
      <router-link class="button-main admin-button-main"
        :to="{ name: 'CreateArticle'}
        ">Создать</router-link>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <el-table v-else
        :data="articles.filter(
          data => !search
          || data.title.toLowerCase().includes(search.toLowerCase())
          || data.author.first_name.toLowerCase().includes(search.toLowerCase())
          || data.author.last_name.toLowerCase().includes(search.toLowerCase())
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
          prop="author"
          label="Автор"
          min-width="100"
          sortable>
          <template slot-scope="scope">
            @{{ scope.row.author.username }}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="Название"
          min-width="150"
          sortable>
          <template slot-scope="scope">
          <router-link :to="{ name: 'ViewArticle', params: { id: scope.row.id } }" class="link-admin">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="views"
          label="Просмотры"
          min-width="100"
          sortable>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="Дата создания"
          min-width="110"
          sortable
          :formatter="formatDateTime">
        </el-table-column>
        <el-table-column
          label="Операции"
          width="200">
          <template slot="header" slot-scope="scope">
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
    articles: [
      {
        id: '',
        author: '',
        title: '',
        cut: '',
        text: '',
        created_at: '',
        categories: [
          {
            id: '',
            name: ''
          }
        ],
        views: ''
      }
    ]
  }),
  methods: {
    editAction (index, row) {
      this.$router.push({ name: 'EditArticle', params: { id: row.id } })
    },
    viewAction (index, row) {
      this.$router.push({ name: 'ViewArticle', params: { id: row.id } })
    },
    async deleteAction (index, row) {
      const result = await api.deleteAdminArticle(this.$store.getters.getAuthToken, row.id)

      if (result.status === 204) {
        this.loading = true
        const articles = await api.getArticles(this.$store.getters.getAuthToken)
        this.articles = articles.data.data
        alert('Данные успешно удалены.')
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
    const articles = await api.getArticles(this.$store.getters.getAuthToken);

    this.articles = articles.data.data;
    console.log(articles);
    this.loading = false;
  }
}
</script>
