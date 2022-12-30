<template>
  <div>
    <div
      v-if="show"
      class="d-flex justify-content-center align-items-center"
      style="height: 50vh;"
    >
      <b-spinner
        label="Spinning"
      />
    </div>
    <b-tabs
      v-if="!show"
      vertical
      nav-wrapper-class="nav-vertical"
    >
      <b-tab
        active
        title="Главная"
      >
        <b-card>
          <b-form>
            <b-row>
              <validation-observer ref="simpleRules">
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
                      <label for="SKU-default">Артикуль</label>
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
                        v-model="product.brand.id"
                        :options="brands"
                        value-field="id"
                        text-field="name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group>
                    <validation-provider
                      #default="{ errors }"
                      name="фото"
                      rules="required"
                    >
                      <label for="Quantity-default">Фото</label>
                      <div class="dropbox">
                        <input
                          type="file"
                          :name="uploadFieldName"
                          accept="image/*"
                          class="input-file"
                          @change="previewImage"
                        >
                        <p>
                          Drag your file(s) here to begin<br> or click to browse
                        </p>

                      </div>
                      <div v-if="product.image!== ''">
                        <img
                          height="200px"
                          :src="product.image"
                        >
                      </div>
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
                  <b-button
                    v-if="product.image !== ''"
                    class="w-20"
                    variant="danger"
                    type="submit"
                    @click="removeImage"
                  >
                    удалить
                  </b-button>

                </b-col>

                <b-col md="12">
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
                <b-col md="12">
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
                    @click.prevent="edit"
                    @disabled="addStatus"
                  >
                    Изменить
                  </b-button>
                </b-col>

              </validation-observer>
            </b-row>
          </b-form>
        </b-card>
      </b-tab>
      <b-tab title="Галерея изображений">

        <div
          v-for="(item, index) in product.images"
          :key="index"
        >
          <span class="">
            <img
              height="200px"
              :src="item.url"
            >

            <b-button
              variant="gradient-danger"
              class="btn-icon"
              @click="removeImagesByID(item.id)"
            >
              <feather-icon icon="TrashIcon" />
            </b-button>
          </span>
        </div>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            accept="image/*"
            class="input-file"
            @change="previewMultiImage"
          >
          <p>
            Drag your file(s) here to begin<br> or click to browse
          </p>

        </div>
        <div
          v-for="(item, index) in images"
          :key="index"
        >
          <span class="">
            <img
              height="200px"
              :src="item"
            >

            <b-button
              variant="gradient-danger"
              class="btn-icon"
              @click="removeImages(index)"
            >
              <feather-icon icon="TrashIcon" />
            </b-button>
          </span>
        </div>
        <b-col
          md="6"
          class="pt-2"
        >
          <b-button
            variant="primary"
            class="primary"
            @click="uploadImage"
          >
            Загрузить
          </b-button>
        </b-col>
      </b-tab>
      <b-tab title="Атрибуты размеры и цвета">
        <b-card>
          <b-form>
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label for="Quantity-default">Атрибуты</label>
                  <b-form-select v-model="values">
                    <option
                      :value="null"
                      disabled
                    >
                      -- Please select an option --
                    </option>
                    // eslint-disable-next-line vue/require-v-for-key, vue/require-v-for-key, vue/require-v-for-key,
                    vue/require-v-for-key, vue/require-v-for-key
                    <option
                      v-for="attribute in attributes"
                      :value="attribute"
                    >
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
                    <option :value="values.values.name">
                      {{ values.values.name }}
                    </option>
                    <option
                      v-for="attribute in values.values"
                      :value="attribute"
                    >
                      {{ attribute.name }}
                    </option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <b-col md="6">
            <label for="Quantity-default">Кол-во</label>
            <b-form-input
              v-model="kol"
              :state="errors.length > 0 ? false : null"
              placeholder="Кол-во"
            />
          </b-col>
          <b-col md="6">
            <label for="Price-default">Цена</label>
            <b-form-input
              v-model="price"
              :state="errors.length > 0 ? false : null"
              placeholder="Цена"
            />

          </b-col>
          <b-col
            md="6"
            class="pt-2"
          >
            <b-button
              variant="primary"
              class="primary"
              @click="addAttributes"
            >
              Добавить
            </b-button>
          </b-col>
        </b-card>
        <b-card>
          <b-form>
            <b-row>
              <b-col md="12">
                <h2>Аттрибуты продукта</h2>
                <b-table
                  striped
                  hover
                  :items="product.attributes"
                  :fields="fields"
                >
                  <template v-slot:cell(actions)="{ item }">
                    <b-button
                      variant="gradient-danger"
                      class="btn-icon"
                      @click="removeAttribute(item.id)"
                    >
                      <feather-icon icon="TrashIcon" />
                    </b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import {
  BButton,
  BCard,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormTextarea,
  BRow,
  BTab,
  BTable,
  BTabs,
  BSpinner,
} from 'bootstrap-vue'
// import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import axios from '@axios'
import { $themeConfig } from '@themeConfig'
// eslint-disable-next-line no-unused-vars

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
    BForm,
    BButton,
    BFormTextarea,
    BFormSelect,
    BFormGroup,
    BFormInput,
    BCol,
    BRow,
    BCard,
    BTabs,
    BTab,
    vSelect,
    BTable,
    quillEditor,
    BCardCode,
    BSpinner,

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
      show: true,
      uploadFieldName: 'Загрузка файлов',
      fields: ['id',
        { key: 'type.name', label: 'Тип атрибута' },
        { key: 'name', label: 'Значения' },
        { key: 'quantity', label: 'Количество' },
        { key: 'price', label: 'Цена' },
        { key: 'actions', label: 'Действия' }],
      discount_id: [],
      addStatus: false,
      brands: [],
      price: '',
      kol: 0,
      categories: [],
      attributes: [],
      attribute: '',
      images: [],
      values: [],
      errors: [],
      product: {
        name: '',
        slug: '',
        sku: '',
        price: '',
        quantity: '',
        brand_id: '',
        description: '',
        file: '',
        image: '',
        images: '',
        attributes: [],
        showIcon: false,
        compound: '',
        characteristics: '',
        categories: [],
        id: '',
        discount_percent: '',
        discount_id: '',
        brand: {
          id: '',
        },

      },
      selectedSize: null,
    }
  },
  computed: {},
  mounted() {
    this.getBrands()
    this.getCategories()
    this.getProduct()
    this.getAttribute()
    this.getDiscouts()
  },
  methods: {

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleEdit()
    },
    async addAttributes() {
      await axios.post(`${$themeConfig.app.API}v2/admin/product/attributes`, {
        attribute_id: this.attribute.id,
        quantity: this.kol,
        price: this.price,
        product_id: `${this.$route.params.id}`,
      }, {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
          this.getProduct()
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
    async removeAttribute(id) {
      this.$bvModal
        .msgBoxConfirm('После удаления данные восстановить нельзя будет!', {
          title: 'Вы уверены что хотите удалить?',
          size: 'sm',
          okVariant: 'primary',
          okTitle: 'Удалить',
          cancelTitle: 'Отменить',
          cancelVariant: 'outline-secondary',
          hideHeaderClose: false,
          centered: true,
        })
        .then(() => {
          axios.delete(`${$themeConfig.app.API}v2/admin/product/attributes/${id}`)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Успешно',
              text: 'Данные были удалены',
              icon: 'CheckSquareIcon',
              variant: 'success',
            },
          })
          this.$router.push(`/product/edit/${this.$route.params.id}`)
          this.product.attributes = this.product.attributes.filter(item => item.id !== id)
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

    async uploadImage() {
      await axios.post(`${$themeConfig.app.API}v2/admin/images`, {
        productId: `${this.$route.params.id}`,
        images: this.images,
      },
      {
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
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
    async removeImagesByID(id) {
      await axios.delete(`${$themeConfig.app.API}v2/admin/images/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
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
          this.$router.push(`/product/edit/${this.$route.params.id}`)
          this.product.images = this.product.images.splice(id, 1)
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
    removeImage() {
      this.product.image = ''
    },
    removeImages(id) {
      this.images.splice(id, 1)
    },
    async getProduct() {
      this.show = true
      await axios.get(`${$themeConfig.app.API}v2/admin/products/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.product = res.data.data
        this.product.categories = res.data.data.categories.map(x => x.id)
        this.product.discount_id = res.data.data.discount ? res.data.data.discount.id : ''
        this.show = false
      }).catch(er => {
        console.log(er)
        this.show = false
      })
    },
    async getAttribute() {
      await axios.get(`${$themeConfig.app.API}v2/admin/attributes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.attributes = res.data.data
      }).catch(er => {
        console.log(er)
      })
    },
    async getBrands() {
      await axios.get(`${$themeConfig.app.API}v2/admin/brands`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.brands = res.data.data
      }).catch(er => {
        console.log(er)
      })
    },
    async getCategories() {
      await axios.get(`${$themeConfig.app.API}v2/admin/all_categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.categories = res.data
      }).catch(er => {
        console.log(er)
      })
    },
    async getDiscouts() {
      await axios.get(`${$themeConfig.app.API}v2/admin/discount`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.discount_id = res.data.data
      }).catch(er => {
        console.log(er)
      })
    },
    async edit() {
      if (this.product.file) {
        this.product.image = await this.getBase64(this.product.file)
      }

      delete this.product.discount
      delete this.product.brand
      delete this.product.for_who

      await axios.put(`${$themeConfig.app.API}v2/admin/products/${this.product.id}`, this.product,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }).then(() => {
        this.addStatus = true
        this.ajaxRequest = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Успешно',
            text: 'Запись изменена',
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
    previewImage(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.product.image = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
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
  background: url('https://img.icons8.com/material-outlined/50/trash--v1.png') no-repeat center center;
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
