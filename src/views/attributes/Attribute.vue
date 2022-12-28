<template>
  <b-card>
    <b-col>
      <b-button
        v-ripple.400="'rgba(255, 159, 67, 0.15)'"
        v-b-modal.modal-warningadd
        variant="outline-warning"
        class="m-1"
      >
        Добавить
      </b-button>
    </b-col>
    <b-table
      responsive="sm"
      :items="attributes"
      :fields="tableColumns"
    >
      <template #cell(attributes_value)="data">
        <div class="text-nowrap scroll">
          <b-badge
            v-for="item in data.item.values"
            :key="item.id"
            variant="success"
            class="badge-glow mr-1"
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
      id="modal-warning-edit"
      ok-variant="warning"
      ok-title="Сохранить"
      modal-class="modal-warning"
      centered
      title="Редактировать"
      @hidden="resetModal"
      @ok="handleOk"
      @prevent="validationForm"
    >
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Название Аттрибута"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Название"
                  rules="required"
                >
                  <b-form-input
                    id="largeInput"
                    v-model="attribute.name"
                    size="lg"
                    placeholder="Название Аттрибута"
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
                    v-model="attribute.slug"
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
      id="modal-warningadd"
      ok-variant="warning"
      ok-title="Сохранить"
      modal-class="modal-warning"
      centered
      title="Добавить"
      @hidden="resetModal"
      @ok="add"
      @prevent="validationForm"
    >
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Название Аттрибута"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Название"
                  rules="required"
                >
                  <b-form-input
                    id="largeInput"
                    v-model="attribute.name"
                    size="lg"
                    placeholder="Название Аттрибута"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>
    <b-pagination
      v-model="currentPage"
      hide-goto-end-buttons
      :total-rows="rows"
      :per-page="perPage"
      @input="getAttribute"
    />
  </b-card>
</template>

<script>
import {
  BButton,
  BCard,
  BCol,
  BFormGroup,
  BFormInput,
  BModal,
  BRow,
  BTable,
  VBModal,
  BBadge,
  BForm,
  BPagination,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { codeSeparated } from '../Pagination/code'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BForm,
    BFormInput,
    BFormGroup,
    BRow,
    BModal,
    BCol,
    BCard,
    BTable,
    BButton,
    BBadge,
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
      selected: null,
      options: [
        {
          value: null,
          text: 'Please select an option',
        },
        {
          value: 'a',
          text: 'Color',
        },
        {
          value: 'b',
          text: 'Size',
        },

      ],
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
          key: 'attributes_value',
          label: 'Значении атрибута',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      attributes: [],
      attribute: {
        id: '',
        name: '',
        slug: '',
      },
      codeSeparated,
      currentPage: 1,
      rows: 50,
      perPage: 15,
      // itemss: [
      //   {
      //     Name: 40,
      //     Slug: 'Dickerson',
      //     Values: 'Macdonald',
      //     Actions: 'ACTIONS',
      //   },
      //   {
      //     Name: 40,
      //     Slug: 'Dickerson',
      //     Values: 'Macdonald',
      //     Actions: 'ACTIONS',
      //   },
      // ],
    }
  },
  mounted() {
    this.getAttribute(1)
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
    handleOk() {
      this.handleEdit()
    },
    handleEdit() {
      // Edit request
      if (this.attribute.id !== '') {
        axios.put(`${$themeConfig.app.API}v2/admin/attributes/${this.attribute.id}`, {
          name: this.attribute.name,
          slug: this.attribute.slug,
          id: this.attribute.id,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
          .then(() => {
            this.getAttribute()
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
    },
    resetModal() {
      this.attribute.name = ''
      this.attribute.id = ''
      this.attribute.slug = ''
    },
    getAttribute(page) {
      axios.get(`${$themeConfig.app.API}v2/admin/attributes?per_page=${this.perPage}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.attributes = res.data.data
          this.rows = res.data.total
          this.perPage = res.data.per_page
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.attribute.name)
      await axios({
        method: 'post',
        url: `${$themeConfig.app.API}v2/admin/attributes`,
        data: myFormData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      })
        .then(() => {
          this.addStatus = true
          this.getAttribute()
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
            axios.delete(`${$themeConfig.app.API}v2/admin/attributes/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getAttribute()
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
  .scroll{
    max-width: 250px;
    overflow: auto;
  }
</style>
