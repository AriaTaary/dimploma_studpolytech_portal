<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Изменение данных статьи</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading-main">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form>

          <el-form-item prop="title">
            <label class="label" for="title">Автор</label>
            <el-input id="title" type="text" class="input" placeholder="Введите автора" v-model="article.author" disabled></el-input>
          </el-form-item>

          <el-form-item prop="title">
            <label class="label" for="title">Название</label>
            <el-input id="title" type="text" class="input" placeholder="Введите название" v-model="formData.title"></el-input>
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

          <el-form-item prop="cut">
            <label class="label" for="cut">Превью</label>
            <el-input id="cut" type="text" class="input" placeholder="Введите превью" v-model="formData.cut"></el-input>
          </el-form-item>

          <el-form-item prop="text">
            <label class="label" for="text">Текст</label>
            <el-input id="text"  type="textarea" :rows="10" class="input" placeholder="Введите текст" v-model="formData.text"></el-input>
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
    categories: [],
    formData: {
      categories: [],
      title: '',
      text: '',
      cut: '',
      source: '',
    },
    article: {},
    request: {},
  }),

  async created () {
    const article = await api.getArticle(this.$store.getters.getAuthToken, this.$route.params.id)
    this.article = article.data.data

    this.article.author = article.data.data.author.username

    let defaultCategories = await this.getCategories();
    this.categories = []
    for (const category of defaultCategories) {
      this.categories.push({
        id: category.id,
        name: category.name
      })
    }

    for (const category of article.data.data.categories) {
      this.formData.categories.push(category.id)
    }

    this.formData.title = this.article.title;
    this.formData.text = this.article.text;
    this.formData.cut = this.article.cut;
    this.formData.source = this.article.source;

    console.log(this.formData);

    this.loading = false
  },
  methods: {
     ...mapActions(['getCategories']),
    // async submitForm (formName) {
    //   let validation = false

    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       validation = true
    //     }
    //   })

    //   if (validation) {
    //     await api.updateAdminArticle (this.$store.getters.getAuthToken, this.article)

    //     alert('Данные успешно сохранены!')

    //     this.$router.push({ name: 'ArticlesAdmin' })
    //   }
    // },
    async submit(){
      this.loading = true;
      const formData = new FormData();
      console.log(this.formData.categories);
      formData.append('title', this.formData.title);
      formData.append('text', this.formData.text);
      formData.append('cut', this.formData.cut);
      formData.append('source', this.formData.source);
      formData.append('categories', this.formData.categories);
      if (this.$refs.upload.uploadFiles.length !== 0 ){
        formData.append('image', this.$refs.upload.uploadFiles[0].raw);
      }

      this.request.id = this.article.id;
      this.request.formData = formData;

      const response = await api.updateAdminArticle (this.$store.getters.getAuthToken, this.request)
      if (response.status === 400){
        this.loading = false;
      }
      if (response.status === 200){
        alert('Данные успешно сохранены!');
        this.$router.push({ name: 'ArticlesAdmin' })
      }
    }
  }
}
</script>
