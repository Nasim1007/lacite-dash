import Vue from 'vue'
import VueRouter from 'vue-router'
// import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn } from '@/auth/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Главная',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Главная',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/attribute',
      name: 'attribute',
      component: () => import('@/views/attributes/Attribute.vue'),
      meta: {
        pageTitle: 'Атрибуты',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Создание атрибута',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/brands',
      name: 'brands',
      component: () => import('@/views/Brands.vue'),
      meta: {
        pageTitle: 'Бренды',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Бренды',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/product/edit/:id',
      name: 'edit-product',
      component: () => import('@/views/products/EditV2Product.vue'),
      meta: {
        pageTitle: 'Редактировать товар',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Редактировать товар',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/views/Category.vue'),
      meta: {
        pageTitle: 'Категория',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Категория',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/maincategory',
      name: 'MainCategory',
      component: () => import('@/views/MainCategory.vue'),
      meta: {
        pageTitle: 'Меню категорий',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Меню категорий',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/subcategory',
      name: 'SubCategory',
      component: () => import('@/views/products/SubCategory.vue'),
      meta: {
        pageTitle: 'Подкатегория',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Подкатегория',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/product/add/',
      name: 'AddProduct',
      component: () => import('@/views/products/AddProduct.vue'),
      meta: {
        pageTitle: 'Добавить товар',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Добавить товар',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/attribute/attribute-value',
      name: 'AttributeValue',
      // eslint-disable-next-line import/extensions
      component: () => import('@/views/attributes/AttributeValue'),
      meta: {
        pageTitle: 'Атрибута',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Значиние атрибута',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/attribute/product-type',
      name: 'product-type',
      // eslint-disable-next-line import/extensions
      component: () => import('@/views/products/ProductType'),
      meta: {
        pageTitle: 'Атрибута',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Тип товар',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/ForWho',
      name: 'ForWho',
      component: () => import('@/views/ForWho.vue'),
      meta: {
        pageTitle: 'Для кого',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Для кого',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/discount',
      name: 'discount',
      component: () => import('@/views/Discount.vue'),
      meta: {
        pageTitle: 'Скидки',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Скидки',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/admins',
      name: 'admins',
      component: () => import('@/views/Admins.vue'),
      meta: {
        pageTitle: 'Админы',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Админы',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import('@/views/Roles.vue'),
      meta: {
        pageTitle: 'Роли',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Роли',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/orders-list',
      name: 'orders',
      component: () => import('@/views/OrderList.vue'),
      meta: {
        pageTitle: 'Список заказов',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Заказы',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/order/:id',
      name: 'order',
      component: () => import('@/views/OrderPage.vue'),
      meta: {
        pageTitle: 'Заказы',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Заказ',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('@/views/Reviews.vue'),
      meta: {
        pageTitle: 'Отзывы',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Отзывы',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/stores',
      name: 'stores',
      component: () => import('@/views/Stores.vue'),
      meta: {
        pageTitle: 'Магазины',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Магазины',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/Users.vue'),
      meta: {
        pageTitle: 'Пользователы',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Пользователы',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/banners',
      name: 'banners',
      component: () => import('@/views/Banners.vue'),
      meta: {
        pageTitle: 'Баннеры',
        requiresAuth: true,
        breadcrumb: [
          {
            text: 'Баннеры',
            active: true,
            resource: 'Auth',
            action: 'read',
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        action: 'read',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn) {
      next({ name: 'auth-login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

// router.beforeEach((to, _, next) => {
//   const isLoggedIn = isUserLoggedIn()
//   const userData = getUserData()
//   // if (userData !== null) {
//   //   if (userData.position !== 0) {
//   //     console.log('userData.position', userData.position)
//   //     return next({ name: 'misc-not-authorized' })
//   //   }
//   // }
//   debugger
//   // if (!canNavigate(to)) {
//   // Redirect to login if not logged in
//   if (!isLoggedIn) return next({ name: 'auth-login' })
//
//   // If logged in => not authorized
//   // return next({ name: 'error-404' })
//   // }
//
//   // // Redirect if logged in
//   // if (to.meta.redirectIfLoggedIn && isLoggedIn) {
//   //   next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
//   // }
//
//   return next({ name: 'home' })
// })

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
