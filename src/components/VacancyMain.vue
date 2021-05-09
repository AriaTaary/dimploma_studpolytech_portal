<template>
  <div class="vacancy-block">
    <div class="card-info-view">
      <div class="content-title">
        <div>
            <div class="card-about-info">
              <p class="author">@{{ this.vacancy.author}}</p>
              <p>0{{ this.vacancy.created_at }}</p>
            </div>
            <div class="card-categories">
              <p
              v-for="category in this.vacancy.categories"
              :key='category.id'
              class="mini-hover"
              >
                {{ category.name }}
              </p>
            </div>
          </div>
      </div>
      <div class="card-main-info">
        <div class="card-main-info-title">
          <h1>{{ this.vacancy.title }}</h1>
          <p>{{ this.vacancy.salary }}</p>
        </div>
        <p class="card-description not-main">Москва, Электрозаводская</p>
        <div class="row-group">
          <button class="button-main" @click="editAction ()">Откликнуться</button>
          <button class="button-favourite" @click="editAction ()">Добавить в избранное</button>
        </div>
        <div class="card-text">
          <div class="vacancy-info-block">
            <p>Требуемый опыт работы: 1 год</p>
            <p>Тип занятости: полная занятость, гибкий график</p>
          </div>
          <div class="vacancy-info-block">
            <p>{{ this.vacancy.description }}</p>
          </div>
          <div class="vacancy-info-block">
            <h5>Обязанности:</h5>
            <ul class="vacancy-info-list">
              <li>Поддержка существующих графических интерфейсов (редакторы, личные кабинеты)</li>
              <li>Написание тестов</li>
            </ul>
          </div>
          <div class="vacancy-info-block">
            <h5>Требования:</h5>
            <ul class="vacancy-info-list">
              <li>Знание JavaScript (ES7+), HTML5 и CSS3</li>
              <li>Базовые навыки работы с Git</li>
            </ul>
          </div>
          <div class="vacancy-info-block">
            <h5>Условия:</h5>
            <ul class="vacancy-info-list">
              <li>Оформление по ТК</li>
              <li>Возможность работать как в просторном светлом офисе c фруктами, печеньками,      настольным теннисом в 10 минутах ходьбы от метро Электрозаводская или Бауманская, так и в полностью удалённом режиме</li>
            </ul>
          </div>
          <div class="vacancy-info-block">
            <h5>Адрес:</h5>
            <p>Москва, метро Электрозаводская, Бакунинская улица, 69</p>
            <!-- TODO: ВСТАВИТЬ КАРТУ -->
            <!-- <div class="map">
              <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aa756fad98d6e876a085cf7c47115f4b3d40090e3cc37e850fa7de5fd8c4e1911&amp;width=640&amp;height=240&amp;lang=ru_RU&amp;scroll=true"></script>
            </div> -->
          </div>
          <div class="vacancy-info-block">
            <h5>Контакты:</h5>
            <ul class="vacancy-info-list">
              <li>Телефон: +7 (777) 777 77 77</li>
              <li>Email: work@work.ru</li>
            </ul>
          </div>
        </div>
          <div class="row-group">
          <button class="button-main" @click="editAction ()">Откликнуться</button>
          <button class="button-favourite" @click="editAction ()">Добавить в избранное</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

moment.locale('ru')

export default {
  props: {
    vacancy: Object
  }
}

</script>
