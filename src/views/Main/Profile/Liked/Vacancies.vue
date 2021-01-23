<template>
  <div class="container">
    <div class="content content-profile">
      <div class="content-nav">
        <div class="content-title fav-title">
          <h1>Понравившeеся:</h1>
          <a class="not-active-title" href="/personal/liked/articles">Статьи</a>
          <a href="/personal/liked/vacancies">Вакансии</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
moment.locale('ru')
// export default {
//   data: () => ({
//     loading: false
//   })
// }

export default {
  data: () => ({
    loading: true,
    search: '',
    article:{
        id: '',
        author: '',
        title: 'Название',
        cut: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
  }),

  methods: {
      editAction () {
        this.$router.push({ name: 'PersonalEdit' })
      }
  }
}

//const age = moment(this.user.date_birth, "YYYYMMDD").fromNow();
</script>
