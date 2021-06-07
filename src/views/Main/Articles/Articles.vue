<template>
  <div class="container">
    <div class="content">
      <div class="feed-body">
        <div class="feed">
          <div class="feed-title">
            <div class="content-title">
              <h1>Все статьи</h1>
            </div>
            <div class="feed-title-actions">
              <router-link class="button-main"
              :to="{ name: 'CreateArticle'}
              ">Создать</router-link>
              <button class="search-button" type="submit"><img class="search" src="/img/search.svg"></button>
              <input v-model="request.searchText" @keyup.enter="search" @change="checkEmptySearch" class="input-search" placeholder="Поиск..." type="search">
            </div>
          </div>
          <div class="content-settings">
            <details v-if="this.categories.length != 0" class="filter" @click="openCloseFilterSort()">
                <summary>
                    <div class="filter_block">
                        <p>Фильтровать</p>
                    </div>
                </summary>
                <div class="filter_box">
                <details class="filter-part">
                    <summary class="filter-title">По категории</summary>
                    <ul class="filter_list">
                        <li class="filter_item"
                            v-for="category in this.categories"
                            :key='category.id'>
                            <div class="checkbox">
                                <input v-model='category.value' type="checkbox" :id='category.id' :name='category.name'>
                                <label :for='category.id'>{{ category.name }}</label>
                            </div>
                        </li>
                    </ul>
                </details>
                <div class="filter-buttons">
                  <button type="submit" id="submit-filter" @click="submitFilter()">
                      <svg width="30" height="30" viewBox="0 0 330 330" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M226.872 106.664L142.018 191.517L103.128 152.626C97.271 146.769 87.773 146.768 81.915 152.625C76.057 158.483 76.057 167.98 81.915 173.838L131.411 223.336C134.224 226.149 138.039 227.73 142.017 227.73C142.018 227.73 142.017 227.73 142.018 227.73C145.996 227.73 149.811 226.149 152.624 223.337L248.085 127.878C253.943 122.02 253.943 112.523 248.085 106.665C242.227 100.807 232.73 100.806 226.872 106.664Z" fill="#A4A4A5"/>
                      </svg>
                  </button>
                  <button type="submit" id="close-filter">
                    <svg id="close-filter" width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.9286 35.7143C33.4716 35.7143 33.0146 35.54 32.6659 35.191L14.8089 17.334C14.1112 16.6363 14.1112 15.5064 14.8089 14.809C15.5063 14.1117 16.6365 14.1113 17.3339 14.809L35.1909 32.666C35.8886 33.3637 35.8886 34.4936 35.1909 35.191C34.8422 35.54 34.3856 35.7143 33.9286 35.7143Z" fill="#A4A4A5"/>
                        <path d="M16.0712 35.7144C15.6142 35.7144 15.1576 35.54 14.8089 35.191C14.1112 34.4936 14.1112 33.3634 14.8089 32.666L32.6659 14.809C33.3636 14.1113 34.4935 14.1113 35.1909 14.809C35.8882 15.5064 35.8886 16.6367 35.1909 17.334L17.3339 35.191C16.9852 35.54 16.5282 35.7144 16.0712 35.7144Z" fill="#A4A4A5"/>
                    </svg>
                  </button>
                </div>
                </div>
            </details>
            <details class="sort" @click="openCloseFilterSort()">
                <summary>
                    <div class="sort_block">
                        <p>Сортировать</p>
                    </div>
                </summary>
                <div class="sort_box">
                  <div class="sort-part">
                    <p class="sort-label">Выберите один параметр</p>
                  </div>
                  <div class="sort-part">
                    <label class="sort-label" for="date">По дате</label>
                    <el-select v-model="request.sort.date" id="date" placeholder="Выберите">
                      <el-option value="" label="-">-
                      </el-option>
                      <el-option value="desc" label="От новых к старым">От новых к старым
                      </el-option>
                      <el-option value="asc" label="От старых к новым">От старых к новым
                      </el-option>
                    </el-select>
                  </div>
                  <!-- <div class="sort-part">
                    <label class="sort-label" for="rating">По рейтингу</label>
                    <el-select v-model="request.sort.rating" id="rating" placeholder="Выберите">
                      <el-option value="" label="-">-
                      </el-option>
                      <el-option value="asc" label="От наибольшего к наименьшему">От наибольшего к наименьшему
                      </el-option>
                      <el-option value="desc" label="От наименьшего к наибольшему">От наименьшего к наибольшему
                      </el-option>
                    </el-select>
                  </div> -->
                  <div class="sort-part">
                    <label class="sort-label" for="views">По просмотрам</label>
                    <el-select v-model="request.sort.views" id="views" placeholder="Выберите">
                      <el-option value="" label="-">-
                      </el-option>
                      <el-option value="asc" label="От наибольших к наименьшим">От наибольших к наименьшим
                      </el-option>
                      <el-option value="desc" label="От наименьших к наибольшим">От наименьших к наибольшим
                      </el-option>
                    </el-select>
                  </div>
                  <div class="filter-buttons">
                      <button type="submit" id="submit-sort" @click="submitSort()">
                          <svg width="30" height="30" viewBox="0 0 330 330" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M226.872 106.664L142.018 191.517L103.128 152.626C97.271 146.769 87.773 146.768 81.915 152.625C76.057 158.483 76.057 167.98 81.915 173.838L131.411 223.336C134.224 226.149 138.039 227.73 142.017 227.73C142.018 227.73 142.017 227.73 142.018 227.73C145.996 227.73 149.811 226.149 152.624 223.337L248.085 127.878C253.943 122.02 253.943 112.523 248.085 106.665C242.227 100.807 232.73 100.806 226.872 106.664Z" fill="#A4A4A5"/>
                          </svg>
                      </button>
                      <button type="submit" id="close-sort">
                        <svg id="close-filter" width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M33.9286 35.7143C33.4716 35.7143 33.0146 35.54 32.6659 35.191L14.8089 17.334C14.1112 16.6363 14.1112 15.5064 14.8089 14.809C15.5063 14.1117 16.6365 14.1113 17.3339 14.809L35.1909 32.666C35.8886 33.3637 35.8886 34.4936 35.1909 35.191C34.8422 35.54 34.3856 35.7143 33.9286 35.7143Z" fill="#A4A4A5"/>
                            <path d="M16.0712 35.7144C15.6142 35.7144 15.1576 35.54 14.8089 35.191C14.1112 34.4936 14.1112 33.3634 14.8089 32.666L32.6659 14.809C33.3636 14.1113 34.4935 14.1113 35.1909 14.809C35.8882 15.5064 35.8886 16.6367 35.1909 17.334L17.3339 35.191C16.9852 35.54 16.5282 35.7144 16.0712 35.7144Z" fill="#A4A4A5"/>
                        </svg>
                      </button>
                  </div>
                </div>
            </details>
          </div>
          <div class="vacancies-feed">
            <div v-if="loading" class="mini_loading">
              <img src="/img/preloader.svg" alt="Загрузка данных">
            </div>
            <div v-else>
              <div v-if="this.articles.length === 0">
                <p>Ничего не найдено</p>
              </div>
              <ArticleBase
                v-else
                v-for="(article, index) in this.articles"
                :key='index'
                v-bind:article="article"
                v-bind:index="index"
                v-on:articleUpdated="updateArticle"
              />
            </div>
          </div>
        </div>
        <div class="advisory">
          <div class="advisory-block">
            <h4>Лучшие авторы</h4>
            <div class="ad-vacancy">
              <div class="ad-vacancy-info">
                  <p class="vacancy-employer">Имя автора</p>
                  <p class="vacancy-сount"><span class="pink">35</span> статей</p>
              </div>
            </div>
            <div class="ad-vacancy">
              <div class="ad-vacancy-info">
                  <p class="vacancy-employer">Имя автора</p>
                  <p class="vacancy-сount"><span class="pink">35</span> статей</p>
              </div>
            </div>
            <div class="ad-vacancy">
              <div class="ad-vacancy-info">
                  <p class="vacancy-employer">Имя автора</p>
                  <p class="vacancy-сount"><span class="pink">35</span> статей</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="this.total"
          :page-size="this.per_page"
          :current-page="this.current_page"
          @current-change="changePage"
          @prev-click="changePage"
          @next-click="changePage"
          >
        </el-pagination>
      </div>
    </div>
  </div>
