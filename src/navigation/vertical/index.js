export default [
  {
    title: 'Товары',
    route: 'home',
    icon: 'BoxIcon',
  },
  {
    title: 'Атрибуты',
    route: 'attribute',
    icon: 'AlignJustifyIcon',
    children: [
      {
        title: 'Создание aтрибута',
        route: 'attribute',
      },
      {
        title: 'Значение атрибута',
        route: 'AttributeValue',
      },
      {
        title: 'Тип товар',
        route: 'product-type',
      },
    ],
  },
  {
    title: 'Бренды',
    route: 'brands',
    icon: 'StarIcon',
  },
  {
    title: 'Меню категорий',
    route: 'MainCategory',
    icon: 'ListIcon',
  },
  {
    title: 'Категории',
    route: 'Category',
    icon: 'ArchiveIcon',
    children: [
      {
        title: 'Категория',
        route: 'Category',
      },
      {
        title: 'Подкатегория',
        route: 'SubCategory',
      },
      {
        title: 'Для кого',
        route: 'ForWho',
      },

    ],

  },
  {
    title: 'Скидки',
    route: 'discount',
    icon: 'ClockIcon',
  },
  {
    title: 'Админы',
    route: 'admins',
    icon: 'TvIcon',
    // children: [
    //   {
    //     title: 'Администратор',
    //     route: 'admins',
    //   },
    //   {
    //     title: 'Модератор',
    //     route: 'moderator',
    //   },
    // ],
  },
  {
    title: 'Список заказов',
    route: 'orders',
    icon: 'CheckSquareIcon',
  },
  {
    title: 'Отзывы',
    route: 'reviews',
    icon: 'FileTextIcon',
  },
  {
    title: 'Магазины',
    route: 'stores',
    icon: 'CopyIcon',
  },
  {
    title: 'Пользователи',
    route: 'users',
    icon: 'UsersIcon',
  },
  {
    title: 'Баннеры',
    route: 'banners',
    icon: 'ImageIcon',
  },
]
