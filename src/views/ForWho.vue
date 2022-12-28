<template>
  <b-card>
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
      <b-col md="9">
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
                    v-model="who.name"
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
                    v-model="who.slug"
                    size="lg"
                    placeholder="Slug"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
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
                    v-model="who.name"
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
                    v-model="who.slug"
                    size="lg"
                    placeholder="Slug"
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
} from 'bootstrap-vue'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
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
          key: 'created_at',
          formatter: value => new Date(value).toLocaleString(),
          label: 'Создан',
          sortable: true,
        },
        {
          key: 'updated_at',
          formatter: value => new Date(value).toLocaleString(),
          label: 'Обнавлен',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Действия',
        },

      ],
      who: {
        id: '',
        name: '',
        slug: '',

      },
    }
  },
  mounted() {
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
    getWho() {
      axios.get(`${$themeConfig.app.API}v2/admin/for-who`)
        .then(res => {
          this.items = res.data.data
          console.log(this.items)
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.who.name)
      myFormData.append('slug', this.who.slug)
      await axios({
        method: 'POST',
        url: `${$themeConfig.app.API}v2/admin/for-who`,
        data: myFormData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      })
        .then(() => {
          this.addStatus = true
          this.getWho()
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
      this.who.name = ''
      this.who.id = ''
      this.who.slug = ''
    },
    // eslint-disable-next-line no-unused-vars
    handleOk(bvModalEvt) {
      this.handleEdit()
    },
    handleEdit() {
      // Edit request
      if (this.who.id !== '') {
        axios.put(`${$themeConfig.app.API}v2/admin/for-who/${this.who.id}`, {
          name: this.who.name,
          slug: this.who.slug,
          id: this.who.id,
        },
        {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        })
          .then(() => {
            this.getWho()
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
      this.who.name = data.name
      this.who.id = data.id
      this.who.slug = data.slug
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
            axios.delete(`${$themeConfig.app.API}v2/admin/for-who/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getWho()
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
