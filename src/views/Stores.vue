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
        :items="stores"
        :fields="tableColumns"
      >
        <!-- <template #cell(image)="data">
          <b-avatar
            v-if="data.item.image"
            class="mr-1"
            :src="`${IMG_URL}${data.item.image}`"
          />
        </template> -->
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
            <!-- <b-dropdown
              :right="$store.state.appConfig.isRTL"
              no-caret
              toggle-class="p-0"
              variant="link"
            /> -->
          </div>
        </template>
        <!-- <template
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
        </template> -->
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
                    v-model="store.title"
                    placeholder="Название"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Адрес"
                label-for="textarea"
              >
                <validation-provider
                  #default="{ errors }"
                  name="address"
                  rules="required"
                >
                  <b-form-input
                    id="adress"
                    v-model="store.street"
                    placeholder="Адрес"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Телефон"
                label-for="textarea"
              >
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  rules="required"
                >
                  <b-form-input
                    id="phone"
                    v-model="store.phone"
                    placeholder="Адрес"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
              <b-col cols="12">
              <b-form-group>
                <b-form-file
                  v-model="store.file"
                  value-field="id"
                  size="lg"
                  placeholder="Выберите изображение..."
                  drop-placeholder="Slide..."
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
                    v-model="store.title"
                    placeholder="Название"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Адрес"
                label-for="textarea"
              >
                <validation-provider
                  #default="{ errors }"
                  name="address"
                  rules="required"
                >
                  <b-form-input
                    id="adress"
                    v-model="store.street"
                    placeholder="Адрес"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Телефон"
                label-for="textarea"
              >
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  rules="required"
                >
                  <b-form-input
                    id="phone"
                    v-model="store.phone"
                    placeholder="Адрес"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
              <b-col cols="12">
              <b-form-group>
                <b-form-file
                  v-model="store.file"
                  value-field="id"
                  size="lg"
                  placeholder="Выберите изображение..."
                  drop-placeholder="Slide..."
                />
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </b-modal>
    </div>
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import {
  BTable, BCard, BFormFile, BFormInput, BFormGroup, VBModal, BModal, BRow, BCol, BButton,

} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
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
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      required,
      stores: [],
      IMG_URL: $themeConfig.app.IMG_URL,
      tableColumns: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'title',
          label: 'Название',
          sortable: true,
        },
        {
          key: 'street',
          label: 'Slug',
          sortable: true,
        },
        {
          key: 'phone',
          label: 'Описание',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      store: {
        id: '',
        title: '',
        phone: '',
        street: '',
        file: '',
      },
    }
  },
  mounted() {
    this.getStores()
  },
  methods: {
    getStores() {
      axios.get(`${$themeConfig.app.API}v2/admin/stores`)
        .then(res => {
          this.stores = res.data.data
          console.log('store', this.stores)
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('title', this.store.title)
      myFormData.append('street', this.store.street)
      myFormData.append('phone', this.store.phone)
      if (this.store.file) {
        myFormData.append('image', `${await this.getBase64(this.store.file)}`)
      }
      await axios({
        method: 'POST',
        url: `${$themeConfig.app.API}v2/admin/stores`,
        data: myFormData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      })
        .then(() => {
          this.getStores()
          this.getStores()
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
      this.store.title = ''
      this.store.id = ''
      this.store.phone = ''
      this.store.street = ''
    },
    handleOk() {
      this.handleEdit()
    },
    async handleEdit() {
      const myFormData = new FormData()
      myFormData.append('title', this.store.title)
      myFormData.append('phone', this.store.phone)
      myFormData.append('street', this.store.street)
      myFormData.append('id', this.store.id)
      myFormData.append('_method', 'put')
      if (this.store.file) {
        myFormData.append('image', `${await this.getBase64(this.store.file)}`)
      }
      if (this.store.id !== '') {
        await axios.post(`${$themeConfig.app.API}v2/admin/stores/${this.store.id}`, myFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
          .then(() => {
            this.getStores()
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
      this.store.id = data.id
      this.store.title = data.title
      this.store.street = data.street
      this.store.phone = data.phone
      this.store.file = data.file
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
            axios.delete(`${$themeConfig.app.API}v2/admin/stores/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getStores()
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
