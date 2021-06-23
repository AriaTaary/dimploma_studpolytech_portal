import Vue from 'vue'
import { store } from '@/store'
import VueRouter from 'vue-router'
import api from '@/network/api'

import Login from '@/views/Auth/Login'
import Register from '@/views/Auth/Register'

import NotFound from '@/views/Errors/404.vue'

import Main from '@/views/Main/Main'
import NewsView from '@/views/Main/NewsView'

import Vacancies from '@/views/Main/Vacancies/Vacancies'
import VacancyView from '@/views/Main/Vacancies/View'
import VacancyCreate from '@/views/Main/Vacancies/Create'
import VacancyEdit from '@/views/Main/Vacancies/Edit'

import Articles from '@/views/Main/Articles/Articles'
import ArticleView from '@/views/Main/Articles/View'
import ArticleCreate from '@/views/Main/Articles/Create'
import ArticleEdit from '@/views/Main/Articles/Edit'

import Personal from '@/views/Main/Profile/Personal'
import ViewForeignProfile from '@/views/Main/ViewForeignProfile'
import PersonalEdit from '@/views/Main/Profile/Edit'
import PersonalEditEducation from '@/views/Main/Profile/EditEducation'
import PersonalVacancies from '@/views/Main/Profile/Vacancies'
import PersonalArticles from '@/views/Main/Profile/Articles'

import PersonalFavouriteArticles from '@/views/Main/Profile/Favourite/Articles'
import PersonalFavouriteVacancies from '@/views/Main/Profile/Favourite/Vacancies'
import PersonalLikedArticles from '@/views/Main/Profile/Liked/Articles'

import Admin from '@/views/Admin/Admin'

import UsersAdmin from '@/views/Admin/Users/Users'
import ViewUser from '@/views/Admin/Users/View'
import EditUser from '@/views/Admin/Users/Edit'

import RolesAdmin from '@/views/Admin/RolesAndPermissions/Roles'
import ViewRole from '@/views/Admin/RolesAndPermissions/RoleView'
import EditRole from '@/views/Admin/RolesAndPermissions/RoleEdit'
import PermissionsAdmin from '@/views/Admin/RolesAndPermissions/Permissions'

import NewsAdmin from '@/views/Admin/News/News'
import EditNews from '@/views/Admin/News/Edit'
import ViewNews from '@/views/Admin/News/View'
import CreateNews from '@/views/Admin/News/Create'

import NewsCategories from '@/views/Admin/NewsCategories/NewsCategories'
import EditNewsCategory from '@/views/Admin/NewsCategories/Edit'
import CreateNewsCategory from '@/views/Admin/NewsCategories/Create'

import ArticlesAdmin from '@/views/Admin/Articles/Articles'
import ViewArticle from '@/views/Admin/Articles/View'
import EditArticle from '@/views/Admin/Articles/Edit'
import CreateArticle from '@/views/Admin/Articles/Create'

import VacanciesAdmin from '@/views/Admin/Vacancies/Vacancies'
import ViewVacancy from '@/views/Admin/Vacancies/View'
import EditVacancy from '@/views/Admin/Vacancies/Edit'
import CreateVacancy from '@/views/Admin/Vacancies/Create'

import Categories from '@/views/Admin/Categories/Categories'
import EditCategory from '@/views/Admin/Categories/Edit'
import CreateCategory from '@/views/Admin/Categories/Create'

Vue.use(VueRouter)

