<template>
  <div class="container">
    <div class="content">
      <div class="feed-body">
        <div class="feed">
          <div class="vacancy-feed">
            <div class="vacancy-block edit-block">
            <h1 class="vacancy-title">Создание статьи</h1>
            <el-form>
              <!-- <div class="row-group row-group-profile"> -->
                <div>
                <el-form-item prop="name">
                  <label class="required-label label" for="name">Название</label>
                  <el-input id="name" type="text" class="input" placeholder="Введите название" ></el-input>
                </el-form-item>

                <el-form-item prop="name">
                  <label class="label" for="name">Изображение</label>
                  <el-input type="file" accept="image/jpeg" @change=uploadImage></el-input>
                </el-form-item>

                <el-form-item prop="description">
                  <label class="required-label label" for="description">Текст</label>
                  <el-input
                    id="description"
                    type="textarea"
                    :rows="10"
                    placeholder="Введите описание"
                    >
                  </el-input>
                </el-form-item>

                <el-form-item prop="site">
                  <label class="label" for="site">Ссылка на источник</label>
                  <el-input id="site" type="text" class="input" placeholder="Введите ссылку на сайт" ></el-input>
                </el-form-item>

                </div>
                <!-- </div> -->

              <el-form-item class="one-button-row-profile">
                <el-button class="button-save" type="primary">Сохранить</el-button>
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

// const metroAPI = 'https://api.superjob.ru/2.0/suggest/town/4/metro/all/'

  export default {
    data() {
      return {
        experience: [{
          value: 'Option1',
          label: 'Не имеет значения'
        }, {
          value: 'Option2',
          label: 'Нет опыта'
        }, {
          value: 'Option3',
          label: 'Меньше 1 года'
        }, {
          value: 'Option4',
          label: 'От 1 года до 3 лет'
        }, {
          value: 'Option5',
          label: 'От 3 до 6 лет'
        }, {
          value: 'Option6',
          label: 'Более 6 лет'
        }],
        value: '',
        employment: [{
          value: 'Option1',
          label: 'Полная занятость'
        }, {
          value: 'Option2',
          label: 'Частичная занятость'
        }, {
          value: 'Option3',
          label: 'Проектная работа'
        }, {
          value: 'Option4',
          label: 'Волонтерство'
        }, {
          value: 'Option5',
          label: 'Стажировка'
        }]
      }
    },
    // methods: {
    //    getJson(url) {
    //         return fetch(url)
    //             .then(result => result.json())
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     }
    // },
    // mounted() {
    //   this.getJson(`${metroAPI}`)
    //         .then(data => {
    //           console.log(data)
    //         });
    // },
  }
</script>
