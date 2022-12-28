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
        :fields="tableColumns"
        responsive="sm"
        :items="SubCategories"
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
          #cell(parent_id)="data"
          text-field="name"
        >
          <div class="text-nowrap">
            <b-badge
              variant="warning"
              class="badge-glow"
            >
              {{ data.item.category.name }}
            </b-badge>
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
        @prevent="validationForm"
        @hidden="resetModal"
        @ok="add"
      >
        <validation-observer ref="simpleRules">
          <b-form>
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
                      v-model="subcategory.name"
                      placeholder="Название"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Slug"
                  label-for="textSlug"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Slug"
                    rules="required"
                  >
                    <b-form-input
                      id="textSlug"
                      v-model="subcategory.slug"
                      placeholder="Slug"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
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
                      v-model="subcategory.description"
                      placeholder="Описание"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <validation-provider
                  #default="{ errors }"
                  name="Категория"
                  rules="required"
                >
                  <b-form-select
                    v-model="subcategory.parent_id"
                    value-field="id"
                    text-field="name"
                    :options="categories"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <!-- <b-col cols="12">
                <validation-provider #default="{ errors }" name="Для кого" rules="required">
                  <b-form-select v-model="subcategory.for_who" value-field="id" text-field="name" :options="options" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col> -->
            </b-row>
          </b-form>
        </validation-observer>
      </b-modal>
      <b-modal
        id="modal-primaryedit"
        ok-title="Сохранить"
        cancel-title="Закрыть"
        modal-class="modal-primary"
        centered
        title="Редактирование"
        @prevent="validationForm"
        @ok="handleEdit"
        @hidden="resetModal"
      >
        <validation-observer ref="simpleRules">
          <b-form>
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
                      v-model="subcategory.name"
                      placeholder="Название"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Slug"
                  label-for="textSlug"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Slug"
                    rules="required"
                  >
                    <b-form-input
                      id="textSlug"
                      v-model="subcategory.slug"
                      placeholder="Slug"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
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
                      v-model="subcategory.description"
                      placeholder="Описание"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <validation-provider
                  #default="{ errors }"
                  name="Категория"
                  rules="required"
                >
                  <b-form-select
                    v-model="subcategory.parent_id"
                    value-field="id"
                    text-field="slug"
                    :options="categories"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <!-- <b-col cols="12">
                <validation-provider #default="{ errors }" name="Для кого" rules="required">
                  <b-form-select v-model="subcategory.for_who" value-field="id" text-field="name" :options="options" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col> -->
            </b-row>
          </b-form>
        </validation-observer>
      </b-modal>
    </div>
    <b-pagination
      v-model="currentPage"
      hide-goto-end-buttons
      :total-rows="rows"
      :per-page="perPage"
      @input="getSubCategories"
    />
  </b-card>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import {
  BBadge, BForm, BFormTextarea, BFormSelect, BTable, BCard, BDropdown, BFormInput, BFormGroup, VBModal, BModal, BRow, BCol, BButton, BPagination,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { codeSeparated } from '../Pagination/code'

export default {
  components: {
    BForm,
    ValidationProvider,
    ValidationObserver,
    BBadge,
    BFormTextarea,
    BFormSelect,
    BCard,
    BFormInput,
    BFormGroup,
    BTable,
    BRow,
    BCol,
    BButton,
    BModal,
    BDropdown,
    BPagination,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      passValue: '',
      username: '',
      required,
      SubCategories: [],
      subcategory: {
        id: '',
        name: '',
        slug: '',
        description: '',
        parent_id: '',
        // for_who: ''
      },
      selected: null,
      categories: [],
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
          key: 'description',
          label: 'Описание',
          sortable: true,
        },
        {
          key: 'parent_id',
          label: 'Родительский элемент',
          sortable: true,
        },
        // {
        //   key: 'for_who',
        //   label: 'Для кого',
        //   sortable: true,
        // },
        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      codeSeparated,
      currentPage: 1,
      rows: 50,
      perPage: 15,
    }
  },
  mounted() {
    this.getSubCategories(1)
    this.getWho()
    this.getCategories()
  },
  methods: {
    getCategories() {
      axios.get(`${$themeConfig.app.API}v2/admin/categories?per_page=100`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.categories = res.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    getSubCategories(page) {
      axios.get(`${$themeConfig.app.API}v2/admin/subcategories?page=${page}&perPage=${this.perPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.SubCategories = res.data.data
          this.rows = res.data.total
          this.perPage = res.data.per_page
        })
        .catch(er => {
          console.log(er)
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
      myFormData.append('name', this.subcategory.name)
      myFormData.append('slug', this.subcategory.slug)
      myFormData.append('description', this.subcategory.description)
      myFormData.append('parent_id', this.subcategory.parent_id)
      // myFormData.append('for_whos_id', this.subcategory.for_who)
      await axios.post(`${$themeConfig.app.API}v2/admin/subcategories`, myFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          this.addStatus = true
          this.getSubCategories()
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
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleEdit()
    },
    handleEdit() {
      // Edit request
      if (this.subcategory.id !== '') {
        axios.put(`${$themeConfig.app.API}v2/admin/subcategories/${this.subcategory.id}`, {
          name: this.subcategory.name,
          slug: this.subcategory.slug,
          description: this.subcategory.description,
          id: this.subcategory.id,
          parent_id: this.subcategory.parent_id,
          // for_who: this.subcategory.for_who
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
          .then(() => {
            this.getSubCategories()
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
    },
    edit(data) {
      this.subcategory.name = data.name
      this.subcategory.id = data.id
      this.subcategory.slug = data.slug
      this.subcategory.parent_id = data.parent_id
      this.subcategory.description = data.description
      // this.subcategory.for_who = data.for_whos_id
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
                this.getSubCategories()
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

    resetModal() {
      this.subcategory.name = ''
      this.subcategory.id = ''
      this.subcategory.slug = ''
      this.subcategory.parent_id = ''
      this.subcategory.description = ''
      // this.subcategory.for_who = ''
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          alert('login successfully')
        }
      })
    },

  },

}
</script>
