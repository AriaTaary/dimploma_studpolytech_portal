<template>
  <div class="container">
    <div class="content">
      <div class="feed-body">
        <div class="feed">
          <div class="vacancy-feed">
            <div class="vacancy-block edit-block">
            <h1 class="vacancy-title">Редактирование статьи</h1>
            <div v-if="loading" class="loading">
              <img src="/img/preloader.svg" alt="Загрузка данных">
            </div>
            <el-form v-else>
                <div>

                <el-form-item prop="name">
                  <label class="required-label label" for="name">Название</label>
                  <el-input id="name" type="text" class="input" :placeholder="this.article.title" v-model="formData.title"></el-input>
                </el-form-item>

                <!-- <el-form-item prop="name">
                  <label class="required-label label" for="name">Изображение</label>
                  <el-input type="file" accept="image/jpeg, image/jpg, image/png, image/gif" v-model="formData.image"></el-input>
                </el-form-item> -->

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

                <el-form-item prop="description">
                  <label class="required-label label" for="description">Текст</label>
                  <el-input
                    id="description"
                    type="textarea"
                    :rows="10"
                    :placeholder="this.article.text"
                    v-model="formData.text"
                    >
                  </el-input>
                </el-form-item>

                <el-form-item prop="cut_description">
                  <label class="required-label label" for="cut_description">Превью</label>
                  <el-input
                    id="cut_description"
                    type="textarea"
                    :rows="3"
                    :placeholder="this.article.cut"
                    v-model="formData.cut"
                    >
                  </el-input>
                </el-form-item>

                <el-form-item prop="categories" class="input">
                  <label class="label" for="categories">Категории статьи</label>
                  <el-select
                    class="input"
                    id="categories"
                    placeholder="Выберите"
                    multiple
                    v-model="formData.categories">
                    <el-option
                      class="input"
                      v-for="category in categories"
                      :key='category.id'
                      :value='category.id'
                      :label='category.name'
                      >{{ category.name }}
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="site">
                  <label class="label" for="site">Ссылка на источник</label>
                  <el-input id="site" type="text" class="input" :placeholder="this.article.source" v-model="formData.source"></el-input>
                </el-form-item>

                </div>

              <el-form-item class="one-button-row-profile">
                <el-button class="button-save" type="primary" @click="submit">Сохранить</el-button>
              </el-form-item>

              </el-form>
          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/network/api'
import prepareDate from "@/helpers/prepareDate"
import {mapActions} from 'vuex'

moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    searchText: '',
    count: '',
    loading: true,
    categories: [],
    article:{
        id: '',
        author: '',
        title: '',
        cut: '',
        text: '',
        created_at: '',
        categories: [
          {
            id: '',
            name: ''
          }
        ],
        views: '',
        rating: '',
        saved: ''
      },
    formData: {
      categories: [],
      title: '',
      text: '',
      cut: '',
      source: '',
      image: '',
    },
    request: {
      formData: '',
      id: '',
    }
  }),
  methods:{
    ...mapActions(['updateArticle','getCategories']),
    async submit(){
      this.loading = true;
      const formData = new FormData();
      formData.append('title', this.formData.title);
      formData.append('text', this.formData.text);
      formData.append('cut', this.formData.cut);
      formData.append('source', this.formData.source);
      formData.append('categories', this.formData.categories);
      if (this.$refs.upload.uploadFiles.length !== 0){
        formData.append('image', this.$refs.upload.uploadFiles[0].raw);
      }
      // console.log(formData);
      this.request.formData = formData;
      this.request.id = this.article.id;
      const response = await this.updateArticle(this.request);
      if (response) {
        alert('Данные успешно сохранены!');
        this.$router.push({ name: 'ArticleView', params: { id: response.id } });
      }
    }
  },

  async created () {
    this.categories = await this.getCategories();

    let response = await api.getMainArticle(this.$store.getters.getAuthToken, this.$route.params.id);
    console.log(response);

    if (response.status === 200){
      this.article = prepareDate.article(response.data.data, this.$store.getters.getUser.id);
      this.loading = false;
      this.formData.categories = this.article.categories;
      this.formData.title = this.article.title;
      this.formData.text = this.article.text;
      this.formData.cut = this.article.cut;
      this.formData.source = this.article.source;
      console.log(this.formData);
    }
    else {
      alert("Произошла ошибка");
    }
  }
}

</script>
