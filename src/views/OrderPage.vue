<!-- eslint-disable vue/require-v-for-key -->

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
      <b-card-body>
        <b-row class="border-bottom-secondary mb-1">
          <b-col>
            <h4>Скидка</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.discount }}%</h4>
          </b-col>
        </b-row>
        <b-row class="border-bottom-secondary mb-1">
          <b-col>
            <h4>Способ доставка</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.shipping_type }}</h4>
          </b-col>
        </b-row>
        <b-row class="border-bottom-secondary mb-1">
          <b-col>
            <h4>Способ оплата</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.payment.name }}</h4>
          </b-col>
        </b-row>
        <b-row class="border-bottom-secondary mb-1">
          <b-col>
            <h4>Итог</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.total }} TJS</h4>
          </b-col>
        </b-row>
        <b-row
          style="margin-bottom: 8px;"
          class="border-bottom-secondary"
        >
          <b-col>
            <h4>Итог со скидка</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.sub_total }} TJS</h4>
          </b-col>
        </b-row>
        <b-row class="mb-1 border-bottom-secondary align-items-center">
          <b-col>
            <h4>Статус</h4>
          </b-col>
          <b-col class="right">
            <!-- <h4>{{ order.status_name }}</h4> -->
            <b-form-select
              v-model="order.status_id"
              text-field="name"
              value-field="id"
              style="margin-bottom: 8px;"
              @change="onChange"
            >
              <option
                :value="null"
                disabled
              >
                Статус заявки
              </option>
              <option
                v-for="status in this.order.statuses"
                :value="status.id"
              >
                {{ status.name }}
              </option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row class="mb-1 border-bottom-secondary">
          <b-col>
            <h4>Имя</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.user.name }}</h4>
          </b-col>
        </b-row>
        <b-row class="mb-1 border-bottom-secondary">
          <b-col>
            <h4>Номер телефон</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.user.phone }}</h4>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col>
            <h4>Город</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.user.address }}</h4>
          </b-col>
        </b-row> -->
        <b-row class="mb-1 border-bottom-secondary">
          <b-col>
            <h4>Адрес доставка</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.shipping_address }}</h4>
          </b-col>
        </b-row>
        <b-row class="mb-1 border-bottom-secondary">
          <b-col>
            <h4>Дата</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ new Date(order.updated_at).toLocaleString() }}</h4>
          </b-col>
        </b-row>
        <b-row class="border-bottom-secondary">
          <b-col>
            <h4>Комментария</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.comment }}</h4>
          </b-col>
        </b-row>
      </b-card-body>
      <b-table
        responsive="sm"
        :items="items"
        :fields="tableColumns"
      />
    </b-card>
  </div>
</template>

<script>
import {
  BCardBody,
  BCard,
  BCol,
  BRow,
  BTable,
  BFormSelect,
  BSpinner,
} from 'bootstrap-vue'

import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardBody,
    BCol,
    BRow,
    BCard,
    BTable,
    BFormSelect,
    BSpinner,
  },
  data() {
    return {
      user: [],
      items: [],
      status: '',
      order: {
        id: '',
        discount: '',
        payment_method_id: '',
        shipping_type: '',
        shipping_address: '',
        status_key: '',
        status_id: '',
        status_name: '',
        sub_total: '',
        total: '',
        user_id: '',
        statuses: [],
        user: [],
      },
      show: true,
      tableColumns: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'item_id',
          label: 'Код',
          sortable: true,
        },
        {
          key: 'attribute_name',
          label: 'Атрибут',
          sortable: true,
        },
        {
          key: 'item_name',
          label: 'Название',
          sortable: true,
        },
        {
          key: 'item_price',
          label: 'Цена',
          sortable: true,
        },
        {
          key: 'item_quantity',
          label: 'Количество',
          sortable: true,
        },
      ],
    }
  },
  computed: {

  },
  mounted() {
    this.getOrder()
  },
  methods: {
    async onChange() {
      console.log('status')
      await axios.put(`${$themeConfig.app.API}v2/admin/orders/${this.$route.params.id}`, {
        status_id: this.order.status_id,
      }).then(res => {
        console.log(res)
      }).catch(er => {
        console.log(er)
      })
      this.getOrder1()
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Успешно',
          text: 'Статус успешно изменены',
          icon: 'CheckSquareIcon',
          variant: 'success',
        },
      })
    },
    async getStatuses() {
      await axios.get(`${$themeConfig.app.API}v2/admin/orders/${this.$route.params.id}`)
        .then(res => {
          this.statuses = res.data.data || []
        })
    },
    async getOrder() {
      this.show = true
      await axios.get(`${$themeConfig.app.API}v2/admin/orders/${this.$route.params.id}`).then(res => {
        this.order = res.data.data
        this.items = this.order.items
        this.show = false
      }).catch(er => {
        console.log(er)
      })
    },
    async getOrder1() {
      await axios.get(`${$themeConfig.app.API}v2/admin/orders/${this.$route.params.id}`).then(res => {
        this.order = res.data.data
        this.items = this.order.items
        this.show = false
      }).catch(er => {
        console.log(er)
      })
    },
  },
}

</script>
<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';
.right {
  text-align: right !important;
}
</style>
