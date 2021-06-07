<template>
<div class="content">
    <div class="container">
      <div class="news-main">
        <p class="news-main-date">25.05.10</p>
        <h2 class="news-main-title">Заголовок</h2>
        <img src="/img/news.jpeg" alt="">
        <p class="news-main-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto minima modi consectetur veniam. Illo unde ab quasi dicta, ducimus doloremque blanditiis voluptatem quia corrupti consectetur eveniet a corporis magni nam.</p>
        <div class="news-button">
          <router-link
            class="button-not-main"
            :to="{ name: 'Main' }">
            << На главную
          </router-link>
        </div>
      </div>
  </div>
</div>
</template>
