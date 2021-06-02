<template>
  <div class="container">
    <div class="content">
      <div class="feed-body">
        <div class="feed">
          <div class="vacancy-feed">
            <div class="vacancy-block edit-block">
            <h1 class="vacancy-title">Редактирование вакансии</h1>
            <el-form>
              <div class="row-group row-group-profile">
                <div>
                <el-form-item prop="name">
                  <label class="required-label label" for="name">Название</label>
                  <el-input id="name" type="text" class="input" placeholder="Введите название" ></el-input>
                </el-form-item>

                <!-- СДЕЛАТЬ СЕЛЕКТ С ГОРОДАМИ -->
                <el-form-item prop="city">
                  <label class="required-label label" for="city">Город</label>
                  <el-input id="city" type="text" class="input" placeholder="Введите название" ></el-input>
                </el-form-item>

                <!-- ЕСЛИ МОСКВА, ТО -->
                <el-form-item prop="metro">
                  <label class="required-label label" for="metro">Станция метро(?)</label>
                  <el-input id="metro" type="text" class="input" placeholder="Введите название" ></el-input>
                </el-form-item>

                <el-form-item prop="experience">
                  <label class="required-label label" for="experience">Требуемый опыт работы</label>
                  <el-select id="experience" v-model="value" placeholder="Выберите требуемый опыт работы">
                    <el-option
                      v-for="item in experience"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="employment">
                  <label class="required-label label" for="employment">Тип занятости</label>
                  <el-select id="employment" v-model="value" placeholder="Выберите тип занятости">
                    <el-option
                      v-for="item in employment"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item prop="address">
                  <label class="required-label label" for="address">Адрес</label>
                  <el-input id="address" type="text" class="input" placeholder="Введите адрес" ></el-input>
                </el-form-item>

                <!-- ПОДУМАТЬ КАКИЕ ЕЩЕ КОНТАКТНЫЕ ДАННЫЕ МОГУТ БЫТЬ -->

                <el-form-item prop="tel">
                  <label class="label" for="tel">Телефон</label>
                  <el-input id="tel" type="text" class="input" placeholder="Введите ваш телефон" ></el-input>
                </el-form-item>

                <el-form-item prop="email">
                  <label class="label" for="email">E-mail</label>
                  <el-input id="email" type="text" class="input" placeholder="Введите ваш e-mail" ></el-input>
                </el-form-item>

                <el-form-item prop="site">
                  <label class="label" for="site">Сайт</label>
                  <el-input id="site" type="text" class="input" placeholder="Введите ссылку на ваш сайт" ></el-input>
                </el-form-item>

                </div>

                <div>
                   <el-form-item prop="description">
                  <label class="label" for="description">Описание</label>
                  <el-input
                    id="description"
                    type="textarea"
                    :rows="5"
                    placeholder="Введите описание"
                    v-model="textarea">
                  </el-input>
                </el-form-item>

                <!-- НАДО КАК-ТО ПЕРЕДАТЬ ДАННЫЕ ДЛЯ СПИСКА -->

                <el-form-item prop="charge">
                  <label class="label" for="charge">Обязанности</label>
                  <el-input
                    id="charge"
                    type="textarea"
                    :rows="5"
                    placeholder="Введите обязанности"
                    v-model="textarea">
                  </el-input>
                </el-form-item>

                <el-form-item prop="postulata">
                  <label class="label" for="postulata">Требования</label>
                  <el-input
                    id="postulata"
                    type="textarea"
                    :rows="5"
                    placeholder="Введите требования"
                    v-model="textarea">
                  </el-input>
                </el-form-item>

                <el-form-item prop="circumstances">
                  <label class="label" for="circumstances">Условия</label>
                  <el-input
                    id="circumstances"
                    type="textarea"
                    :rows="5"
                    placeholder="Введите условия"
                    v-model="textarea">
                  </el-input>
                </el-form-item>
                </div>
              </div>

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
    }
  }
</script>
