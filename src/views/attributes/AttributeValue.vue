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
        :items="values"
        :fields="tableColumns"
        primary-key="id"
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
              class="btn-icon "
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
        <template #cell(parent_id)="data">
          <div class="text-nowrap">
            <b-badge
              variant="warning"
              class="badge-glow"
            >
              {{ data.item.type.name }}
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
                      v-model="attribute.name"
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
                      v-model="attribute.slug"
                      placeholder="Slug"
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
                    v-model="attribute.parent_id"
                    :options="attributes"
                    value-field="id"
                    text-field="name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
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
                      v-model="attribute.name"
                      placeholder="Название"
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
                      v-model="attribute.slug"
                      placeholder="Slug"
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
                    v-model="attribute.parent_id"
                    :options="attributes"
                    value-field="id"
                    text-field="name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
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
  BForm, BBadge, BFormSelect, BTable, BAlert, BCard, BDropdown, BFormFile, BFormInput, BFormGroup, VBModal, BModal, BRow, BCol, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BForm,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BFormSelect,
    BBadge,
    BCard,
    // eslint-disable-next-line vue/no-unused-components
    BFormFile,
    BFormInput,
    BFormGroup,
    BTable,
    BRow,
    BCol,
    BButton,
    // eslint-disable-next-line vue/no-unused-components
    VBModal,
    BModal,
    BDropdown,
    // eslint-disable-next-line vue/no-unused-components
    BAlert,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      attributes: [],
      values: [],
      items: [],
      attribute: {
        id: '',
        name: '',
        slug: '',
        parent_id: '',
      },
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
          key: 'parent_id',
          label: 'Родительский элемент',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      selected: null,
      value: ['apple', 'orange'],
    }
  },
  mounted() {
    this.getAttribute()
    this.getValues()
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

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleEdit()
    },
    resetModal() {
      this.attribute.name = ''
      this.attribute.id = ''
      this.attribute.slug = ''
      this.attribute.parent_id = ''
    },
    getAttribute() {
      axios.get(`${$themeConfig.app.API}v2/admin/attributes`)
        .then(res => {
          this.attributes = res.data.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    getValues() {
      axios.get(`${$themeConfig.app.API}v2/admin/values`)
        .then(res => {
          this.values = res.data.data
        })
        .catch(er => {
          console.log(er)
        })
    },
    handleEdit() {
      // Edit request
      if (this.attribute.id !== '') {
        axios.put(`${$themeConfig.app.API}v2/admin/attributes/${this.attribute.id}`, {
          name: this.attribute.name,
          slug: this.attribute.slug,
          id: this.attribute.id,
          parent_id: this.attribute.parent_id,
        })
          .then(() => {
            this.getValues()
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
      // this.$nextTick(() => {
      //   this.$refs['my-modal'].toggle('#toggle-btn')
      // })
    },
    edit(data) {
      this.attribute.name = data.name
      this.attribute.id = data.id
      this.attribute.slug = data.slug
      this.attribute.parent_id = data.type.id
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
            axios.delete(`${$themeConfig.app.API}v2/admin/attributes/${data.id}`)
              .then(() => {
                this.getValues()
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
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.attribute.name)
      myFormData.append('slug', this.attribute.slug)
      myFormData.append('parent_id', this.attribute.parent_id)
      await axios({
        method: 'post',
        url: `${$themeConfig.app.API}v2/admin/attributes`,
        data: myFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(() => {
          this.addStatus = true
          this.getValues()
          // this.getAttribute()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Успешно',
              text: 'Запись успешно добавлена',
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
  },
}
</script>
