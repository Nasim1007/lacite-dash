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
      :items="reviews"
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
      title="Добавление отзыв"
      @hidden="resetModal"
      @ok="add"
    >
      <validation-observer ref="simpleRules">
        <b-col cols="12">

          <label for="input-default">Имя </label>
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              name="Имя"
              rules="required"
            >
              <b-form-input
                id="input-default"
                v-model="review.name"
                placeholder="Имя"
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
            label="Описание"
            label-for="largeInput"
          >
            <validation-provider
              #default="{ errors }"
              name="Описание"
              rules="required"
            >
              <b-form-input
                id="largeInput"
                v-model="review.content"
                size="lg"
                placeholder="Описание"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Оценка"
            label-for="largeInput"
          >
            <validation-provider
              #default="{ errors }"
              name="rate"
              rules="required"
            >
              <b-form-input
                id="slugInput"
                v-model="review.rate"
                size="lg"
                placeholder="Оценка"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Пол"
            label-for="largeInput"
          >
            <b-form-select
              v-model="review.gender"
              :options="options"
            />
          </b-form-group>
          <b-form-group
            label="Достижения"
            label-for="largeInput"
          >
            <validation-provider
              #default="{ errors }"
              name="position"
              rules="required"
            >
              <b-form-input
                id="slugInput"
                v-model="review.position"
                size="lg"
                placeholder="Достижения"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Изображения"
            label-for="largeInput"
          >
            <b-form-file
              v-model="review.image"
              size="lg"
              placeholder="Выберите изображение..."
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
                label="Имя"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Имя"
                  rules="required"
                >
                  <b-form-input
                    id="largeInput"
                    v-model="review.name"
                    size="lg"
                    placeholder="Имя"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Описание"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Описание "
                  rules="required"
                >
                  <b-form-input
                    id="largeInput"
                    v-model="review.content"
                    size="lg"
                    placeholder="Описание"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Оцента"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="rate"
                  rules="required"
                >
                  <b-form-input
                    id="slugInput"
                    v-model="review.rate"
                    size="lg"
                    placeholder="Оценка"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Пол"
                label-for="largeInput"
              >
                <b-form-select
                  v-model="review.gender"
                  :options="options"
                />
              </b-form-group>
              <b-form-group
                label="Достижения"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="position"
                  rules="required"
                >
                  <b-form-input
                    id="slugInput"
                    v-model="review.position"
                    size="lg"
                    placeholder="Достижения"
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
  BInputGroup,
  BInputGroupAppend,
  BModal,
  BRow,
  BTable,
  VBModal,
  BFormFile,
  BFormSelect,
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
    BInputGroup,
    BInputGroupAppend,
    BRow,
    BCol,
    BFormFile,
    BFormSelect,
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
      reviews: [],
      tableColumns: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'reviewer_name',
          label: 'Имя',
          sortable: true,
        },
        {
          key: 'content',
          label: 'Описание',
          sortable: true,
        },
        {
          key: 'reviewer_gender',
          label: 'пол',
          sortable: true,
        },
        {
          key: 'reviewer_position',
          label: 'Должность',
          sortable: true,
        },
        {
          key: 'star_rating',
          label: 'Оценка',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      review: {
        id: '',
        name: '',
        content: '',
        gender: '',
        position: '',
        rate: '',
        image: '',
      },
      options: [
        { value: null, text: 'Выберите пол' },
        { value: 'male', text: 'Мужчина' },
        { value: 'female', text: 'Женщина' },
      ],
    }
  },
  mounted() {
    this.getReviews()
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line no-alert
          alert('login successfully')
        }
      })
    },
    getReviews() {
      axios.get(`${$themeConfig.app.API}v2/admin/reviews`)
        .then(res => {
          this.reviews = res.data.data
          console.log(this.reviews)
        })
        .catch(er => {
          console.log(er)
        })
    },
    async add() {
      const myFormData = new FormData()
      myFormData.append('content', this.review.content)
      myFormData.append('reviewer_name', this.review.name)
      myFormData.append('star_rating', this.review.rate)
      myFormData.append('reviewer_gender', this.review.gender)
      myFormData.append('reviewer_position', this.review.position)
      myFormData.append('image', this.review.image)

      await axios.post(`${$themeConfig.app.API}v2/admin/reviews`, myFormData, {
        headers:
              {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
      })
        .then(() => {
          this.addStatus = true
          this.getReviews()
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
      this.review.id = ''
      this.review.name = ''
      this.review.content = ''
      this.review.rate = ''
      this.review.gender = ''
      this.review.position = ''
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
      myFormData.append('content', this.review.content)
      myFormData.append('reviewer_name', this.review.name)
      myFormData.append('star_rating', this.review.rate)
      myFormData.append('reviewer_gender', this.review.gender)
      myFormData.append('reviewer_position', this.review.position)
      // myFormData.append('image', this.review.image)
      myFormData.append('_method', 'put')
      // // Edit request
      if (this.reviews.id !== '') {
        await axios.post(`${$themeConfig.app.API}v2/admin/reviews/${this.review.id}`, myFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Accept: 'application/json',
          },
        })
          .then(() => {
            this.getReviews()
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
      this.review.id = data.id
      this.review.content = data.content
      this.review.name = data.reviewer_name
      this.review.rate = data.star_rating
      this.review.gender = data.reviewer_gender
      this.review.position = data.reviewer_position
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
            axios.delete(`${$themeConfig.app.API}v2/admin/reviews/${data.id}`)
              .then(() => {
                this.getReviews()
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
    // getBase64(file) {
    //   // eslint-disable-next-line no-unused-vars
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader()
    //     reader.onloadend = () => {
    //       resolve(reader.result)
    //     }
    //     reader.readAsDataURL(file)
    //   })
    // },
  },
}
</script>
