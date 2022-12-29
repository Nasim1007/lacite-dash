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
      <template #cell(logo)="data">
        <b-avatar
          v-if="data.item.logo"
          class="mr-1"
          :src="`${IMG_URL}${data.item.logo}`"
        />
      </template>
    </b-table>
    <b-modal
      id="modal-add"
      ok-variant="warning"
      ok-title="Сохранить"
      modal-class="modal-warning"
      centered
      title="Добавление бренда"
      @hidden="resetModal"
      @ok="add"
    >
      <validation-observer ref="simpleRules">
        <b-col cols="12">

          <label for="input-default">Название Бренда</label>
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Название"
              rules="required"
            >
              <b-form-input
                id="input-default"
                v-model="brand.name"
                placeholder="Название Бренда"
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
            label="Описание Бренда"
            label-for="largeInput"
          >
            <validation-provider
              #default="{ errors }"
              name="Описание Бренда"
              rules="required"
            >
              <b-form-input
                id="largeInput"
                v-model="brand.description"
                size="lg"
                placeholder="Описание Бренда"
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
                v-model="brand.slug"
                size="lg"
                placeholder="Slug"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

        </b-col>
        <b-col cols="12">
          <b-form-group>
            <b-form-file
              v-model="brand.file"
              size="lg"
              placeholder="Выберите изображение..."
              drop-placeholder="Slide..."
            />
          </b-form-group>

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
                label="Название Бренда"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Название Бренда"
                  rules="required"
                >
                  <b-form-input
                    id="largeInput"
                    v-model="brand.name"
                    size="lg"
                    placeholder="Название Бренда"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Описание Бренда"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Описание Бренда"
                  rules="required"
                >
                  <b-form-input
                    id="largeInput"
                    v-model="brand.description"
                    size="lg"
                    placeholder="Описание Бренда"
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
                    v-model="brand.slug"
                    size="lg"
                    placeholder="Slug"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-file
                  v-model="brand.file"
                  size="lg"
                  placeholder="Выберите изображение..."
                  drop-placeholder="Slide..."
                />
              </b-form-group>

            </b-col>
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
      @input="getBrands"
    />
  </b-card>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import Ripple from 'vue-ripple-directive'
import {
  BAvatar,
  BForm,
  BButton,
  BCard,
  BCol,
  BFormGroup,
  BFormInput,
  BModal,
  BRow,
  BTable,
  BFormFile,
  VBModal,
  BPagination,
} from 'bootstrap-vue'
import axios from 'axios'
import { $themeConfig } from '@themeConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { codeSeparated } from './Pagination/code'

export default {
  components: {
    BFormFile,
    BAvatar,
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
          key: 'description',
          label: 'Описание',
          sortable: true,
        },
        {
          key: 'slug',
          label: 'Slug',
          sortable: true,
        },
        {
          key: 'logo',
          label: 'Изображения',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      brand: {
        id: '',
        name: '',
        slug: '',
        description: '',
        file: '',
      },
      codeSeparated,
      currentPage: 1,
      rows: 50,
      perPage: 15,
    }
  },
  mounted() {
    this.getBrands(1)
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
    getBrands(page) {
      axios.get(`${$themeConfig.app.API}v2/admin/brands?per_page=${this.perPage}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(res => {
          this.items = res.data.data
          this.rows = res.data.total
          this.perPage = res.data.per_page
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('name', this.brand.name)
      myFormData.append('slug', this.brand.slug)
      myFormData.append('description', this.brand.description)
      if (this.brand.file) {
        myFormData.append('logo', `${await this.getBase64(this.brand.file)}`)
      }
      await axios.post(`${$themeConfig.app.API}v2/admin/brands`, myFormData, {
        headers:
            {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
      })
        .then(() => {
          this.addStatus = true
          this.getBrands()
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
      this.brand.name = ''
      this.brand.id = ''
      this.brand.slug = ''
      this.brand.description = ''
      this.brand.file = ''
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
      myFormData.append('name', this.brand.name)
      myFormData.append('slug', this.brand.slug)
      myFormData.append('description', this.brand.description)
      myFormData.append('id', this.brand.id)
      if (this.brand.file) {
        myFormData.append('logo', `${await this.getBase64(this.brand.file)}`)
      }
      myFormData.append('_method', 'put')
      // Edit request
      if (this.brand.id !== '') {
        await axios.post(`${$themeConfig.app.API}v2/admin/brands/${this.brand.id}`, myFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
          .then(() => {
            this.getBrands()
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
      this.brand.name = data.name
      this.brand.id = data.id
      this.brand.slug = data.slug
      this.brand.description = data.description
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
            axios.delete(`${$themeConfig.app.API}v2/admin/brands/${data.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
              .then(() => {
                this.getBrands()
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
