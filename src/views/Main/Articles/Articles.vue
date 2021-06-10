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
              :to="{ name: 'ArticleCreate'}
              ">Создать</router-link>
              <button class="search-button" type="submit">
                <!-- <img class="search" src="/img/search.svg"> -->
                <svg class="search-svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.8292 14.0045L11.1684 10.3438C12.0784 9.24958 12.6266 7.84447 12.6266 6.31348C12.6266 2.83221 9.79443 0 6.31332 0C2.83213 0 0 2.83221 0 6.31348C0 9.79451 2.83213 12.6265 6.31332 12.6265C7.84424 12.6265 9.24942 12.0784 10.3436 11.1684L14.0045 14.8292C14.1183 14.9431 14.2676 15 14.4168 15C14.566 15 14.7153 14.9431 14.8292 14.8292C15.057 14.6014 15.057 14.2322 14.8292 14.0045ZM1.16638 6.31348C1.16638 3.47536 3.47528 1.16638 6.31332 1.16638C9.15129 1.16638 11.4601 3.47536 11.4601 6.31348C11.4601 9.15137 9.15129 11.4601 6.31332 11.4601C3.47528 11.4601 1.16638 9.15137 1.16638 6.31348Z" fill="#D5444C"/>
                </svg>
              </button>
              <input v-model="request.searchText" @keyup.enter="search" @change="checkEmptySearch" class="input-search" placeholder="Поиск..." type="search">
            </div>
          </div>

          <div class="articles-feed">
            <div v-if="loading" class="loading">
              <img src="/img/preloader.svg" alt="Загрузка данных">
            </div>
            <div v-else>
              <div v-if="this.articles.length === 0">
                <p class="page-error">Ничего не найдено</p>
              </div>
              <div v-else>
                <div class="articles-content-settings">
                  <details class="filter" @click="openCloseFilterSort()">
                      <summary>
                          <div class="filter_block">
                              <p>Фильтровать</p>
                          </div>
                      </summary>
                      <div class="filter_box">
                      <details class="filter-part">
                          <summary class="filter-title">По категории</summary>
                          <p v-if="this.categories.length === 0" class="filter-error">Нет доступных категорий</p>
                          <ul v-else class="filter_list">
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
                <ArticleBase
                  v-for="(article, index) in this.articles"
                  :key='index'
                  v-bind:article="article"
                  v-bind:index="index"
                  v-on:articleUpdated="updateArticle"
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
            <h4>Лучшие авторы (пока не реализовано)</h4>
            <div class="ad-article">
              <div class="ad-article-info">
                  <p class="article-author">Имя автора</p>
                  <p class="article-count"><span class="pink">35</span> статей</p>
              </div>
            </div>
            <div class="ad-article">
              <div class="ad-article-info">
                  <p class="article-author">Имя автора</p>
                  <p class="article-count"><span class="pink">35</span> статей</p>
              </div>
            </div>
            <div class="ad-article">
              <div class="ad-article-info">
                  <p class="article-author">Имя автора</p>
                  <p class="article-count"><span class="pink">35</span> статей</p>
              </div>
            </div>
            <h4>Популярные статьи (пока не реализовано)</h4>
            <div class="ad-article">
              <p class="ad-article-title">Название статьи</p>
              <div class="ad-article-info">
                  <div class="views">
                    <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.3849 7.04225C23.1747 6.75464 18.1652 0 11.7671 0C5.36909 0 0.359361 6.75464 0.149343 7.04197C-0.049781 7.31483 -0.049781 7.6849 0.149343 7.95775C0.359361 8.24536 5.36909 15 11.7671 15C18.1652 15 23.1747 8.24531 23.3849 7.95798C23.5843 7.68517 23.5843 7.31483 23.3849 7.04225ZM11.7671 13.4483C7.05429 13.4483 2.97248 8.96509 1.76417 7.49947C2.97091 6.03256 7.04418 1.55172 11.7671 1.55172C16.4797 1.55172 20.5613 6.03412 21.7701 7.50053C20.5633 8.96739 16.4901 13.4483 11.7671 13.4483Z" fill="black" fill-opacity="0.3"/>
                      <path d="M11.7671 2.84482C9.20031 2.84482 7.11194 4.93319 7.11194 7.50001C7.11194 10.0668 9.20031 12.1552 11.7671 12.1552C14.334 12.1552 16.4223 10.0668 16.4223 7.50001C16.4223 4.93319 14.334 2.84482 11.7671 2.84482ZM11.7671 10.6034C10.0558 10.6034 8.6637 9.21128 8.6637 7.50001C8.6637 5.78875 10.0559 4.39658 11.7671 4.39658C13.4784 4.39658 14.8706 5.78875 14.8706 7.50001C14.8706 9.21128 13.4784 10.6034 11.7671 10.6034Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
                  <div class="likes">
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.8222 1.41007C13.9873 0.512622 12.8173 0.00198696 11.5915 9.39718e-05C10.3647 0.00151372 9.19355 0.511878 8.35732 1.40949L8.07233 1.71065L7.78733 1.40949C6.12802 -0.376375 3.33511 -0.478935 1.54928 1.18037C1.47014 1.25393 1.39372 1.33033 1.32016 1.40949C-0.440053 3.3081 -0.440053 6.2423 1.32016 8.14091L7.6535 14.8198C7.87262 15.0511 8.23776 15.061 8.46908 14.8419C8.47665 14.8348 8.48402 14.8274 8.49118 14.8198L14.8222 8.14091C16.5823 6.24251 16.5823 3.30847 14.8222 1.41007ZM13.9874 7.34649H13.9868L8.07233 13.5846L2.15727 7.34649C0.812567 5.89578 0.812567 3.65404 2.15727 2.20333C3.37842 0.879795 5.44134 0.796807 6.76488 2.01796C6.82914 2.07725 6.89096 2.13907 6.95026 2.20333L7.6535 2.94525C7.88526 3.17552 8.25943 3.17552 8.49118 2.94525L9.19443 2.20391C10.4156 0.880369 12.4785 0.797382 13.802 2.01853C13.8663 2.07782 13.9281 2.13965 13.9874 2.20391C15.3438 3.65692 15.3538 5.90275 13.9874 7.34649Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
                  <div class="bookmarks">
                    <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.87912 0H0.94459C0.42375 0 0 0.42375 0 0.94459V14.4333C0 14.6388 0.111269 14.8281 0.290742 14.9282C0.376699 14.9762 0.471738 15 0.566748 15C0.670283 15 0.773438 14.9718 0.864668 14.9156L4.91297 12.4162L8.96071 14.8974C9.13564 15.0049 9.35499 15.0093 9.53388 14.9088C9.71279 14.8086 9.82368 14.6196 9.82368 14.4144V0.94459C9.82368 0.42375 9.39996 0 8.87912 0ZM8.69019 13.4019L5.20825 11.2674C5.02576 11.1555 4.79604 11.1561 4.61411 11.2683L1.1335 13.4172V1.1335H8.69019V13.4019Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
              </div>
            </div>
            <div class="ad-article">
              <p class="ad-article-title">Название статьи</p>
              <div class="ad-article-info">
                  <div class="views">
                    <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.3849 7.04225C23.1747 6.75464 18.1652 0 11.7671 0C5.36909 0 0.359361 6.75464 0.149343 7.04197C-0.049781 7.31483 -0.049781 7.6849 0.149343 7.95775C0.359361 8.24536 5.36909 15 11.7671 15C18.1652 15 23.1747 8.24531 23.3849 7.95798C23.5843 7.68517 23.5843 7.31483 23.3849 7.04225ZM11.7671 13.4483C7.05429 13.4483 2.97248 8.96509 1.76417 7.49947C2.97091 6.03256 7.04418 1.55172 11.7671 1.55172C16.4797 1.55172 20.5613 6.03412 21.7701 7.50053C20.5633 8.96739 16.4901 13.4483 11.7671 13.4483Z" fill="black" fill-opacity="0.3"/>
                      <path d="M11.7671 2.84482C9.20031 2.84482 7.11194 4.93319 7.11194 7.50001C7.11194 10.0668 9.20031 12.1552 11.7671 12.1552C14.334 12.1552 16.4223 10.0668 16.4223 7.50001C16.4223 4.93319 14.334 2.84482 11.7671 2.84482ZM11.7671 10.6034C10.0558 10.6034 8.6637 9.21128 8.6637 7.50001C8.6637 5.78875 10.0559 4.39658 11.7671 4.39658C13.4784 4.39658 14.8706 5.78875 14.8706 7.50001C14.8706 9.21128 13.4784 10.6034 11.7671 10.6034Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
                  <div class="likes">
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.8222 1.41007C13.9873 0.512622 12.8173 0.00198696 11.5915 9.39718e-05C10.3647 0.00151372 9.19355 0.511878 8.35732 1.40949L8.07233 1.71065L7.78733 1.40949C6.12802 -0.376375 3.33511 -0.478935 1.54928 1.18037C1.47014 1.25393 1.39372 1.33033 1.32016 1.40949C-0.440053 3.3081 -0.440053 6.2423 1.32016 8.14091L7.6535 14.8198C7.87262 15.0511 8.23776 15.061 8.46908 14.8419C8.47665 14.8348 8.48402 14.8274 8.49118 14.8198L14.8222 8.14091C16.5823 6.24251 16.5823 3.30847 14.8222 1.41007ZM13.9874 7.34649H13.9868L8.07233 13.5846L2.15727 7.34649C0.812567 5.89578 0.812567 3.65404 2.15727 2.20333C3.37842 0.879795 5.44134 0.796807 6.76488 2.01796C6.82914 2.07725 6.89096 2.13907 6.95026 2.20333L7.6535 2.94525C7.88526 3.17552 8.25943 3.17552 8.49118 2.94525L9.19443 2.20391C10.4156 0.880369 12.4785 0.797382 13.802 2.01853C13.8663 2.07782 13.9281 2.13965 13.9874 2.20391C15.3438 3.65692 15.3538 5.90275 13.9874 7.34649Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
                  <div class="bookmarks">
                    <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.87912 0H0.94459C0.42375 0 0 0.42375 0 0.94459V14.4333C0 14.6388 0.111269 14.8281 0.290742 14.9282C0.376699 14.9762 0.471738 15 0.566748 15C0.670283 15 0.773438 14.9718 0.864668 14.9156L4.91297 12.4162L8.96071 14.8974C9.13564 15.0049 9.35499 15.0093 9.53388 14.9088C9.71279 14.8086 9.82368 14.6196 9.82368 14.4144V0.94459C9.82368 0.42375 9.39996 0 8.87912 0ZM8.69019 13.4019L5.20825 11.2674C5.02576 11.1555 4.79604 11.1561 4.61411 11.2683L1.1335 13.4172V1.1335H8.69019V13.4019Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
              </div>
            </div>
            <div class="ad-article">
              <p class="ad-article-title">Название статьи</p>
              <div class="ad-article-info">
                  <div class="views">
                    <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.3849 7.04225C23.1747 6.75464 18.1652 0 11.7671 0C5.36909 0 0.359361 6.75464 0.149343 7.04197C-0.049781 7.31483 -0.049781 7.6849 0.149343 7.95775C0.359361 8.24536 5.36909 15 11.7671 15C18.1652 15 23.1747 8.24531 23.3849 7.95798C23.5843 7.68517 23.5843 7.31483 23.3849 7.04225ZM11.7671 13.4483C7.05429 13.4483 2.97248 8.96509 1.76417 7.49947C2.97091 6.03256 7.04418 1.55172 11.7671 1.55172C16.4797 1.55172 20.5613 6.03412 21.7701 7.50053C20.5633 8.96739 16.4901 13.4483 11.7671 13.4483Z" fill="black" fill-opacity="0.3"/>
                      <path d="M11.7671 2.84482C9.20031 2.84482 7.11194 4.93319 7.11194 7.50001C7.11194 10.0668 9.20031 12.1552 11.7671 12.1552C14.334 12.1552 16.4223 10.0668 16.4223 7.50001C16.4223 4.93319 14.334 2.84482 11.7671 2.84482ZM11.7671 10.6034C10.0558 10.6034 8.6637 9.21128 8.6637 7.50001C8.6637 5.78875 10.0559 4.39658 11.7671 4.39658C13.4784 4.39658 14.8706 5.78875 14.8706 7.50001C14.8706 9.21128 13.4784 10.6034 11.7671 10.6034Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
                  <div class="likes">
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.8222 1.41007C13.9873 0.512622 12.8173 0.00198696 11.5915 9.39718e-05C10.3647 0.00151372 9.19355 0.511878 8.35732 1.40949L8.07233 1.71065L7.78733 1.40949C6.12802 -0.376375 3.33511 -0.478935 1.54928 1.18037C1.47014 1.25393 1.39372 1.33033 1.32016 1.40949C-0.440053 3.3081 -0.440053 6.2423 1.32016 8.14091L7.6535 14.8198C7.87262 15.0511 8.23776 15.061 8.46908 14.8419C8.47665 14.8348 8.48402 14.8274 8.49118 14.8198L14.8222 8.14091C16.5823 6.24251 16.5823 3.30847 14.8222 1.41007ZM13.9874 7.34649H13.9868L8.07233 13.5846L2.15727 7.34649C0.812567 5.89578 0.812567 3.65404 2.15727 2.20333C3.37842 0.879795 5.44134 0.796807 6.76488 2.01796C6.82914 2.07725 6.89096 2.13907 6.95026 2.20333L7.6535 2.94525C7.88526 3.17552 8.25943 3.17552 8.49118 2.94525L9.19443 2.20391C10.4156 0.880369 12.4785 0.797382 13.802 2.01853C13.8663 2.07782 13.9281 2.13965 13.9874 2.20391C15.3438 3.65692 15.3538 5.90275 13.9874 7.34649Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
                  <div class="bookmarks">
                    <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.87912 0H0.94459C0.42375 0 0 0.42375 0 0.94459V14.4333C0 14.6388 0.111269 14.8281 0.290742 14.9282C0.376699 14.9762 0.471738 15 0.566748 15C0.670283 15 0.773438 14.9718 0.864668 14.9156L4.91297 12.4162L8.96071 14.8974C9.13564 15.0049 9.35499 15.0093 9.53388 14.9088C9.71279 14.8086 9.82368 14.6196 9.82368 14.4144V0.94459C9.82368 0.42375 9.39996 0 8.87912 0ZM8.69019 13.4019L5.20825 11.2674C5.02576 11.1555 4.79604 11.1561 4.61411 11.2683L1.1335 13.4172V1.1335H8.69019V13.4019Z" fill="black" fill-opacity="0.3"/>
                    </svg>
                    <span>35</span>
                  </div>
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
    total: null,
    per_page: null,
  }),

  methods: {
    ...mapActions(['getArticles', 'getCategories']),
    async search () {
      this.loading = true;
      const response = await this.getArticles(this.request);
      this.setData(response);
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
      this.total = response.total;
      this.per_page = response.per_page;
    }
  },

  async created () {
    const response = await this.getArticles();
    console.log(response);
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
