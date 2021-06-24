<template>
  <div class="container">
    <div class="content">
      <div class="feed-body">
        <div class="feed">
          <div class="feed-title">
            <div class="content-title">
              <h1>Все вакансии</h1>
            </div>
            <div class="feed-title-actions">
              <router-link class="button-main"
              v-if="this.$store.getters.getAuthToken"
              :to="{ name: 'VacancyCreate'}
              ">Создать</router-link>
              <div class="search-field">
                <button class="search-button" type="submit">
                <!-- <img class="search" src="/img/search.svg"> -->
                <svg class="search-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.8292 14.0045L11.1684 10.3438C12.0784 9.24958 12.6266 7.84447 12.6266 6.31348C12.6266 2.83221 9.79443 0 6.31332 0C2.83213 0 0 2.83221 0 6.31348C0 9.79451 2.83213 12.6265 6.31332 12.6265C7.84424 12.6265 9.24942 12.0784 10.3436 11.1684L14.0045 14.8292C14.1183 14.9431 14.2676 15 14.4168 15C14.566 15 14.7153 14.9431 14.8292 14.8292C15.057 14.6014 15.057 14.2322 14.8292 14.0045ZM1.16638 6.31348C1.16638 3.47536 3.47528 1.16638 6.31332 1.16638C9.15129 1.16638 11.4601 3.47536 11.4601 6.31348C11.4601 9.15137 9.15129 11.4601 6.31332 11.4601C3.47528 11.4601 1.16638 9.15137 1.16638 6.31348Z" fill="#D5444C"/>
                </svg>
              </button>
              <input v-model="request.searchText" @keyup.enter="search" @change="checkEmptySearch" class="input-search" placeholder="Поиск..." type="search">
              </div>
            </div>
          </div>
          <div class="vacancies-feed">
            <div v-if="loading" class="loading">
              <img src="/img/preloader.svg" alt="Загрузка данных">
            </div>
            <div v-else>
              <div v-if="this.vacancies.length === 0">
                <p class="page-error">Ничего не найдено</p>
              </div>
              <div v-else>
                <div class="vacancies-content-settings">
                  <details class="filter" @click="openCloseFilterSort()">
                      <summary>
                          <div class="filter_block">
                              <p>Фильтровать</p>
                          </div>
                      </summary>
                      <div class="filter_box">
                      <details class="filter-part">
                          <summary class="filter-title">Опыт работы</summary>
                          <ul class="filter_list">
                              <li class="filter_item"
                                  v-for="experience in this.vacanciesData.experiences"
                                  :key='experience.key'>
                                  <div class="checkbox">
                                      <input v-model='experience.value' type="checkbox" :id='experience.key' :name='experience.name'>
                                      <label :for='experience.key'>{{ experience.name }}</label>
                                  </div>
                              </li>
                          </ul>
                      </details>
                      <details class="filter-part">
                          <summary class="filter-title">График работы</summary>
                          <ul class="filter_list">
                              <li class="filter_item"
                                  v-for="schedule in this.vacanciesData.schedules"
                                  :key='schedule.key'>
                                  <div class="checkbox">
                                      <input v-model='schedule.value' type="checkbox" :id='schedule.key'>
                                      <label :for='schedule.key'>{{ schedule.name }}</label>
                                  </div>
                              </li>
                          </ul>
                      </details>
                      <details class="filter-part">
                          <summary class="filter-title">Тип занятости</summary>
                          <ul class="filter_list">
                              <li class="filter_item"
                                  v-for="employment in this.vacanciesData.employments"
                                  :key='employment.key'>
                                  <div class="checkbox">
                                      <input v-model='employment.value' type="checkbox" :id='employment.key'>
                                      <label :for='employment.key'>{{ employment.name }}</label>
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
                          <label class="sort-label" for="experience">По требуемому опыту</label>
                          <el-select v-model="request.sort.experience" id="experience" placeholder="Выберите">
                            <el-option value="" label="-">-
                            </el-option>
                            <el-option value="asc">От наибольшего к наименьшему
                            </el-option>
                            <el-option value="desc">От наименьшего к наибольшему
                            </el-option>
                          </el-select>
                        </div> -->
                        <div class="sort-part">
                          <label class="sort-label" for="payment">По оплате</label>
                          <el-select v-model="request.sort.payment" id="payment" placeholder="Выберите">
                            <el-option value="" label="-">-
                            </el-option>
                            <el-option value="desc" label="От наибольшей к наименьшей">От наибольшей к наименьшей
                            </el-option>
                            <el-option value="asc" label="От наименьшей к наибольшей">От наименьшей к наибольшей
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
                <VacancyBase
                  v-for="(vacancy,index) in this.vacancies"
                  :key='index'
                  v-bind:vacancy="vacancy"
                  v-bind:index="index"
                  v-on:vacancyUpdated="updateVacancy"
                />
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
        </div>
      </div>
      <div class="advisory">
        <div class="advisory-block">
          <h4>Работодатели (пока не реализовано)</h4>
          <div class="ad-vacancy">
            <div class="ad-vacancy-info">
                <p class="vacancy-employer">Название компании</p>
                <p class="vacancy-сount"><span class="pink">35</span> вакансий</p>
            </div>
          </div>
          <div class="ad-vacancy">
            <div class="ad-vacancy-info">
                <p class="vacancy-employer">Название компании</p>
                <p class="vacancy-сount"><span class="pink">35</span> вакансий</p>
            </div>
          </div>
          <div class="ad-vacancy">
            <div class="ad-vacancy-info">
                <p class="vacancy-employer">Название компании</p>
                <p class="vacancy-сount"><span class="pink">35</span> вакансий</p>
            </div>
          </div>
          <div class="ad-vacancy">
            <div class="ad-vacancy-info">
                <p class="vacancy-employer">Название компании</p>
                <p class="vacancy-сount"><span class="pink">35</span> вакансий</p>
            </div>
          </div>
          <div class="ad-vacancy">
            <div class="ad-vacancy-info">
                <p class="vacancy-employer">Название компании</p>
                <p class="vacancy-сount"><span class="pink">35</span> вакансий</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>



