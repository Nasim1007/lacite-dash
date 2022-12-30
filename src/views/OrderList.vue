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
      <!-- <b-overlay :show="show" class="d-inline-block" opacity="0" color=""> -->
      <b-card>
        <b-row>
          <!-- <b-col
          md="3"
          class="mb-1"
        >
          <b-input-group>
            <b-form-input placeholder="Фильтр" />
            <b-input-group-append>
              <b-button variant="outline-primary">
                Поиск
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col> -->
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
            text-field="items.length"
            class="text-center"
          >
            <p>{{ console.log(data.items) }}</p>
          </template>
          <template v-slot:cell(actions)="data">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary  "
              class="btn-icon mr-1"
              :to="{ name: 'order', params: { id: data.item.id } }"
            >
              <feather-icon icon="EyeIcon" />
            </b-button>
          </template>

        </b-table>
      </b-card>
      <b-pagination
        v-if="rows >= perPage"
        v-model="currentPage"
        hide-goto-end-buttons
        :total-rows="rows"
        :per-page="perPage"
        @input="getOrders"
      />
    <!-- </b-overlay> -->
    </b-card>
  </div>
</template>

<script>
import {
  BButton,
  BCol,
  BModal,
  BRow,
  BTable,
  VBModal,
  BCard,
  BFormSelect,
  BPagination,
  BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import { codeSeparated } from './Pagination/code'

export default {

  components: {
    // eslint-disable-next-line vue/no-unused-components
    VBModal,
    // eslint-disable-next-line vue/no-unused-components
    BModal,
    BTable,
    BRow,
    BCol,
    BCard,
    BButton,
    BFormSelect,
    BPagination,
    BSpinner,

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
        { key: 'user.name', label: 'Имя', sortable: true },
        // { key: 'payment_method_id', label: 'Способ оплата', sortable: true },
        { key: 'shipping_type', label: 'Доставка', sortable: true },
        // { key: 'discount', label: 'Скидка' },
        // { key: 'total', label: 'Итог' },
        { key: 'user.address', label: 'Город  ' },
        { key: 'user.phone', label: 'Телефон' },
        { key: 'status_name', label: 'Статус' },
        {
          key: 'items.length',
          label: 'Кол. товары',
        },
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
      show: true,
      codeSeparated,
      currentPage: 1,
      rows: 50,
      perPage: 13,
    }
  },
  mounted() {
    this.getOrders(1)
  },
  methods: {
    showVisible() {
      this.dialogVisible = true
    },
    getOrders(page) {
      this.show = true
      axios.get(`${$themeConfig.app.API}v2/admin/orders${this.selected === null ? '?' : `?status=${this.selected}&`}per_page=${this.perPage}&page=${page}`).then(res => {
        this.orders = res.data.data
        this.rows = res.data.meta.total
        this.perPage = res.data.meta.per_page
        this.show = false
      }).catch(er => {
        console.log(er)
        this.show = false
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
