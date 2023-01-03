<!-- eslint-disable vue/no-template-shadow -->
<template>
  <!-- <b-tabs vertical nav-wrapper-class="nav-vertical">
    <b-tab active title="Главная"> -->
  <b-card>
    <validation-observer ref="simpleRules">
      <b-row>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Наименование товара"
              rules="required"
            >
              <label for="Product name-default">Наименование товара</label>
              <b-form-input
                v-model="product.name"
                :state="errors.length > 0 ? false : null"
                placeholder="Наименование товара"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Кастомный URL (Slug)"
              rules="required"
            >
              <label for="Optional-default">Кастомный URL (Slug)</label>
              <b-form-input
                v-model="product.slug"
                :state="errors.length > 0 ? false : null"
                placeholder="Кастомный URL (Slug)"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Артикул"
              rules="required"
            >
              <label for="SKU-default">Артикул</label>
              <b-form-input
                v-model="product.sku"
                :state="errors.length > 0 ? false : null"
                placeholder="Серийный номер"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Цена"
              rules="required"
            >
              <label for="Price-default">Цена</label>
              <b-form-input
                v-model="product.price"
                :state="errors.length > 0 ? false : null"
                placeholder="Цена"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Кол-во"
              rules="required"
            >
              <label for="Quantity-default">Кол-во</label>

              <b-form-input
                v-model="product.quantity"
                type="number"
                :state="errors.length > 0 ? false : null"
                placeholder="Кол-во"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Бренд"
              rules="required"
            >
              <label for="select-default">Бренд</label>
              <b-form-select
                id="select-default"
                v-model="product.brand_id"
                :options="brands"
                value-field="id"
                text-field="name"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Категории"
              rules="required"
            >
              <label for="Quantity-default">Категории</label>
              <v-select
                v-model="product.categories"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                label="name"
                :options="categories"
                :reduce="category => category.id"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="фото"
              rules="required"
            >
              <label for="Quantity-default">Фото</label>
              <b-form-file
                v-model="product.file"
                placeholder="Выберите файл или перетащите его сюда..."
                drop-placeholder="Бросьте файл сюда..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Скидка"
              rules="required"
            >
              <label for="select-default_dis">Скидка</label>
              <b-form-select
                id="select-default_dis"
                v-model="product.discount_id"
                :options="discount_id"
                value-field="id"
                text-field="name"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Процент скидки"
              rules="required"
            >
              <label for="Quantity-default">Процент скидки</label>

              <b-form-input
                v-model="product.discount_percent"
                type="number"
                :state="errors.length > 0 ? false : null"
                placeholder="Кол-во"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <validation-provider
            #default="{ errors }"
            name="Описание"
            rules="required"
          >
            <label for="textarea-default">Описание</label>
            <b-form-textarea
              id="textarea-default"
              v-model="product.description"
              placeholder="Описание"
              rows="2"
              size="4"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Тип товар"
              rules="required"
            >
              <label for="Quantity-default">Типы товар</label>

              <b-form-select
                id="select-default"
                v-model="product.product_type_id"
                :options="typeProducts"
                value-field="id"
                text-field="name"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <validation-provider
            #default="{ errors }"
            name="Состав"
            rules="required"
          >
            <b-card-code title="Состав">
              <!-- <b-card-text></b-card-text> -->

              <quill-editor
                v-model="product.compound"
                :options="editorOption"
              />
              <template #code>
                {{ codeBubble }}
              </template>
            </b-card-code>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <validation-provider
          #default="{ errors }"
          name="Характеристики"
          rules="required"
        >
          <b-card-code title="характеристики">
            <quill-editor
              v-model="product.characteristics"
              :options="editorOption"
            />
            <template #code>
              {{ codeBubble }}
            </template>
          </b-card-code>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- submit button -->
        <b-col md="12">
          <b-button
            class="w-100 mt-3"
            variant="primary"
            type="submit"
            @click.prevent="add"
            @disabled="addStatus"
          >
            Добавить
          </b-button>
        </b-col>
      </b-row>
    </validation-observer>
  </b-card>
  <!-- </b-tab> -->
  <!-- <b-tab title="Галерея изображений"> -->