<script>
import moment from 'moment'
import VacancyBase from '@/components/VacancyBase'
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  components: {
    VacancyBase
  },

  data: () => ({
    loading: true,
    request: {
      sort: {
        date: null,
        payment: null,
      },
      filter: {
        employments: {},
        experiences: {},
        schedules: {},
      },
      searchText: '',
      paginate: Number(3),
    },
    vacancies: [],
    categories: [],
    vacanciesData: [],
    current_page: null,
    total: null,
    per_page: null,
  }),

  methods: {
    ...mapActions(['getVacancies', 'getVacanciesData']),
    async search () {
      this.loading = true;
      const response = await this.getVacancies(this.request);
      this.setData(response);
      this.loading = false;
    },
    async checkEmptySearch () {
      if (this.request.searchText.length === 0) {
        this.loading = true;
        this.vacancies = await this.getVacancies(this.request);
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
      this.loading = true;
      const response = await this.getVacancies(this.request);
      this.setData(response);
      this.loading = false;
    },
    async submitFilter() {
      this.loading = true;

      const employments = {};
      this.vacanciesData.employments.forEach(function(employment){
        employments[employment.key] = employment.value;
      })
      this.request.filter.employments = employments;

      const experiences = {};
      this.vacanciesData.experiences.forEach(function(experience){
        experiences[experience.key] = experience.value;
      })
      this.request.filter.experiences = experiences;

      const schedules = {};
      this.vacanciesData.schedules.forEach(function(schedule){
        schedules[schedule.key] = schedule.value;
      })
      this.request.filter.schedules = schedules;


      const response = await this.getVacancies(this.request);
      this.setData(response);

      this.loading = false;
    },
    updateVacancy(vacancy, index){
      this.loading = true;
      this.vacancies[index] = vacancy;
      this.loading = false;
    },
    async changePage(page){
      this.loading = true;
      const response = await this.getVacancies({
        page: page,
        paginate: this.request.paginate,
      });
      this.setData(response);
      this.loading = false;
    },
    setData(response){
      this.vacancies = response.data;
      this.current_page = response.current_page;
      this.total = response.total;
      this.per_page = Number(response.per_page);
    }
  },

  async created () {
    const response = await this.getVacancies(this.request);
    console.log(response);
    this.setData(response);

    const vacanciesData = await this.getVacanciesData();

    let vacanciesDataEmployments = [];

    for (var key in vacanciesData.employments){
      vacanciesDataEmployments.push({
        key: key,
        value: false,
        name: vacanciesData.employments[key],
      })
    };

    let vacanciesDataExperiences = [];

    for (var key in vacanciesData.experiences){
      vacanciesDataExperiences.push({
        key: key,
        value: false,
        name: vacanciesData.experiences[key],
      })
    };

    let vacanciesDataSchedules = [];

    for (var key in vacanciesData.schedules){
      vacanciesDataSchedules.push({
        key: key,
        value: false,
        name: vacanciesData.schedules[key],
      })
    };

    this.vacanciesData.employments = vacanciesDataEmployments;
    this.vacanciesData.experiences = vacanciesDataExperiences;
    this.vacanciesData.schedules = vacanciesDataSchedules;

    this.loading = false;

  },
}

</script>
