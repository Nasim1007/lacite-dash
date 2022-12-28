<template>
  <b-card>
    <b-row>
      <b-col
        md="3"
        class="mb-1"
      >
        <!-- button on right -->
        <b-input-group>
          <b-form-input placeholder="Фильтр..." />
          <b-input-group-append>
            <b-button variant="outline-primary">
              Поиск
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- <b-col md="9">
          <b-button
            v-ripple.400="'rgba(255, 159, 67, 0.15)'"
            v-b-modal.modal-add
            variant="outline-warning"
          >
            Добавить
          </b-button>
        </b-col> -->
    </b-row>
    <b-table
      responsive="sm"
      :items="users"
      :fields="tableColumns"
    >
      <template v-slot:cell(actions)="data">
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
      </template>
      <!-- <template #cell(logo)="data">
          <b-avatar
            v-if="data.item.logo"
            class="mr-1"
            :src="`${IMG_URL}${data.item.logo}`"
          />
        </template> -->
    </b-table>
    <b-pagination
      v-model="currentPage"
      hide-goto-end-buttons
      :total-rows="rows"
      :per-page="perPage"
      @input="getUsers"
    />
  </b-card>

</template>

<script>
// import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import {
  //   BAvatar,
  BButton,
  BCard,
  BCol,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BRow,
  BTable,
  //   BFormFile,
  VBModal,
  BPagination,
} from 'bootstrap-vue'
import axios from 'axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { codeSeparated } from './Pagination/code'

export default {
  components: {
    // BFormFile,
    // BAvatar,
    BFormInput,
    BButton,
    BTable,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    BRow,
    BCol,
    BPagination,
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
      users: [],
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
        {
          key: 'address',
          label: 'Адрес',
          sortable: true,
        },
        {
          key: 'orders',
          label: 'заказов',
        },
        // {
        //   key: 'actions',
        //   label: 'Действия',
        // },
      ],
      user: {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      codeSeparated,
      currentPage: 1,
      rows: 50,
      perPage: 15,
    }
  },
  mounted() {
    this.getUsers(1)
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
    getUsers(page) {
      axios.get(`${$themeConfig.app.API}v2/admin/users?per_page=${this.perPage}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.users = res.data.data
          this.rows = res.data.meta.total
          this.perPage = res.data.meta.per_page
        })
        .catch(er => {
          console.log(er)
        })
    },
    resetModal() {
      this.user.name = ''
      this.user.id = ''
      this.user.phone = ''
      this.user.email = ''
      this.user.address = ''
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
      myFormData.append('name', this.user.name)
      myFormData.append('email', this.user.email)
      myFormData.append('phone', this.user.phone)
      myFormData.append('id', this.admin.id)
      //   if (this.admin.file) {
      //     myFormData.append('logo', `${await this.getBase64(this.admin.file)}`)
      //   }
      myFormData.append('_method', 'PUT')
      // Edit request
      if (this.admin.id !== '') {
        await axios({
          method: 'post',
          url: `${$themeConfig.app.API}v2/admin/users/${this.admin.id}`,
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
            axios.delete(`${$themeConfig.app.API}v2/admin/users/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getUsers()
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
