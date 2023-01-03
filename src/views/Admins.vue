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
      <b-row>
        <!-- <b-col
        md="3"
        class="mb-1"
      >
        <b-input-group>
          <b-form-input placeholder="Фильтр..." />
          <b-input-group-append>
            <b-button variant="outline-primary">
              Поиск
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col> -->
        <b-col
          md="9"
          class="mb-1"
        >
          <b-button
            v-ripple.400="'rgba(255, 159, 67, 0.15)'"
            v-b-modal.modal-add
            variant="outline-warning"
          >
            Добавить
          </b-button>
        </b-col>
      </b-row>
      <b-table
        responsive="sm"
        :items="items"
        :fields="tableColumns"
      >
      <!-- <template v-slot:cell(actions)="data">
        <b-button
          v-b-modal.modal-warning-edit
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="warning"
          class="btn-icon mr-1"
          @click="edit(data.item)"
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
      </template> -->
      <!-- <template #cell(logo)="data">
        <b-avatar
          v-if="data.item.logo"
          class="mr-1"
          :src="`${IMG_URL}${data.item.logo}`"
        />
      </template> -->
      </b-table>
      <b-modal
        id="modal-add"
        ok-variant="warning"
        ok-title="Сохранить"
        modal-class="modal-warning"
        centered
        title="Добавление админ"
        @hidden="resetModal"
        @ok="add"
      >
        <validation-observer ref="simpleRules">
          <b-col cols="12">

            <label for="input-default">Имя</label>
            <b-form-group>
              <validation-provider
                #default="{ errors }"
                name="Имя"
                rules="required"
              >
                <b-form-input
                  id="input-default"
                  v-model="admin.name"
                  placeholder="Имя"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!--      <label for="brand-img">Лого бренда</label>-->
            <!--      <b-form-file-->
            <!--        id="brand-img"-->
            <!--        placeholder="Choose a file or drop it here..."-->
            <!--        drop-placeholder="Drop file here..."-->
            <!--        multiple-->
            <!--      />--></b-col>
          <b-col cols="12">
            <b-form-group
              label="Email"
              label-for="largeInput"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required"
              >
                <b-form-input
                  id="largeInput"
                  v-model="admin.email"
                  size="lg"
                  placeholder="Email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Телефон"
              label-for="largeInput"
            >
              <validation-provider
                #default="{ errors }"
                name="phone"
                rules="required"
              >
                <b-form-input
                  id="slugInput"
                  v-model="admin.phone"
                  size="lg"
                  placeholder="Телефон"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Пароль"
              label-for="largeInput"
            >
              <validation-provider
                #default="{ errors }"
                name="password"
                rules="required"
              >
                <b-form-input
                  id="slugInput"
                  v-model="admin.password"
                  size="lg"
                  placeholder="Пароль"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-select
              v-model="admin.role_ids"
              :options="roles"
              text-field="name"
              value-field="id"
            />
          </b-col>
        </validation-observer>
      </b-modal>

      <b-modal
        id="modal-warning-edit"
        ok-variant="warning"
        ok-title="Сохранить"
        modal-class="modal-warning"
        centered
        title="Редактировать"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <validation-observer ref="simpleRules">
          <b-form>
            <b-row>
              <b-col cols="12">
                <b-form-group
                  label="Имя Админ"
                  label-for="largeInput"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Имя Админ"
                    rules="required"
                  >
                    <b-form-input
                      id="largeInput"
                      v-model="admin.name"
                      size="lg"
                      placeholder="Имя Админ"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <b-form-group
                  label="Email Админ"
                  label-for="largeInput"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Email Админ"
                    rules="required"
                  >
                    <b-form-input
                      id="largeInput"
                      v-model="admin.email"
                      size="lg"
                      placeholder="Email"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Телефон"
                  label-for="largeInput"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="phone"
                    rules="required"
                  >
                    <b-form-input
                      id="slugInput"
                      v-model="admin.phone"
                      size="lg"
                      placeholder="Телефон"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            <!-- <b-col cols="12">
              <b-form-group>
                <b-form-file
                  v-model="admin.file"
                  size="lg"
                  placeholder="Выберите изображение..."
                  drop-placeholder="Slide..."
                />
              </b-form-group>

            </b-col> -->
            </b-row>
          </b-form>
        </validation-observer>
      </b-modal>
      <b-pagination
        v-if="rows >= perPage"
        v-model="currentPage"
        hide-goto-end-buttons
        :total-rows="rows"
        :per-page="perPage"
        @input="getAdmins"
      />
    </b-card>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import {
  BForm,
  BCard,
  BCol,
  BFormGroup,
  BFormInput,
  BModal,
  BRow,
  BTable,
  VBModal,
  BPagination,
  BButton,
  BSpinner,
  BFormSelect,
} from 'bootstrap-vue'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { codeSeparated } from './Pagination/code'