<!--
<div class="dropbox">
  <input type="file" multiple :name="uploadFieldName" @change="previewMultiImage" accept="image/*"
    class="input-file">
  <p>
    Drag your file(s) here to begin<br> or click to browse
  </p>

</div>
<div v-for="item, index in images" :key="index">
  <span class="">
    <img height="200px" :src="item" />

    <b-button variant="gradient-danger" class="btn-icon" @click="removeImages(index)">
      <feather-icon icon="TrashIcon" />
    </b-button>
  </span>
</div>
<b-col md="6" class="pt-2">
  <b-button variant="primary" class="primary" @click="uploadImage">
    Загрузить
  </b-button>
</b-col> -->
<!-- </b-tab> -->
<!-- <b-tab title="Атрибуты размеры и цвета">
      <b-card>
        <b-form>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="Quantity-default">Атрибуты</label>
                <b-form-select v-model="values">
                  <option :value="null" disabled>-- Please select an option --</option>
                  <option v-for="attribute in attributes" :value="attribute">
                    {{ attribute.name }}
                  </option>
                </b-form-select>
                </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card>

      <b-card>
        <b-form>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="Quantity-default">Добавить атрибуты к продукту</label>
                <b-form-select v-model="attribute">
                  <option :value="values.values.name">{{ values.values.name }}</option>
                  <option v-for="attribute in values.values" :value="attribute">
                    {{ attribute.name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
          <b-col md="6">
            <label for="Quantity-default">Кол-во</label>
            <b-form-input v-model="kol" :state="errors.length > 0 ? false : null" placeholder="Кол-во" />
          </b-col>
          <b-col md="6">
            <label for="Price-default">Цена</label>
            <b-form-input v-model="price" :state="errors.length > 0 ? false : null" placeholder="Цена" />

          </b-col>
          <b-col md="6" class="pt-2">
        <b-button variant="primary" class="primary" @click="addAtributes">
          добавить
        </b-button>
      </b-col>
      </b-card>
      <b-card>
        <b-form>
          <b-row>
            <b-col md="12">
              <h2>Аттрибуты продукта</h2>
              <b-table striped hover :items="product.attributes" :fields="fields">
              <template v-slot:cell(actions)="{ item }">
                <b-button variant="gradient-danger" class="btn-icon" @click="removeAttribute(item.id)">
            <feather-icon icon="TrashIcon" />
          </b-button>
                </template>
                </b-table>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-tab> -->
<!-- </b-tabs> -->
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import {
  BButton,
  BCard,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormFile,
  BFormSelect,
  BFormTextarea,
  BRow,
  BTabs,
  BTab,
  BTable,
  BCardText,
} from 'bootstrap-vue'
// import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'

import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { quillEditor } from 'vue-quill-editor'
import { codeBubble } from '../forms/quill-editor/code'
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    BForm,
    BButton,
    BFormTextarea,
    BFormSelect,
    BFormGroup,
    BFormInput,
    BFormFile,
    BCol,
    BRow,
    BCard,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    BTabs,
    // eslint-disable-next-line vue/no-unused-components
    BTab,
    // eslint-disable-next-line vue/no-unused-components
    BTable,
    quillEditor,
    BCardCode,
    // eslint-disable-next-line vue/no-unused-components
    BCardText,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      required,
      codeBubble,
      editorOption: {
        theme: 'bubble',
        modules: {
          toolbar: [
            ['bold', 'italic'],
            ['link', 'image'],
          ],
        },
      },
      value: ['apple', 'orange'],
      addStatus: false,
      price: '',
      col: 0,
      discount_id: [],
      categories: [],
      attributes: [],
      attribute: '',
      images: [],
      values: [],
      brands: [],
      errors: [],
      typeProducts: [],
      product: {
        id: '',
        name: '',
        slug: '',
        sku: '',
        price: '',
        quantity: '',
        brand_id: '',
        description: '',
        file: '',
        image: '',
        compound: '',
        characteristics: '',
        discount_id: '',
        discount_percent: '',
        product_type_id: '',
      },
      selectedSize: null,
    }
  },
  mounted() {
    this.getBrands()
    this.getCategories()
    this.getDiscouts()
    this.getProductsType()
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
            alert('login successfully')
        }
      })
    },
    getDiscouts() {
      axios.get(`${$themeConfig.app.API}v2/admin/discount`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.discount_id = res.data.data
      }).catch(er => {
        console.log(er)
      })
    },
    getProductsType() {
      axios.get(`${$themeConfig.app.API}v2/admin/product-type`)
        .then(res => {
          this.typeProducts = res.data.data
        })
    },

    getBrands() {
      axios.get(`${$themeConfig.app.API}v2/admin/brands`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.brands = res.data.data
      }).catch(er => {
        console.log(er)
      })
    },
    getCategories() {
      axios.get(`${$themeConfig.app.API}v2/admin/all_categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.categories = res.data
      }).catch(er => {
        console.log(er)
      })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.product.name)
      myFormData.append('slug', this.product.slug)
      myFormData.append('sku', this.product.sku)
      myFormData.append('featured', 0)
      myFormData.append('status', 1)
      myFormData.append('categories', `${this.product.categories}`)
      myFormData.append('brand_id', this.product.brand_id)
      myFormData.append('description', this.product.description)
      myFormData.append('price', this.product.price)
      myFormData.append('quantity', 1)
      myFormData.append('compound', this.product.compound)
      myFormData.append('characteristics', this.product.characteristics)
      myFormData.append('discount_id', this.product.discount_id)
      myFormData.append('discount_percent', this.product.discount_percent)
      myFormData.append('product_type_id', this.product.product_type_id)

      if (this.product.file) {
        myFormData.append('image', `${await this.getBase64(this.product.file)}`)
      }

      await axios.post(`${$themeConfig.app.API}v2/admin/products`, myFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.product = res.data.data
        }).catch(er => {
          console.log(er)
        })
        .then(() => {
          this.addStatus = true
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Успешно',
              text: 'Запись добавлена',
              icon: 'CheckSquareIcon',
              variant: 'success',
            },
          })
          this.$router.push(`/product/edit/${this.product.id}`)
        })
        .catch(e => {
          this.addStatus = false
          console.log(e)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Ошибка',
              text: e.message,
              icon: 'CheckSquareIcon',
              variant: 'dander',
            },
          })
        })
    },
    getBase64(file) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(file)
      })
    },
    previewMultiImage(event) {
      const input = event.target
      let count = input.files.length
      let index = 0
      if (input.files) {
        // eslint-disable-next-line no-plusplus
        while (count--) {
          const reader = new FileReader()
          reader.onload = e => {
            this.images.push(e.target.result)
          }
          reader.readAsDataURL(input.files[index])
          // eslint-disable-next-line no-plusplus
          index++
        }
      }
    },
    removeImages(id) {
      this.images.splice(id, 1)
    },
    async uploadImage() {
      await axios.post(`${$themeConfig.app.API}v2/admin/images`, {
        productId: `${this.$route.params.id}`,
        images: this.images,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'Appilication/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(() => {
        this.addStatus = true
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Успешно',
            text: 'Запись добавлена',
            icon: 'CheckSquareIcon',
            variant: 'success',
          },
        })
        this.$router.push('/')
      }).catch(e => {
        this.addStatus = false
        console.log(e)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Ошибка',
            text: e.message,
            icon: 'CheckSquareIcon',
            variant: 'dander',
          },
        })
      })
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.dropbox {
  outline: 2px dashed grey;
  /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue;
  /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

.showIcon {
  display: block;
  position: relative;
}

.showIcon:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://img.icons8.com/material-outlined/50/trash--v1.png") no-repeat center center;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.4s ease;
}

.showIcon:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .8);
  opacity: 0;
  transition: opacity 0.4s linear;
}

.showIcon:hover:before,
.showIcon:hover:after {
  opacity: 1;
}
</style>
