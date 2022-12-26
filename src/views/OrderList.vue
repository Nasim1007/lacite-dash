<template>
  <b-card>
    <b-card>
      <b-row>
        <b-col
          md="3"
          class="mb-1"
        >
          <!-- button on right -->
          <b-input-group>
            <b-form-input placeholder="Фильтр" />
            <b-input-group-append>
              <b-button variant="outline-primary">
                Поиск
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col
          md="9"
          class="d-flex justify-content-end"
        >
          <b-form-select
            v-model="selected"
            :options="options"
            @change="getOrders"
          />

        </b-col>
      </b-row>

      <b-table
        responsive="sm"
        :items="orders"
        :fields="tableColumns"
      >
        <template
          #cell(items)="data"
          text-field="items"
        >
          <div class="text-nowrap}">
            <b-badge
              v-for="item in data.item.items"
              :key="item.id"
              variant="warning"
              class="badge-glow mr-1 d-flex wrap"
            >
              {{ item.item_id }}
            </b-badge>
          </div>
        </template>

        <template v-slot:cell(actions)="data">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="warning"
            class="btn-icon mr-1"
            :to="{ name: 'order', params: { id: data.item.id } }"
          >
            <feather-icon icon="Edit2Icon" />
          </b-button>
        </template>

      </b-table>
    </b-card>
  </b-card>
</template>

<script>
import {
  BBadge,
  BButton,
  BCol,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BModal,
  BRow,
  BTable,
  VBModal,
  BCard,
  BFormSelect,
} from 'bootstrap-vue'
// import MyDiolog from '@/@core/components/MyDiolog.vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import { $themeConfig } from '@themeConfig'
// eslint-disable-next-line import/extensions
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {

  components: {
    // eslint-disable-next-line vue/no-unused-components
    VBModal,
    // eslint-disable-next-line vue/no-unused-components
    BModal,
    BBadge,
    BTable,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BRow,
    BCol,
    BCard,
    BButton,
    BFormGroup,
    BFormSelect,

  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      dialogVisible: false,
      orders: [],
      tableColumns: [
        { key: 'id', label: '#', sortable: true },
        { key: 'user_id', label: 'Имя', sortable: true },
        // { key: 'payment_method_id', label: 'Способ оплата', sortable: true },
        { key: 'shipping_type', label: 'Адресь', sortable: true },
        // { key: 'discount', label: 'Скидка' },
        // { key: 'total', label: 'Итог' },
        { key: 'sub_total', label: 'Итог со скидка' },

        { key: 'status_name', label: 'Действия' },
        { key: 'sub_total', label: 'Действия' },
        { key: 'items', label: 'Товары' },
        { key: 'actions', label: 'Действия' },
      ],
      selected: null,
      options: [
        { value: null, text: 'Сортировать' },
        { value: 'new', text: 'Новая заявка' },
        { value: 'reviewing', text: 'В обработке' },
        { value: 'delivering', text: 'Доставка' },
        { value: 'delivered', text: 'Доставка выполнена' },
        { value: 'completed', text: 'Успешно завершено' },
        { value: 'cancelled', text: 'Отмена заявки' },
      ],
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    showVisible() {
      this.dialogVisible = true
    },
    getOrders() {
      axios.get(`${$themeConfig.app.API}v2/admin/orders${this.selected === null ? '' : `?status=${this.selected}`}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then(res => {
        this.orders = res.data.data
      }).catch(er => {
        console.log(er)
      })
    },
    async getStatuses() {
      await axios.get(`${$themeConfig.app.API}v2/admin/orders/${this.$route.params.id}`)
        .then(res => {
          this.statuses = res.data.data || []
        })
    },
  },
}
</script>
