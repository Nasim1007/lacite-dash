<!-- eslint-disable vue/require-v-for-key -->

<template>
  <b-card>
    <b-card-body>
      <b-row>
        <b-col>
          <h4>Скидка</h4>
        </b-col>
        <b-col class="right">
          <h4>{{ order.discount }}%</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4>Способ доставка</h4>
        </b-col>
        <b-col class="right">
          <h4>{{ order.shipping_type }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4>Способ оплата</h4>
        </b-col>
        <b-col class="right">
          <h4>{{ order.payment_method_id }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4>Итог</h4>
        </b-col>
        <b-col class="right">
          <h4>{{ order.total }} TJS</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4>Итог со скидка</h4>
        </b-col>
        <b-col class="right">
          <h4>{{ order.sub_total }} TJS</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4>Статус</h4>
        </b-col>
        <b-col class="right">
          <h4>{{ order.status_name }}</h4>
        </b-col>
      </b-row>
      <b-form-group>

        <b-form-select
          v-if="order.statuses"
          v-model="order.status_id"
          text-field="name"
          value-field="id"
          @change="onChange"
        >
          <option
            :value="null"
            disabled
          />
          <option
            v-for="status in this.order.statuses"
            :value="status.id"
          >
            {{ status.name }}
          </option>
        </b-form-select>
        <b-row class="mt-1">
          <b-col>
            <h4>Имя</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.user.name }}</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h4>Номер телефон</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.user.phone }}</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h4>Адрес доставка</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ order.user.address }}</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h4>Дата</h4>
          </b-col>
          <b-col class="right">
            <h4>{{ new Date(order.updated_at).toLocaleString() }}</h4>
          </b-col>
        </b-row>

      </b-form-group>
    </b-card-body>
    <b-table
      responsive="sm"
      :items="items"
      :fields="tableColumns"
    />
  </b-card>
</template>

<script>
import {
  BCardBody,
  BCard,
  BCol,
  BFormGroup,
  BRow,
  BTable,
  BFormSelect,
} from 'bootstrap-vue'

import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    BFormGroup,
    BCardBody,
    BCol,
    BRow,
    BCard,
    BTable,
    BFormSelect,
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
        status_key: '',
        status_id: '',
        status_name: '',
        sub_total: '',
        total: '',
        user_id: '',
        statuses: [],
        user: [],
      },
      tableColumns: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'item_id',
          label: 'id товарa',
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
        console.log('res', res)
        console.log('id', this.status)
      }).catch(er => {
        console.log(er)
      })
      this.getOrder()
    },
    async getStatuses() {
      await axios.get(`${$themeConfig.app.API}v2/admin/orders/${this.$route.params.id}`)
        .then(res => {
          this.statuses = res.data.data || []
        })
    },
    async getOrder() {
      await axios.get(`${$themeConfig.app.API}v2/admin/orders/${this.$route.params.id}`).then(res => {
        this.order = res.data.data
        this.items = this.order.items
        console.log('res', res.data.data)
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
