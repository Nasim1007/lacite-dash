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
    <b-card
      v-if="!show"
    >
      <b-card>
        <b-row
          class="d-flex align-items-center justify-content-between"
        >
          <b-col
            md="3"
            class="m-1"
          >
            <b-input-group>
              <b-form-input
                v-model="searchValue"
                placeholder="Фильтр"
              />
              <b-input-group-append>
                <b-button
                  variant="outline-primary"
                  @click="getProducts"
                >
                  Поиск
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col
            md="3"
            class="m-1"
          >
            <router-link
              to="/product/add/"
            >
              <b-button
                v-ripple.400="'rgba(255, 159, 67, 0.15)'"
                v-b-modal.modal-warning
                variant="outline-warning"
              >
                Добавить
              </b-button>
            </router-link>
          </b-col>
          <b-col
            md="3"
          >
            <b-button
              v-ripple.400="'rgba(255, 159, 67, 0.15)'"
              v-b-modal.modal-import
              variant="outline-warning"
            >
              Импорт товаров
            </b-button>
          </b-col>
        </b-row>

        <b-table
          responsive="sm"
          :items="products"
          :fields="tableColumns"
        >

          <template v-slot:cell(actions)="data">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="warning"
              class="btn-icon mr-1"
              :to="{ name: 'edit-product', params: { id: data.item.id } }"
            >
              <feather-icon icon="Edit2Icon" />
            </b-button>

            <b-button
              variant="gradient-danger"
              class="btn-icon"
              @click="confirmDelete(data.item)"
            >
              <feather-icon icon="TrashIcon" />
            </b-button>
          </template>
        <!-- <template #cell(image)="data">
          <img
            v-if="data.item.image"
            class="mr-1"
            :src="`${IMG_URL}${data.item.image}`"
            width="40"
            height="40"
          >
        </template> -->
        </b-table>
      </b-card>
      <b-modal
        id="modal-import"
        ok-variant="warning"
        ok-title="Сохранить"
        modal-class="modal-warning"
        centered
        title="Импорт товаров"
        @hidden="resetModal"
        @ok="importFile"
      >
        <b-form>
          <b-row>
            <b-col cols="12">
              <label for="brand-img">Лого бренда</label>
              <b-form-group>
                <b-form-file
                  v-model="file"
                  size="lg"
                  placeholder="Выберите файл..."
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
      <b-pagination
        v-model="currentPage"
        hide-goto-end-buttons
        :total-rows="rows"
        :per-page="perPage"
        @input="getProducts"
      />
    </b-card>
  </div>
</template>
<!-- <template>
  <div>
    <b-form-checkbox v-model="loading" switch>
      Switch Loading Status
    </b-form-checkbox>
    <div v-if="!loading" class="py-3">
      <h3>Loading</h3>
      <p>Loading can show the loading state icon.</p>
    </div>
    <b-loading :show="loading"></b-loading>
  </div>
</template> -->

<script>
import {
  BForm,
  BButton,
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BModal,
  BTable,
  VBModal,
  BFormSelect,
  BPagination,
  BFormFile,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BSpinner,

} from 'bootstrap-vue'
// import MyDiolog from '@/@core/components/MyDiolog.vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
// eslint-disable-next-line import/extensions
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { codeSeparated } from './Pagination/code'

export default {

  components: {
    // eslint-disable-next-line vue/no-unused-components
    VBModal,
    // eslint-disable-next-line vue/no-unused-components
    BFormSelect,
    // ValidationProvider,
    // ValidationObserver,
    BFormFile,
    BRow,
    BForm,
    BFormGroup,
    BButton,
    BTable,
    BCard,
    BModal,
    BCol,
    BPagination,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BSpinner,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      FILE_URL: $themeConfig.app.FILE_URL,
      dialogVisible: false,
      file: '',
      products: [],
      tableColumns: [
        { key: 'id', label: '#', sortable: true },
        { key: 'name', label: 'Название', sortable: true },
        { key: 'price', label: 'Цена', sortable: true },
        { key: 'sku', label: 'Артикул', sortable: true },
        // { key: 'image', label: 'Картинка' },
        { key: 'actions', label: 'Действия' },
      ],
      show: true,
      searchValue: '',
      codeSeparated,
      currentPage: 1,
      perPage: '',
      rows: '',
    }
  },
  mounted() {
    this.getProducts(1)
  },
  methods: {
    importFile() {
      axios.post(`${$themeConfig.app.API}v2/products/import`, {
        file: this.file,
      })
    },
    resetModal() {
      this.file = ''
    },
    showVisible() {
      this.dialogVisible = true
    },
    getProducts(page) {
      this.show = true
      axios.get(`${$themeConfig.app.API}v2/admin/products${this.searchValue ? `?search=${this.searchValue}&` : '?'}page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.products = res.data.data
        this.rows = res.data.total
        this.currentPage = res.data.current_page
        this.perPage = res.data.per_page
        this.show = false
      }).catch(er => {
        console.log(er)
        this.show = false
      })
    },
    confirmDelete(data) {
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
        .then(value => {
          if (value) {
            axios.delete(`${$themeConfig.app.API}v2/admin/categories/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getCategories()
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Успешно',
                    text: 'Данные были удалены',
                    icon: 'CheckSquareIcon',
                    variant: 'success',
                  },
                })
              })
              .catch(e => {
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
          }
        })
    },
    // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
    confirmDelete(data) {
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
        .then(value => {
          if (value) {
            axios.delete(`${$themeConfig.app.API}v2/admin/products/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getProducts()
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Успешно',
                    text: 'Данные были удалены',
                    icon: 'CheckSquareIcon',
                    variant: 'success',
                  },
                })
              })
              .catch(e => {
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
          }
        })
    },
  },
}
</script>
<style>
</style>
