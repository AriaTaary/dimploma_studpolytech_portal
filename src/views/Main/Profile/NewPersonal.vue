<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title">
          <h1>Профиль</h1>
        </div>
        <!-- <div class="content-settings">
          <router-link class="button-main" :to="{ name: 'PersonalEdit', params: { username: this.user.username } }">Настройки профиля</router-link>
        </div> -->
      </div>
      <div class="profile-content">
        <div class="personal-info">
          <div class="personal-main-info">
            <div class="avatar">
              <!-- <img class="user" src="/img/main-cover-new.png" alt="students"> -->
              <img class="plug" src="/img/avatar.svg" alt="">
            </div>
            <h3 class="profile-name">Арина Куликова</h3>
            <p>27 августа 1998</p>
          </div>
          <div class="personal-add-info">
            <div class="personal-add-info-block">
              <h5>Специализация</h5>
              <p>Frontend-разработчик</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Навыки</h5>
              <p>Vue.js, Javascript, Figma</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Иностранные языки</h5>
              <p>Английский: B2</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Город</h5>
              <p>Москва</p>
            </div>
          </div>
        </div>
        <div class="personal-add">
          <div class="personal-education">
            <div class="personal-add-info-block">
              <h5>О себе</h5>
            </div>
            <div class="personal-add-info-block">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias neque, animi distinctio doloribus quam nesciunt ab? Aspernatur eligendi nulla nam iure blanditiis delectus, rem odit aliquid! Distinctio adipisci praesentium reiciendis!</p>
            </div>
          </div>
          <h2 class="personal-education-title">Образование</h2>
          <div class="personal-education">
            <div class="personal-add-info-block">
              <h5>Бакалавриат</h5>
              <p>Информатика и вычислительная техника, веб-технологии, 4 курс</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Проекты, выполненные в процессе обучения</h5>
              <ul class="personal-list">
                <li>Politech:One - сайт гоночной команды</li>
                <li>HelpTense - сервис для изучения неправильных глаголов английского языка</li>
                <li>Интернет-магазин OneClick</li>
                <li>TeamPro - сайт для компании</li>
                <li>Студенческий портал Московского Политеха</li>
              </ul>
            </div>
          </div>
          <div class="personal-education">
            <div class="personal-add-info-block">
              <h5>Курсы повышения квалификации</h5>
              <p>GeekBrains</p>
              <p>Frontend-разработчик</p>
            </div>
            <div class="personal-add-info-block">
              <h5>Проекты, выполненные в процессе обучения</h5>
              <ul class="personal-list">
                <li>Politech:One - сайт гоночной команды</li>
                <li>HelpTense - сервис для изучения неправильных глаголов английского языка</li>
                <li>Интернет-магазин OneClick</li>
                <li>TeamPro - сайт для компании</li>
                <li>Студенческий портал Московского Политеха</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
