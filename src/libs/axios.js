import Vue from 'vue'

// axios
import axios from 'axios'
import { $themeConfig } from '@themeConfig'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: $themeConfig.app.API,
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
})

Vue.prototype.$http = axiosIns

export default axiosIns
