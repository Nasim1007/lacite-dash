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
        :items="productType"
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
                      v-model="typeInfo.name"
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
                      v-model="typeInfo.slug"
                      placeholder="Slug"
                      rows="3"
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
                      v-model="typeInfo.name"
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
                      v-model="typeInfo.slug"
                      placeholder="Slug"
                      rows="3"
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
    <b-pagination
      v-if="rows >= perPage"
      v-model="currentPage"
      hide-goto-end-buttons
      :total-rows="rows"
      :per-page="perPage"
      @input="getProductType"
    />
  </b-card>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BBadge, BForm, BTable, BCard, BDropdown, BFormInput, BFormGroup, VBModal, BModal, BRow, BCol, BButton, BPagination,
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
      productType: [],
      typeInfo: {
        id: '',
        name: '',
        slug: '',
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
          key: 'actions',
          label: 'Действия',
        },
      ],
      codeSeparated,
      currentPage: 1,
      rows: 14,
      perPage: 15,
    }
  },
  mounted() {
    this.getProductType(1)
  },
  methods: {
    getProductType(page) {
      axios.get(`${$themeConfig.app.API}v2/admin/product-type?page=${page}&per_page=${this.perPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.productType = res.data.data
          this.rows = res.data.tota
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.typeInfo.name)
      myFormData.append('slug', this.typeInfo.slug)

      await axios.post(`${$themeConfig.app.API}v2/admin/product-type`, myFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          this.addStatus = true
          this.getProductType()
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
      if (this.productType.id !== '') {
        axios.put(`${$themeConfig.app.API}v2/admin/product-type/${this.typeInfo.id}`, {
          name: this.typeInfo.name,
          slug: this.typeInfo.slug,
          id: this.typeInfo.id,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
          .then(() => {
            this.getProductType()
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
      this.typeInfo.name = data.name
      this.typeInfo.id = data.id
      this.typeInfo.slug = data.slug
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
            axios.delete(`${$themeConfig.app.API}v2/admin/product-type/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getProductType()
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
      this.typeInfo.name = ''
      this.typeInfo.id = ''
      this.typeInfo.slug = ''
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
