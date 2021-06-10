<template>
  <div class="container">
    <div class="content">
      <div class="feed-body">
        <div class="feed">
          <div class="vacancy-feed">
            <div class="vacancy-block edit-block">
            <h1 class="vacancy-title">Создание статьи</h1>
            <div v-if="loading" class="loading">
              <img src="/img/preloader.svg" alt="Загрузка данных">
            </div>
            <el-form v-else>
                <div>

                <el-form-item prop="name">
                  <label class="required-label label" for="name">Название</label>
                  <el-input id="name" type="text" class="input" placeholder="Введите название" v-model="formData.title"></el-input>
                  <p class="error-message"
                    v-if="this.errors.hasOwnProperty('title')"
                  >{{this.errors.title[0]}}</p>
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
                  <p class="error-message"
                    v-if="this.errors.hasOwnProperty('image')"
                  >{{this.errors.image[0]}}</p>
                </el-form-item>

                <el-form-item prop="description">
                  <label class="required-label label" for="description">Текст</label>
                  <el-input
                    id="description"
                    type="textarea"
                    :rows="10"
                    placeholder="Введите описание"
                    v-model="formData.text"
                    >
                  </el-input>
                  <p class="error-message"
                    v-if="this.errors.hasOwnProperty('description')"
                  >{{this.errors.description[0]}}</p>
                </el-form-item>

                <el-form-item prop="cut_description">
                  <label class="required-label label" for="cut_description">Превью</label>
                  <el-input
                    id="cut_description"
                    type="textarea"
                    :rows="3"
                    placeholder="Введите описание"
                    v-model="formData.cut"
                    >
                  </el-input>
                  <p class="error-message"
                    v-if="this.errors.hasOwnProperty('cut')"
                  >{{this.errors.cut[0]}}</p>
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
                  <p class="error-message"
                    v-if="this.errors.hasOwnProperty('categories')"
                  >{{this.errors.categories[0]}}</p>
                </el-form-item>

                <el-form-item prop="site">
                  <label class="label" for="site">Ссылка на источник</label>
                  <el-input id="site" type="text" class="input" placeholder="Введите ссылку на сайт" v-model="formData.source"></el-input>
                  <p class="error-message"
                    v-if="this.errors.hasOwnProperty('site')"
                  >{{this.errors.site[0]}}</p>
                </el-form-item>

                </div>

              <el-form-item class="one-button-row-profile">
                <el-button class="button-save" type="primary" @click="submit">Создать</el-button>
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
import {mapActions} from 'vuex'
import prepareDate from "@/helpers/prepareDate"

export default {
  data: () => ({
    categories: [],
    errors: {},
    selectedCategories: [],
    loading: true,
    formData: {
      categories: [],
      title: '',
      text: '',
      cut: '',
      source: '',
    },
  }),
  methods:{
    ...mapActions(['createArticle','getCategories']),
    async submit(){
      this.loading = true;
      const formData = new FormData();
      formData.append('title', this.formData.title);
      formData.append('text', this.formData.text);
      formData.append('cut', this.formData.cut);
      formData.append('source', this.formData.source);
      formData.append('categories', this.formData.categories);
      if (this.$refs.upload.uploadFiles.length !== 0 ){
        formData.append('image', this.$refs.upload.uploadFiles[0].raw);
      }

      const response = await this.createArticle(formData);
      console.log(response);
      if (response.status === 400){
        this.errors = response.data.error.errors;
        this.loading = false;
      }
      if (response.status === 201){
        const newResponse = prepareDate.article(response.data.data);
        alert('Данные успешно сохранены!');
        this.$router.push({ name: 'ArticleView', params: { id: newResponse.id } });
      }
    }
  },
  async created () {
    this.categories = await this.getCategories();
    this.loading = false;
  },
}
</script>
