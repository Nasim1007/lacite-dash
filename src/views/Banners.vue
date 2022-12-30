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
          :items="banners"
          :fields="tableColumns"
        >
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
          <template #cell(path)="data">
            <img
              class="mr-1"
              :src="data.item.path"
              width="65"
              height="40"
            >
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
                    v-model="banner.image"
                    value-field="id"
                    size="lg"
                    placeholder="Выберите изображение..."
                    drop-placeholder="Slide..."
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Заголовок"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="title"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.title"
                      placeholder="Заголовок"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Тип"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.type"
                      placeholder="Тип"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Описание"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.description"
                      placeholder="Описание"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Називание кнопка"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.link_name"
                      placeholder="Називание кнопка"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Ссылка на кнопка"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.link"
                      placeholder="Ссылка на кнопка"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Актив"
                  label-for="text"
                >
                  <b-form-select
                    v-model="banner.is_active"
                    :options="options"
                  />
                </b-form-group>
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
                <b-form-group
                  label="Заголовок"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="title"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.title"
                      placeholder="Заголовок"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Тип"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.type"
                      placeholder="Тип"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Описание"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.description"
                      placeholder="Описание"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Називание кнопка"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.link_name"
                      placeholder="Називание кнопка"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Ссылка на кнопка"
                  label-for="text"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-input
                      id="text"
                      v-model="banner.link"
                      placeholder="Ссылка на кнопка"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Актив"
                  label-for="text"
                >
                  <b-form-select
                    v-model="banner.is_active"
                    :options="options"
                  />
                </b-form-group>
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
        @input="getBrands"
      />
    </b-card>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import {
  BSpinner,
  BFormSelect, BCardText, BCardCode, BTable, BForm, BCard, BDropdown, BFormFile, BFormInput, BFormGroup, VBModal, BModal, BRow, BCol, BButton, BPagination,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { codeSeparated } from './Pagination/code'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BCardText,
    // eslint-disable-next-line vue/no-unused-components
    BForm,
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
    BFormSelect,
    BPagination,
    BSpinner,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      required,
      banners: [],
      IMG_URL: $themeConfig.app.IMG_URL,
      tableColumns: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'path',
          label: 'Изображение',
          sortable: true,
        },
        {
          key: 'type',
          label: 'Тип',
          sortable: true,
        },
        {
          key: 'is_active',
          label: 'Актив',
          sortable: true,
        },
        {
          key: 'link',
          label: 'Ссылка',
        },
        {
          key: 'link_name',
          label: 'Кнопка',
        },
        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      show: true,
      banner: {
        id: '',
        image: '',
        type: '',
        is_active: '',
        description: '',
        link: '',
        link_name: '',
        title: '',
      },
      options: [
        { value: '1', text: 'True' },
        { value: '0', text: 'False' },
      ],
      codeSeparated,
      currentPage: 1,
      rows: 14,
      perPage: 15,
    }
  },
  mounted() {
    this.getBanners()
  },
  methods: {
    getBanners() {
      this.show = true
      axios.get(`${$themeConfig.app.API}v2/admin/banners`)
        .then(res => {
          this.banners = res.data.data
          this.show = false
        })
        .catch(er => {
          console.log(er)
          this.show = false
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('type', this.banner.type)
      myFormData.append('is_active', this.banner.is_active)
      myFormData.append('description', this.banner.description)
      myFormData.append('link', this.banner.link)
      myFormData.append('link_name', this.banner.link_name)
      myFormData.append('title', this.banner.link_name)
      if (this.banner.image) {
        myFormData.append('image', this.banner.image)
      }
      await axios.post(`${$themeConfig.app.API}v2/admin/banners`, myFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(() => {
          this.addStatus = true
          this.getBanners()
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
      this.banner.image = ''
      this.banner.id = ''
      this.banner.type = ''
      this.banner.title = ''
      this.banner.link = ''
      this.banner.link_name = ''
      this.banner.description = ''
    },
    handleOk() {
      this.handleEdit()
    },
    async handleEdit() {
      const myFormData = new FormData()
      myFormData.append('type', this.banner.type)
      myFormData.append('title', this.banner.title)
      myFormData.append('is_active', this.banner.is_active)
      myFormData.append('description', this.description)
      myFormData.append('link', this.link)
      myFormData.append('link_name', this.link_name)
      myFormData.append('_method', 'put')

      if (this.banner.id !== '') {
        await axios({
          method: 'post',
          url: `${$themeConfig.app.API}v2/admin/banners/${this.banner.id}`,
          data: myFormData,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        })
          .then(() => {
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
      this.banner.id = data.id
      this.banner.image = data.image
      this.banner.type = data.type
      this.banner.is_active = data.is_active
      this.banner.title = data.title
      this.banner.link = data.link
      this.banner.link_name = data.link_name
      this.banner.description = data.description
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
            axios.delete(`${$themeConfig.app.API}v2/admin/banners/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getBanners()
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
    getBase64(image) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(image)
      })
    },
  },
}
</script>
