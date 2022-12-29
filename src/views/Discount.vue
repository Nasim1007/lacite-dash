<template>
  <b-card>
    <div>
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-modal.modal-primaryadd
        variant="outline-primary"
        class="m-1"
      >
        Добавить
      </b-button>
      <b-table
        responsive="sm"
        :items="discountItem"
        :fields="tableColumns"
      >
        <template #cell(image)="data">
          <b-avatar
            v-if="data.item.image"
            class="mr-1"
            :src="`${IMG_URL}${data.item.image}`"
          />
        </template>
        <template #cell(actions)="data">
          <div class="text-nowrap">
            <b-button
              id="gradient-primaryy"
              v-b-modal.modal-primaryedit
              class="btn-icon mr-1"
              variant="gradient-primary"
              @click="edit(data.item)"
            >
              <feather-icon icon="EditIcon" />
            </b-button>
            <b-button
              class="btn-icon"
              variant="gradient-danger"
              @click="confirmDelete(data.item)"
            >
              <feather-icon icon="TrashIcon" />
            </b-button>
            <b-dropdown
              :right="$store.state.appConfig.isRTL"
              no-caret
              toggle-class="p-0"
              variant="link"
            />
          </div>
        </template>
        <template
          #cell(brand_id)="data"
          text-field="name"
        >
          <div class="text-nowrap">
            <b-badge
              variant="warning"
              class="badge-glow"
            >
              {{ data && data.item && data.item.brand && data.item.brand.id &&
                data.item.brand.name
              }}
            </b-badge>
          </div>
        </template>
      </b-table>
      <b-modal
        id="modal-primaryadd"
        ok-title="Сохранить"
        cancel-title="Закрыть"
        modal-class="modal-primary"
        centered
        title="Добавление"
        @ok="add"
        @hidden="resetModal"
      >
        <validation-observer ref="simpleRules">
          <b-row>
            <b-col cols="12">
              <b-form-group>
                <b-form-file
                  v-model="discount.file"
                  value-field="id"
                  size="lg"
                  placeholder="Выберите изображение..."
                  drop-placeholder="Slide..."
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Название"
                label-for="text"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Название"
                  rules="required"
                >
                  <b-form-input
                    id="text"
                    v-model="discount.name"
                    placeholder="Название"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Slug"
                label-for="slug"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Slug"
                  rules="required"
                >
                  <small class="text-danger">{{ errors[0] }}</small>
                  <b-form-input
                    id="slug"
                    v-model="discount.slug"
                    placeholder="slug"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Описание"
                label-for="textarea"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Описание"
                  rules="required"
                >
                  <b-form-textarea
                    id="textarea"
                    v-model="discount.description"
                    placeholder="Textarea"
                    rows="3"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Дедлайн"
                label-for="deadline"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Дедлайн"
                  rules="required"
                >
                  <b-form-datepicker
                    id="deadline"
                    v-model="discount.deadline"
                    :state="true"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <validation-provider
                #default="{ errors }"
                name="Бренд"
                rules="required"
              >
                <b-form-select
                  v-model="discount.brand_id"
                  value-field="id"
                  text-field="name"
                  :options="brands"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
        </validation-observer>
      </b-modal>
      <b-modal
        id="modal-primaryedit"
        ok-title="Редактировать"
        cancel-title="Закрыть"
        modal-class="modal-primary"
        centered
        title="Редактирование"
        @ok="handleOk"
        @hidden="resetModal"
      >
        <validation-observer ref="simpleRules">
          <b-row>
            <b-col cols="12">
              <b-form-group>
                <b-form-file
                  v-model="discount.file"
                  value-field="id"
                  size="lg"
                  placeholder="Выберите изображение..."
                  drop-placeholder="Slide..."
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Название"
                label-for="text"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Название"
                  rules="required"
                >
                  <b-form-input
                    id="text"
                    v-model="discount.name"
                    placeholder="Название"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Slug"
                label-for="slug"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Slug"
                  rules="required"
                >
                  <small class="text-danger">{{ errors[0] }}</small>
                  <b-form-input
                    id="slug"
                    v-model="discount.slug"
                    placeholder="slug"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Описание"
                label-for="textarea"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Описание"
                  rules="required"
                >
                  <b-form-textarea
                    id="textarea"
                    v-model="discount.description"
                    placeholder="Textarea"
                    rows="3"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Окончание скидки"
                label-for="deadline"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Дедлайн"
                  rules="required"
                >
                  <b-form-datepicker
                    id="deadline"
                    v-model="discount.deadline"
                    :state="true"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <validation-provider
                #default="{ errors }"
                name="Бренд"
                rules="required"
              >
                <b-form-select
                  v-model="discount.brand_id"
                  value-field="id"
                  text-field="slug"
                  :options="brands"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
        </validation-observer>
      </b-modal>
    </div>
    <b-pagination
      v-if="rows >= perPage"
      v-model="currentPage"
      hide-goto-end-buttons
      :total-rows="rows"
      :per-page="perPage"
      @input="getAdmins"
    />
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import {
  BFormTextarea, BFormDatepicker, BCardText, BCardCode, BFormSelect, BTable, BForm, BCard, BDropdown, BFormFile, BFormInput, BFormGroup, VBModal, BModal, BRow, BCol, BButton, BAvatar,
  BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BFormTextarea,
    BFormDatepicker,
    // eslint-disable-next-line vue/no-unused-components
    BCardText,
    BBadge,
    // eslint-disable-next-line vue/no-unused-components
    BForm,
    BFormSelect,
    // eslint-disable-next-line vue/no-unused-components
    BCardCode,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line no-dupe-keys
    ValidationProvider,
    BCard,
    BFormFile,
    BFormInput,
    BFormGroup,
    BTable,
    BRow,
    BCol,
    BButton,
    BModal,
    BDropdown,
    BAvatar,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      required,
      discountItem: [],
      // for_whos_id:[],
      selected: [],
      brands: [],
      IMG_URL: $themeConfig.app.IMG_URL,
      tableColumns: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'name',
          label: 'Название',
          sortable: true,
        },
        {
          key: 'slug',
          label: 'Slug',
          sortable: true,
        },
        {
          key: 'description',
          label: 'Описание',
          sortable: true,
        },
        {
          key: 'brand_id',
          label: 'Бренд',
          sortable: true,
        },
        {
          key: 'image',
          label: 'Изображение',
          sortable: true,
        },
        // {
        //     key: 'deadline',
        //     label: 'Дедлайн',
        //     sortable: true,
        // },

        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      discount: {
        id: '',
        name: '',
        slug: '',
        file: '',
        brand_id: '',
        description: '',
        deadline: '',
      },
    }
  },
  mounted() {
    this.getDiscount()
    this.getBrands()
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
    getBrands() {
      axios.get(`${$themeConfig.app.API}v2/admin/brands`)
        .then(res => {
          this.brands = res.data.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    getDiscount() {
      axios.get(`${$themeConfig.app.API}v2/admin/discount`)
        .then(res => {
          this.discountItem = res.data.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.discount.name)
      myFormData.append('slug', this.discount.slug)
      myFormData.append('description', this.discount.description)
      myFormData.append('deadline', this.discount.deadline)
      myFormData.append('brand_id', this.discount.brand_id)
      // myFormData.append('for_whos_id', this.category.for_whos_id)
      if (this.discount.file) {
        myFormData.append('image', `${await this.getBase64(this.discount.file)}`)
      }
      await axios.post(`${$themeConfig.app.API}v2/admin/discount`, myFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
        .then(() => {
          this.addStatus = true
          this.getDiscount()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Успешно',
              text: 'Запись успешно добавлен',
              icon: 'CheckSquareIcon',
              variant: 'success',
            },
          })
        })
        .catch(e => {
          this.addStatus = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Ошибка',
              text: e.message,
              icon: 'CheckSquareIcon',
              variant: 'danger',
            },
          })
        })
    },
    resetModal() {
      this.discount.name = ''
      this.discount.id = ''
      this.discount.slug = ''
      this.discount.file = ''
      this.discount.description = ''
      this.discount.deadline = ''
      this.discount.brand_id = ''
    },
    handleOk() {
      this.handleEdit()
    },
    async handleEdit() {
      const myFormData = new FormData()
      myFormData.append('name', this.discount.name)
      myFormData.append('slug', this.discount.slug)
      myFormData.append('description', this.discount.description)
      myFormData.append('deadline', this.discount.deadline)
      myFormData.append('brand_id', this.discount.brand_id)
      myFormData.append('id', this.discount.id)
      // myFormData.append('for_whos_id', this.category.for_whos_id)
      if (this.discount.file) {
        myFormData.append('image', `${await this.getBase64(this.discount.file)}`)
      } myFormData.append('_method', 'put')
      if (this.discount.id !== '') {
        await axios({
          method: 'post',
          url: `${$themeConfig.app.API}v2/admin/discount/${this.discount.id}`,
          data: myFormData,
          config: {
            headers: {
              // 'Content-Type': 'multipart/form-data',
              Accept: 'aplication/json',
            },
          },
        })
          .then(() => {
            this.getDiscount()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Успешно',
                text: 'Данные были изменены',
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
                variant: 'danger',
              },
            })
          })
      }

      // Hide the modal manually
    },
    edit(data) {
      this.discount.id = data.id
      this.discount.name = data.name
      this.discount.slug = data.slug
      this.discount.file = data.file
      this.discount.deadline = data.deadline
      this.discount.description = data.description
      this.discount.brand_id = data.brand.id
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
  },
}
</script>
