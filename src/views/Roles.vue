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
        :items="roles"
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
                    v-model="role.name"
                    placeholder="Название"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Key"
                label-for="slug"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Key"
                  rules="required"
                >
                  <small class="text-danger">{{ errors[0] }}</small>
                  <b-form-input
                    id="key"
                    v-model="role.key"
                    placeholder="key"
                  />
                </validation-provider>
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
                    v-model="role.name"
                    placeholder="Название"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Key"
                label-for="slug"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Key"
                  rules="required"
                >
                  <small class="text-danger">{{ errors[0] }}</small>
                  <b-form-input
                    id="key"
                    v-model="role.key"
                    placeholder="key"
                  />
                </validation-provider>
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
      @input="getAdmins"
    />
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import {
  BTable, BCard, BDropdown, BFormInput, BFormGroup, VBModal, BModal, BRow, BCol, BButton,
  BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BBadge,
    ValidationProvider,
    ValidationObserver,
    BCard,
    BFormInput,
    BFormGroup,
    BTable,
    BRow,
    BCol,
    BButton,
    BModal,
    BDropdown,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      required,
      selected: [],
      roles: [],
      IMG_URL: $themeConfig.app.IMG_URL,
      tableColumns: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'key',
          label: 'Ключ',
          sortable: true,
        },
        {
          key: 'name',
          label: 'Название',
          sortable: true,
        },
      ],
      role: {
        id: '',
        name: '',
      },
    }
  },
  mounted() {
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
      axios.get(`${$themeConfig.app.API}v2/admin/roles`)
        .then(res => {
          this.roles = res.data.data
          console.log(res.data.data)
        })
        .catch(er => {
          console.log(er)
        })
    },

    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.role.name)
      myFormData.append('key', this.role.key)

      await axios.post(`${$themeConfig.app.API}v2/admin/roles`, myFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
        .then(() => {
          this.addStatus = true
          this.getRoles()
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
      this.role.name = ''
      this.role.id = ''
      this.role.name = ''
    },
    handleOk() {
      this.handleEdit()
    },
    async handleEdit() {
      const myFormData = new FormData()
      myFormData.append('name', this.role.name)
      myFormData.append('slug', this.role.key)
      myFormData.append('id', this.role.id)
      if (this.role.id !== '') {
        await axios({
          method: 'post',
          url: `${$themeConfig.app.API}v2/admin/discount/${this.role.id}`,
          data: myFormData,
          config: {
            headers: {
              // 'Content-Type': 'multipart/form-data',
              Accept: 'aplication/json',
            },
          },
        })
          .then(() => {
            this.getRoles()
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
      this.role.id = data.id
      this.role.name = data.name
      this.role.key = data.key
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
