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
              <button class="button-main">Создать</button>
              <button class="search-button" type="submit"><img class="search" src="/img/search.svg"></button>
              <input class="input-search" placeholder="Поиск..." type="search">
            </div>
          </div>
          <div class="content-settings">
            <p class="filter">Фильтровать</p>
            <p class="sort">Сортировать</p>
          </div>
          <div class="vacancies-feed">
            <div class="vacancy-block">
              <div class="card-info">
                <div class="card-about-info">
                  <p class="author">@company</p>
                  <p>01.01.21</p>
                </div>
                <div class="card-categories">
                  <p class="mini-hover">
                    JavaScript
                  </p>
                </div>
                <div class="card-main-info">
                  <div class="card-main-info-title">
                    <h2>Заголовок</h2>
                    <p>Сумма</p>
                  </div>
                  <p class="card-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque est nisi doloribus eius sequi delectus! Sit minus ad et corporis eveniet quis ea sint? Nemo vitae hic dolores esse dolor?</p>
                  <div class="row-group">
                    <button class="button-main" @click="editAction ()">Откликнуться</button>
                    <button class="button-favourite" @click="editAction ()">Добавить в избранное</button>
                  </div>
                  <!-- TODO: блок сохранений и просмотров на вакансии
                  <div class="ratings">
                    <div class="views">
                      <img src="/img/view.svg" alt="">
                      <span>{{ this.article.views }}</span>
                    </div>
                    <div class="likes">
                      <img src="/img/like.svg" alt="">
                      <span>{{ this.article.views }}</span>
                    </div>
                    <div class="bookmarks">
                      <img src="/img/bookmark.svg" alt="">
                      <span>{{ this.article.views }}</span>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="advisory">
          <div class="advisory-block">
            <h4>Возможные вакансии</h4>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название вакансии</p>
              <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
              </div>
            </div>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название вакансии</p>
              <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
              </div>
            </div>
            <div class="ad-vacancy">
              <p class="vacancy-name">Название вакансии</p>
              <div class="ad-vacancy-info">
                  <p class="vacancy-company">Название компании</p>
                  <p class="vacancy-price">Сумма</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