</template>



<script>
import moment from 'moment'
import ArticleBase from '@/components/ArticleBase'
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  components: {
    ArticleBase
  },

  data: () => ({
    loading: true,
    request: {
      sort: {
        date: null,
        views: null,
      },
      filter: {
        categories: {},
      },
      searchText: ''
    },
    articles: [],
    categories: [],
    current_page: null,
    last_page: null,
    total: null,
    per_page: null,
  }),

  methods: {
    ...mapActions(['getArticles', 'getCategories']),
    async search () {
      this.loading = true;
      this.articles = await this.getArticles(this.request);
      this.loading = false;
    },
    async checkEmptySearch () {
      if (this.request.searchText.length === 0) {
        this.loading = true;
        this.articles = await this.getArticles(this.request);
        this.loading = false;
      }
    },
    openCloseFilterSort () {
      const filter = document.querySelector(".filter");
      const sort = document.querySelector(".sort");
      const closeFilter = document.querySelector("#close-filter");
      const submitFilter = document.querySelector("#submit-filter");
      const closeSort = document.querySelector("#close-sort");
      const submitSort = document.querySelector("#submit-sort");
      if (filter !== null) {
        filter.addEventListener("click", function (event) {
            if (sort.hasAttribute('open')) {
                sort.removeAttribute('open');
            }
        });
        closeFilter.addEventListener("click", function (event) {
          filter.removeAttribute("open");
        });
        submitFilter.addEventListener("click", function (event) {
          filter.removeAttribute("open");
        });
      }

      if (sort !== null) {
        sort.addEventListener("click", function (event) {
            if (filter.hasAttribute('open')) {
                filter.removeAttribute('open');
            }
        });
        closeSort.addEventListener("click", function (event) {
          sort.removeAttribute("open");
        });

        submitSort.addEventListener("click", function (event) {
          sort.removeAttribute("open");
        });
      }
    },
    async submitSort() {
      console.log(this.request.sort);
      this.articles = await this.getArticles(this.request);
    },
    async submitFilter() {
      this.loading = true;

      const categories = {};
      this.categories.forEach(function(category){
        categories[category.id] = category.value;
      })
      this.request.filter.categories = categories;
      const response = await this.getArticles(this.request);
      this.setData(response);

      this.loading = false;
    },
    updateArticle(article, index){
      this.loading = true;
      this.articles[index] = article;
      this.loading = false;
    },
    async changePage(page){
      this.loading = true;
      const response = await this.getArticles({
        page: page,
      });
      this.setData(response);
      this.loading = false;
    },
    setData(response){
      this.articles = response.data;
      this.current_page = response.current_page;
      this.last_page = response.last_page;
      this.total = response.total;
      this.per_page = response.per_page;
    }
  },

  async created () {
    const response = await this.getArticles();
    this.setData(response);

    const categories = await this.getCategories();
    categories.forEach(function(category , index) {
      categories[index].value = false;
    })
    this.categories = categories;

    this.loading = false;
  },
}

</script>
