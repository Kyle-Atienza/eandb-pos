const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'counter',
        component: () => import('pages/CounterPage.vue'),
      },
      {
        path: 'checkout',
        component: () => import('pages/CheckoutPage.vue'),
        children: [
          {
            path: 'items',
            component: () => import('pages/CheckoutItemsPage.vue'),
            name: 'Checkout Items',
          },
          {
            path: 'details',
            component: () => import('pages/CheckoutDetailsPage.vue'),
          },
          {
            path: 'success',
            component: () => import('pages/CheckoutSuccessPage.vue'),
          },
        ],
      },
      {
        path: 'history',
        component: () => import('pages/HistoryPage.vue'),
        children: [
          {
            path: 'list',
            component: () => import('pages/HistoryListPage.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/HistoryItemPage.vue'),
          },
        ],
      },
      {
        path: 'inventory',
        component: () => import('pages/InventoryPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
