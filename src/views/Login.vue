<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1" />
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            Добро пожаловать! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Авторизуйтесь чтобы войти
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginForm">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
              <!-- email -->
              <b-form-group
                label="Эл почтв"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Эл почта"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder=""
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Пароль</label>
                  <b-link :to="{name:'auth-forgot-password-v2'}">
                    <small>Забыли пароль?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Пароль"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder=""
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Запомнить
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="login"
              >
                Войти
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,
} from 'bootstrap-vue'
// eslint-disable-next-line no-unused-vars
import { required, email, password } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
// eslint-disable-next-line no-unused-vars
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
// eslint-disable-next-line no-unused-vars
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
// eslint-disable-next-line import/no-cycle
import router from '@/router'
import axios from 'axios'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          axios.post(`${$themeConfig.app.API}auth/login`, {
            email: this.userEmail,
            password: this.password,
          }).then(async response => {
            console.log(response)
            if (response.status === 200) {
              this.$bvToast.toast('Вы успешно авторизовались!', {
                title: 'Успешно',
                variant: 'success',
                solid: true,
              })
              useJwt.setToken(response.data.access_token)
              useJwt.setRefreshToken(response.data.access_token)
              localStorage.setItem('userData', JSON.stringify({
                token_type: response.data.token_type,
                role: response.data.user_data.role[0].key,
                name: response.data.user_data.name,
                ability: {
                  action: 'manage',
                  subject: 'all',
                },
                expires_at: '2023-10-10',
              }))

              router.push({ name: 'home' })
            } else {
              this.$bvToast.toast('Что-то пошло не так!', {
                title: 'Ошибка',
                variant: 'danger',
                solid: true,
              })
            }
          })
            .catch(() => {
              this.$bvToast.toast('Что-то пошло не так!', {
                title: 'Ошибка',
                variant: 'danger',
                solid: true,
              })
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
