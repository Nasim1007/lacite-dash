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
        :items="items"
        :fields="tableColumns"
      >
        <template #cell(icon)="data">
          <b-avatar
            v-if="data.item.icon"
            class="mr-1"
            :src="`${IMG_URL}${data.item.icon}`"
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
          #cell(for_who)="data"
          text-field="name"
        >
          <div class="text-nowrap">
            <b-badge
              variant="warning"
              class="badge-glow"
            >
              {{ data && data.item && data.item.for_who && data.item.for_who.id && data.item.for_who.name }}
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
        <b-row>
          <b-col cols="12">
            <b-form-group>
              <b-form-file
                v-model="category.file"
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
              <b-form-input
                id="text"
                v-model="category.name"
                placeholder="Название"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal
        id="modal-primaryedit"
        ok-title="Сохранить"
        cancel-title="Закрыть"
        modal-class="modal-primary"
        centered
        title="Редактирование"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <validation-observer ref="simpleRules">
          <b-form>
            <b-row>
              <b-col cols="12">
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="Название"
                    rules="required"
                  >
                    <b-form-file
                      v-model="category.file"
                      size="lg"
                      placeholder="Выберите изображение..."
                      drop-placeholder="Slide..."
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
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
                      v-model="category.name"
                      placeholder="Название"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Для кого">
                  <validation-provider
                    #default="{ errors }"
                    name="Для кого"
                    rules="required"
                  >
                    <b-form-select
                      v-model="category.for_whos_id"
                      :options="options"
                      text-field="name"
                      value-field="id"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-modal>
    </div>
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// eslint-disable-next-line no-unused-vars
import { required } from '@validations'
import {
  BCardCode, BFormSelect, BTable, BForm, BCard, BDropdown, BFormFile, BFormInput, BFormGroup, VBModal, BModal, BRow, BCol, BButton, BAvatar, BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BBadge,
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
      // for_whos_id:[],
      selected: [],
      options: [],
      IMG_URL: $themeConfig.app.IMG_URL,
      items: [],
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
          key: 'for_who',
          label: 'Для кого',
          sortable: true,
        },
        {
          key: 'icon',
          label: 'Изображение',
          sortable: true,
        },

        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      category: {
        id: '',
        name: '',
        slug: '',
        file: '',
        for_whos_id: '',
      },
    }
  },
  mounted() {
    this.getCategories()
    this.getWho()
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
    getCategories() {
      axios.get(`${$themeConfig.app.API}v2/admin/all_categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.items = res.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    getWho() {
      axios.get(`${$themeConfig.app.API}v2/admin/for-who`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.options = res.data.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.category.name)
      myFormData.append('for_whos_id', this.category.for_whos_id)
      if (this.category.file) {
        myFormData.append('icon', `${await this.getBase64(this.category.file)}`)
      }
      await axios.post(`${$themeConfig.app.API}v2/admin/categories`, myFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(() => {
          this.addStatus = true
          this.getCategories()
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
      this.category.name = ''
      this.category.id = ''
      this.category.slug = ''
      this.category.file = ''
      this.category.for_whos_id = ''
    },
    // eslint-disable-next-line no-unused-vars
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleEdit()
    },
    async handleEdit() {
      // Edit request
      const myFormData = new FormData()
      myFormData.append('name', this.category.name)
      if (this.category.file) {
        myFormData.append('icon', `${await this.getBase64(this.category.file)}`)
      }
      myFormData.append('slug', this.category.slug)
      myFormData.append('for_whos_id', this.category.for_whos_id)
      myFormData.append('id', this.category.id)
      myFormData.append('_method', 'PUT')
      if (this.category.id !== '') {
        await axios.post(`${$themeConfig.app.API}v2/admin/categories/${this.category.id}`, myFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept-Language': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
          //  (`${$themeConfig.app.API}v2/admin/categories/${this.category.id}`, myFormData)
          .then(() => {
            this.getCategories()
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
      this.category.name = data.name
      this.category.id = data.id
      this.category.slug = data.slug
      this.category.file = data.file
      this.category.for_whos_id = data.for_whos_id
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
