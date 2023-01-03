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
        <template
          #cell(categories)="data"
          text-field="name"
        >
          <div class="text-nowrap scroll">
            <b-badge
              v-for="item in data.item.categories"
              :key="item.id"
              variant="warning"
              class="badge-glow mr-1 scroll"
            >
              {{ item.name }}
            </b-badge>
          </div>
        </template>
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
      </b-table>
      <b-modal
        id="modal-add"
        ok-variant="warning"
        ok-title="Сохранить"
        modal-class="modal-warning"
        centered
        title="Добавление"
        @hidden="resetModal"
        @ok="add"
      >
        <validation-observer ref="simpleRules">
          <b-form>
            <b-col cols="12">

              <label for="input-default">Название</label>
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Название"
                  rules="required"
                >
                  <b-form-input
                    id="input-default"
                    v-model="main.name"
                    placeholder="Название"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="slug"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Slug"
                  rules="required"
                >
                  <b-form-input
                    id="slugInput"
                    v-model="main.slug"
                    size="lg"
                    placeholder="Slug"
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
                    v-model="main.selector"
                    :options="options"
                    text-field="name"
                    value-field="id"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-form>
        </validation-observer>
      </b-modal>

      <b-modal
        id="modal-warning-edit"
        ok-variant="warning"
        ok-title="Сохранить"
        modal-class="modal-warning"
        centered
        title="Редактирование"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <validation-observer ref="simpleRules">
          <b-form>
            <b-row>
              <b-col cols="12">
                <b-form-group
                  label="Название"
                  label-for="largeInput"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Название"
                    rules="required"
                  >
                    <b-form-input
                      id="largeInput"
                      v-model="main.name"
                      size="lg"
                      placeholder="Название"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="slug"
                  label-for="largeInput"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Slug"
                    rules="required"
                  >
                    <b-form-input
                      id="slugInput"
                      v-model="main.slug"
                      size="lg"
                      placeholder="Slug"
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
                      v-model="main.selector"
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

    </b-card>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import {
  BForm,
  BButton,
  BCard,
  BCol,
  BFormGroup,
  BFormInput,
  BModal,
  BRow,
  BTable,
  VBModal,
  BFormSelect,
  BBadge,
  BSpinner,
} from 'bootstrap-vue'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BFormSelect,
    BForm,
    ValidationProvider,
    ValidationObserver,
    BFormGroup,
    BFormInput,
    BButton,
    BTable,
    BCard,
    BModal,
    BRow,
    BCol,
    BBadge,
    BSpinner,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      options: [],
      passValue: '',
      username: '',
      required,
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
          key: 'categories',
          label: 'Категория',
          sortable: true,
        },

        {
          key: 'actions',
          label: 'Действия',
        },

      ],
      show: true,
      main: {
        id: '',
        name: '',
        slug: '',
        selector: '',

      },
    }
  },
  mounted() {
    this.getMCategory()
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
    getMCategory() {
      this.show = true
      axios.get(`${$themeConfig.app.API}v2/admin/main-category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.items = res.data.data
          this.show = false
        })
        .catch(er => {
          console.log(er)
          this.show = false
        })
    },
    getWho() {
      axios.get(`${$themeConfig.app.API}v2/admin/for-who`)
        .then(res => {
          this.options = res.data.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.main.name)
      myFormData.append('slug', this.main.slug)
      myFormData.append('categories', this.main.selector)
      await axios.post(`${$themeConfig.app.API}v2/admin/main-category`, myFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
        .then(() => {
          this.addStatus = true
          this.getMCategory()
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
      this.main.name = ''
      this.main.id = ''
      this.main.slug = ''
      this.main.selector = ''
    },
    handleOk() {
      this.handleEdit()
    },
    handleEdit() {
      // Edit request
      if (this.main.id !== '') {
        axios.post(`${$themeConfig.app.API}v2/admin/main-category/${this.main.id}`, {
          name: this.main.name,
          slug: this.main.slug,
          id: this.main.id,
          categories: this.main.selector,
          _method: 'put',
        })
          .then(() => {
            this.geMCategory()
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
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
    edit(data) {
      this.main.name = data.name
      this.main.id = data.id
      this.main.slug = data.slug
      this.main.selector = data.categories
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
            axios.delete(`${$themeConfig.app.API}v2/admin/main-category/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getMCategory()
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
<style lang="scss">
// @import '@core/scss/vue/libs/vue-select.scss';
.scroll{
  max-width: 250px;
  overflow: auto;
}

</style>
