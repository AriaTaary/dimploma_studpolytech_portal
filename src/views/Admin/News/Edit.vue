<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Изменение данных новости</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="news" :model="news" :rules="rules">

          <el-form-item prop="title">
            <label class="label" for="title">Название</label>
            <el-input id="title" type="text" class="input" placeholder="Введите название" v-model="formData.title"></el-input>
          </el-form-item>

          <el-form-item prop="cut">
            <label class="label" for="cut">Превью</label>
            <el-input id="cut" type="text" class="input" placeholder="Введите превью" v-model="formData.cut"></el-input>
          </el-form-item>

          <el-form-item prop="text">
            <label class="label" for="text">Текст</label>
            <el-input id="text" type="textarea" :rows="10" class="input" placeholder="Введите текст" v-model="formData.text"></el-input>
          </el-form-item>

          <el-form-item prop="image">
              <label class="required-label label" for="image">Изображение</label>
              <el-upload
                class="upload"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary"><p class="button-text">Выберите файл</p></el-button>
                <div class="el-upload__tip" slot="tip">Поддерживаемые форматы: jpg/jpeg/png/gif</div>
              </el-upload>
            </el-form-item>

          <el-form-item prop="categories">
            <label class="label" for="categories">Категории</label>
              <el-select id="categories" class="form-item-select" placeholder="Выберите категории" multiple v-model="formData.categories">
              <el-option
                v-for="category in this.categories"
                :key="category.id"
                :value="category.id"
                :label="category.name"
              >{{ category.name }}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="one-button-row">
            <el-button class="button-save" type="primary" @click="submit">Сохранить</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/network/api'
import moment from 'moment'
import {mapActions} from 'vuex'
moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    search: '',
    selectedCategories: [],
    request: {},
    news: {},
    categories: [
      {
        id: '',
        name: ''
      }
    ],
    formData: {
      title: '',
      cut: '',
      text: '',
      categories: []
    },
    rules: {
      title: [
        {
          required: true,
          message: 'Это поле обязательно к заполнению',
          trigger: 'blur'
        }
      ],
      cut: [
        {
          required: true,
          message: 'Это поле обязательно к заполнению',
          trigger: 'blur'
        }
      ],
      text: [
        {
          required: true,
          message: 'Это поле обязательно к заполнению',
          trigger: 'blur'
        }
      ]
    }
  }),
  methods: {
    ...mapActions(['updateAdminNews', 'getNewsCategories']),
    // async submitForm (formName) {
    //   let validation = false

    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       validation = true
    //     }
    //   })

    //   if (validation) {
    //     this.news.categories = this.selectedCategories
    //     await api.updateAdminNews(this.$store.getters.getAuthToken, this.news)

    //     alert('Данные успешно сохранены!')

    //     this.$router.push({ name: 'NewsAdmin' })
    //   }
    // },
    async submit(){
      this.loading = true;
      const formData = new FormData();
      formData.append('title', this.formData.title);
      formData.append('text', this.formData.text);
      formData.append('cut', this.formData.cut);
      formData.append('categories', this.formData.categories);
      if (this.$refs.upload.uploadFiles.length !== 0 ){
        formData.append('image', this.$refs.upload.uploadFiles[0].raw);
      }
      this.request.formData = formData;
      this.request.id = this.news.id;
      const response = await this.updateAdminNews(this.request);
      if (response) {
        alert('Данные успешно сохранены!');
        this.$router.push({ name: 'ViewNews', params: { id: response.id } });
      }
    }
  },
  async created () {
    const news = await api.getNewsData(this.$store.getters.getAuthToken, this.$route.params.id)
    this.news = news.data.data

    // this.formData.categories = this.news.categories;
    this.formData.title = this.news.title;
    this.formData.text = this.news.text;
    this.formData.cut = this.news.cut;

    let defaultCategories = await api.getNewsCategories(this.$store.getters.getAuthToken)
    this.categories = []
    for (const category of defaultCategories.data.data) {
      this.categories.push({
        id: category.id,
        name: category.name
      })
    }

    for (const category of news.data.data.categories) {
      this.formData.categories.push(category.id)
    }

    this.loading = false
  },
}
</script>