export default {
  components: {
    BButton,
    BForm,
    ValidationProvider,
    ValidationObserver,
    BFormGroup,
    BFormInput,
    BTable,
    BCard,
    BModal,
    BRow,
    BCol,
    BPagination,
    BSpinner,
    BFormSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      IMG_URL: $themeConfig.app.IMG_URL,
      passValue: '',
      username: '',
      required,
      roles: [],
      items: [],
      show: true,
      tableColumns: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'name',
          label: 'Имя',
          sortable: true,
        },
        {
          key: 'phone',
          label: 'Телефон',
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
        },
        // {
        //   key: 'actions',
        //   label: 'Действия',
        // },
      ],
      admin: {
        id: '',
        name: '',
        email: '',
        phone: '',
        file: '',
        password: '',
        role_ids: '',
      },
      codeSeparated,
      currentPage: 1,
      rows: 50,
      perPage: 15,
    }
  },
  mounted() {
    this.getAdmins(1)
    this.getRoles()
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
    getRoles() {
      axios.get(`${$themeConfig.app.API}v2/admin/roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.roles = res.data.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    getAdmins(page) {
      this.show = true
      axios.get(`${$themeConfig.app.API}v2/admin/admins?page=${page}&per_page=${this.perPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.items = res.data.data.data
          this.rows = res.data.total
          this.show = false
        })
        .catch(er => {
          console.log(er)
          this.show = false
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.admin.name)
      myFormData.append('email', this.admin.email)
      myFormData.append('phone', this.admin.phone)
      myFormData.append('password', this.admin.password)
      myFormData.append('role_ids', this.admin.role_ids)
      //   if (this.admin.file) {
      //     myFormData.append('logo', `${await this.getBase64(this.admin.file)}`)
      //   }
      await axios({
        method: 'post',
        url: `${$themeConfig.app.API}v2/admin/register`,
        data: myFormData,
        config: {
          headers:
              {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
        },
      })
        .then(() => {
          this.addStatus = true
          this.getAdmins()
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
      this.admin.name = ''
      this.admin.id = ''
      this.admin.phone = ''
      this.admin.email = ''
      this.admin.file = ''
    },
    // eslint-disable-next-line no-unused-vars
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleEdit()
    },
    async handleEdit() {
      const myFormData = new FormData()
      myFormData.append('name', this.admin.name)
      myFormData.append('email', this.admin.email)
      myFormData.append('phone', this.admin.phone)
      myFormData.append('id', this.admin.id)
      //   if (this.admin.file) {
      //     myFormData.append('logo', `${await this.getBase64(this.admin.file)}`)
      //   }
      myFormData.append('_method', 'PUT')
      // Edit request
      if (this.admin.id !== '') {
        await axios({
          method: 'post',
          url: `${$themeConfig.app.API}v2/admin/admins/${this.admin.id}`,
          data: myFormData,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        })
          .then(() => {
            this.getAdmins()
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
      // // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
    edit(data) {
      this.admin.name = data.name
      this.admin.id = data.id
      this.admin.email = data.email
      this.admin.phone = data.phone
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
            axios.delete(`${$themeConfig.app.API}v2/admin/admins/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getAdmins()
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
