<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Создание статьи</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <el-form ref="article" :model="article">
          <!-- <el-form-item prop="title">
            <label class="label" for="title">Название</label>
            <el-input id="title" type="text" class="input" placeholder="Введите название" v-model="article.title"></el-input>
          </el-form-item>

          <el-form-item prop="cut">
            <label class="label" for="cut">Превью</label>
            <el-input id="cut" type="text" class="input" placeholder="Введите превью" v-model="article.cut"></el-input>
          </el-form-item>

          <el-form-item prop="text">
            <label class="label" for="text">Текст</label>
            <el-input id="text" type="text" class="input" placeholder="Введите текст" v-model="article.text"></el-input>
          </el-form-item>

          <el-form-item prop="categories">
            <label class="label" for="categories">Категории</label>
              <el-select id="categories" class="form-item-select" placeholder="Выберите категории" multiple v-model="selectedCategories">
              <el-option
                v-for="category in this.categories"
                :key="category.id"
                :value="category.id"
                :label="category.name"
              >{{ category.name }}</el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item prop="title">
                  <label class="required-label label" for="title">Название</label>
                  <el-input id="title" type="text" class="input" placeholder="Введите название" v-model="formData.title"></el-input>
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

                <el-form-item prop="text">
                  <label class="required-label label" for="text">Текст</label>
                  <el-input
                    id="text"
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

                <el-form-item prop="cut">
                  <label class="required-label label" for="cut">Превью</label>
                  <el-input
                    id="cut"
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
import {mapActions} from 'vuex'
import prepareDate from "@/helpers/prepareDate"

export default {
  data: () => ({
    loading: true,
    categories: [],
    formData: {
      categories: [],
      title: '',
      text: '',
      cut: '',
      source: '',
    },
    errors: {},
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
     ...mapActions(['createAdminArticle', 'getCategories']),
    // async submitForm (formName) {
    //   let validation = false

    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       validation = true
    //     }
    //   })

    //   if (validation) {
    //     await api.createAdminArticle (this.$store.getters.getAuthToken, this.article)

    //     alert('Данные успешно сохранены!')

    //     this.$router.push({ name: 'ArticlesAdmin' })
    //   }
    // }
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

      const response = await this.createAdminArticle(formData);
      if (response.status === 400){
        this.errors = response.data.error.errors;
        this.loading = false;
      }
      if (response.status === 201){
        const newResponse = prepareDate.article(response.data.data);
        alert('Данные успешно сохранены!');
        this.$router.push({ name: 'ViewArticle', params: { id: newResponse.id } });
      }
    }
  },
  async created () {
    this.categories = await this.getCategories();
    this.loading = false;
  },
}
</script>