const blocks = {
  common: {
    auth: false
  },
  personal: {
    auth: true,
    role: 'user'
  },
  admin: {
    auth: true,
    role: 'admin'
  }
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      title: 'Главная',
      layout: 'main',
      block: blocks.common
    }
  },
  {
    path: '/news/:id/view',
    name: 'NewsView',
    component: NewsView,
    meta: {
      title: 'Просмотр новости',
      layout: 'main',
      block: blocks.common
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Авторизация',
      layout: 'auth',
      block: blocks.common
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Регистрация',
      layout: 'auth',
      block: blocks.common
    }
  },
  {
    path: '/vacancies',
    name: 'Vacancies',
    component: Vacancies,
    meta: {
      title: 'Вакансии',
      layout: 'vacancies',
      block: blocks.common
    }
  },
  {
    path: '/vacancies/:id/view',
    name: 'VacancyView',
    component: VacancyView,
    meta: {
      title: 'Просмотр вакансии',
      layout: 'vacancies',
      block: blocks.common
    }
  },
  {
    path: '/vacancies/create',
    name: 'VacancyCreate',
    component: VacancyCreate,
    meta: {
      title: 'Создание вакансии',
      layout: 'vacancies',
      block: blocks.common
    }
  },
  {
    path: '/vacancies/:id/edit',
    // path: '/vacancies/edit',
    name: 'VacancyEdit',
    component: VacancyEdit,
    meta: {
      title: 'Изменение вакансии',
      layout: 'vacancies',
      block: blocks.common
    }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
    meta: {
      title: 'Статьи',
      layout: 'articles',
      block: blocks.common
    }
  },
  {
    path: '/articles/:id/view',
    name: 'ArticleView',
    component: ArticleView,
    meta: {
      title: 'Просмотр статьи',
      layout: 'articles',
      block: blocks.common
    }
  },
  {
    // path: '/articles/:id/create',
    path: '/articles/create',
    name: 'ArticleCreate',
    component: ArticleCreate,
    meta: {
      title: 'Создание статьи',
      layout: 'articles',
      block: blocks.common
    }
  },
  {
    path: '/articles/:id/edit',
    name: 'ArticleEdit',
    component: ArticleEdit,
    meta: {
      title: 'Изменение статьи',
      layout: 'articles',
      block: blocks.common
    }
  },
  {
    path: '/users/:username',
    name: 'ViewForeignProfile',
    component: ViewForeignProfile,
    meta: {
      title: 'Просмотр профиля',
      layout: 'main',
      block: blocks.common
    }
  },
  {
    path: '/users/:username',
    name: 'Personal',
    component: Personal,
    meta: {
      title: 'Личный кабинет',
      layout: 'personal',
      block: blocks.personal
    }
  },
  {
    path: '/users/:username/edit',
    name: 'PersonalEdit',
    component: PersonalEdit,
    meta: {
      title: 'Изменение данных аккаунта',
      layout: 'personal',
      block: blocks.personal
    }
  },
  {
    path: '/users/:username/edit/education',
    name: 'PersonalEditEducation',
    component: PersonalEditEducation,
    meta: {
      title: 'Изменение данных образования',
      layout: 'personal',
      block: blocks.personal
    }
  },
  {
    path: '/users/:username/vacancies',
    name: 'PersonalVacancies',
    component: PersonalVacancies,
    meta: {
      title: 'Мои вакансии',
      layout: 'personal',
      block: blocks.personal
    }
  },
  {
    path: '/users/:username/articles',
    name: 'PersonalArticles',
    component: PersonalArticles,
    meta: {
      title: 'Мои статьи',
      layout: 'personal',
      block: blocks.personal
    }
  },
  {
    path: '/users/:username/favourite/articles',
    name: 'PersonalFavouriteArticles',
    component: PersonalFavouriteArticles,
    meta: {
      title: 'Избранные статьи',
      layout: 'personal',
      block: blocks.personal
    }
  },
  {
    path: '/users/:username/favourite/vacancies',
    name: 'PersonalFavouriteVacancies',
    component: PersonalFavouriteVacancies,
    meta: {
      title: 'Избранные вакансии',
      layout: 'personal',
      block: blocks.personal
    }
  },
  {
    path: '/users/:username/liked/articles',
    name: 'PersonalLikedArticles',
    component: PersonalLikedArticles,
    meta: {
      title: 'Понравившиеся статьи',
      layout: 'personal',
      block: blocks.personal
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Админ-панель',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/users',
    name: 'UsersAdmin',
    component: UsersAdmin,
    meta: {
      title: 'Пользователи',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/users/:id/view',
    name: 'ViewUser',
    component: ViewUser,
    meta: {
      title: 'Просмотр пользователя',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/users/:id/edit',
    name: 'EditUser',
    component: EditUser,
    meta: {
      title: 'Изменение пользователя',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/users/roles',
    name: 'RolesAdmin',
    component: RolesAdmin,
    meta: {
      title: 'Роли',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/users/roles/:id/view',
    name: 'ViewRole',
    component: ViewRole,
    meta: {
      title: 'Просмотр ролей',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/users/roles/:id/edit',
    name: 'EditRole',
    component: EditRole,
    meta: {
      title: 'Изменение ролей',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/users/permissions',
    name: 'PermissionsAdmin',
    component: PermissionsAdmin,
    meta: {
      title: 'Разрешения',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/news',
    name: 'NewsAdmin',
    component: NewsAdmin,
    meta: {
      title: 'Новости',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/news/:id/view',
    name: 'ViewNews',
    component: ViewNews,
    meta: {
      title: 'Просмотр новости',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/news/:id/edit',
    name: 'EditNews',
    component: EditNews,
    meta: {
      title: 'Изменение новости',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/news/create',
    name: 'CreateNews',
    component: CreateNews,
    meta: {
      title: 'Создание новости',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/news/categories',
    name: 'NewsCategories',
    component: NewsCategories,
    meta: {
      title: 'Категории новостей',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/news/categories/:id/edit',
    name: 'EditNewsCategory',
    component: EditNewsCategory,
    meta: {
      title: 'Изменение категории новостей',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/news/categories/create',
    name: 'CreateNewsCategory',
    component: CreateNewsCategory,
    meta: {
      title: 'Создание категории новостей',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/articles',
    name: 'ArticlesAdmin',
    component: ArticlesAdmin,
    meta: {
      title: 'Статьи',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/articles/:id/view',
    name: 'ViewArticle',
    component: ViewArticle,
    meta: {
      title: 'Просмотр статьи',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/articles/:id/edit',
    name: 'EditArticle',
    component: EditArticle,
    meta: {
      title: 'Изменение статьи',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/articles/create',
    name: 'CreateArticle',
    component: CreateArticle,
    meta: {
      title: 'Создание статьи',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/vacancies',
    name: 'VacanciesAdmin',
    component: VacanciesAdmin,
    meta: {
      title: 'Вакансии',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/vacancies/:id/view',
    name: 'ViewVacancy',
    component: ViewVacancy,
    meta: {
      title: 'Просмотр вакансии',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/vacancies/:id/edit',
    name: 'EditVacancy',
    component: EditVacancy,
    meta: {
      title: 'Изменение вакансии',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/vacancies/create',
    name: 'CreateVacancy',
    component: CreateVacancy,
    meta: {
      title: 'Создание вакансии',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      title: 'Категории',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/categories/:id/edit',
    name: 'EditCategory',
    component: EditCategory,
    meta: {
      title: 'Изменение категории',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '/admin/categories/create',
    name: 'CreateCategory',
    component: CreateCategory,
    meta: {
      title: 'Создание категории',
      layout: 'admin',
      block: blocks.admin,
      type: 'admin',
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Страница не найдена',
      layout: 'main',
      block: blocks.common
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const auth = to.meta.block.auth
  const authToken = store.getters.getAuthToken
  store.commit('setAccessFail', false)

  if (!auth) {
    return next()
  }

  if (auth && !authToken) {
    next({ name: 'Login' })
  } else if (to.meta.type === 'admin') {
    let roles = store.getters.getRoles;
    store.dispatch('getUserPermissions');
    roles = store.getters.getRoles;

    if (roles.includes('admin')){
      next()
    } else{
      store.commit('setAccessFail')
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title + ' - Студенческий Портал'
  })
})

const helpers = {
  async checkAccess (to, from, next) {
    const auth = to.meta.block.auth
    const authToken = store.getters.getAuthToken

    if (!auth) {
      return next()
    }

    if (auth && !authToken) {
      next({ name: 'Login' })
    } else {
      const needRole = to.meta.block.role
      let roles = await helpers.getRoles()

      if (roles[needRole] === true) {
        next()
      } else {
        // TODO: Сейчас он по сути делает редирект на / и выводит ошибку, а нужно сохранять путь в адресной строке
        next({ name: 'NotFound' })
      }
    }
  },
  async getUserRoles (authToken, userId) {
    return await api.getUserRoles(authToken, userId)
  },
  async getRoles () {
    const roles = await helpers.getUserRoles(store.getters.getAuthToken, store.getters.getUser.id)

    if (roles.status === 304) {
      return store.getters.getRoles
    }

    if (roles.status === 200) {
      let currentRoles = {}

      for (const role of roles.data.roles) {
        currentRoles[role.name] = true
      }

      store.commit('setRoles', currentRoles)
    }

    return store.getters.getRoles
  }
}

export default router
