<template>
  <div class="admin-content admin-content-edit">
    <div class="admin-content-top">
      <h2>Создание новости</h2>
    </div>
    <div class="admin-content-main">
      <div v-if="loading" class="loading">
        <img src="/img/preloader.svg" alt="Загрузка данных">
      </div>

      <div v-else>
        <!-- <el-form :rules="rules"> -->
        <el-form>

          <el-form-item prop="title">
            <label class="label" for="title">Название</label>
            <el-input id="title" type="text" class="input" placeholder="Введите название" v-model="formData.title"></el-input>
            <p class="error-message"
                    v-if="this.errors.hasOwnProperty('title')"
                  >{{this.errors.title[0]}}</p>
          </el-form-item>

          <el-form-item prop="cut">
            <label class="label" for="cut">Превью</label>
            <el-input id="cut" type="text" class="input" placeholder="Введите превью" v-model="formData.cut"></el-input>
            <p class="error-message"
                    v-if="this.errors.hasOwnProperty('cut')"
                  >{{this.errors.cut[0]}}</p>
          </el-form-item>

          <el-form-item prop="text">
            <label class="label" for="text">Текст</label>
            <el-input id="text" type="text" class="input" placeholder="Введите текст" v-model="formData.text"></el-input>
            <p class="error-message"
                    v-if="this.errors.hasOwnProperty('text')"
                  >{{this.errors.text[0]}}</p>
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
              <p class="error-message"
                    v-if="this.errors.hasOwnProperty('image')"
                  >{{this.errors.image[0]}}</p>
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
             <p class="error-message"
                    v-if="this.errors.hasOwnProperty('categories')"
                  >{{this.errors.categories[0]}}</p>
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
import {mapActions} from 'vuex'
import prepareDate from "@/helpers/prepareDate"
import moment from 'moment'
moment.locale('ru')

export default {
  data: () => ({
    loading: true,
    errors: {},
    categories: [],
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
  methods:{
    ...mapActions(['createAdminNews','getNewsCategories']),
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

      const response = await this.createAdminNews(formData);
      console.log(response);
      if (response.status === 400){
        this.errors = response.data.error.errors;
        this.loading = false;
      }
      if (response.status === 201){
        const newResponse = prepareDate.news(response.data.data);
        alert('Данные успешно сохранены!');
        this.$router.push({ name: 'ViewNews', params: { id: newResponse.id } });
      }
    }
  },
  async created () {
    // let defaultCategories = await api.getNewsCategories(this.$store.getters.getAuthToken)
    // this.categories = []
    // for (const category of defaultCategories.data.data) {
    //   this.categories.push({
    //     id: category.id,
    //     name: category.name
    //   })
    // }

    const categories = await this.getNewsCategories();
    categories.forEach(function(category, index) {
      categories[index].value = false;
    })
    this.categories = categories;

    this.loading = false
  },
  // methods: {
  //   async submitForm (formName) {
  //     let validation = false

  //     this.$refs[formName].validate((valid) => {
  //       if (valid) {
  //         validation = true
  //       }
  //     })

  //     if (validation) {
  //       this.news.categories = this.selectedCategories
  //       await api.updateAdminNews(this.$store.getters.getAuthToken, this.news)

  //       alert('Данные успешно сохранены!')

  //       this.$router.push({ name: 'NewsAdmin' })
  //     }
  //   }
  // }
}
</script>
