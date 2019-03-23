import VueRouter from 'vue-router';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('./views/Home'),
  },
  {
    name: 'GetBasicInfo',
    path: '/table/:tableId/:storeId/your-profile',
    component: () => import('./views/GetBasicInfo'),
    meta: {
      bottomNav: 'person',
    },
  },
  {
    name: 'Orders',
    path: '/table/:tableId/:storeId/orders',
    component: () => import('./views/ShowOrders'),
    meta: {
      bottomNav: 'orders',
    },
  },
  {
    name: 'ShowMenu',
    path: '/table/:tableId/:storeId',
    component: () => import('./views/StoreMenu'),
    meta: {
      bottomNav: 'categories',
    },
    children: [
      {
        name: 'Categories',
        path: 'menu',
        component: () => import('../components/ShowCategories'),
        meta: {
          bottomNav: 'categories',
        },
      },
      {
        name: 'Category',
        path: ':categoryId',
        component: () => import('../components/ShowCategory'),
        meta: {
          bottomNav: 'categories',
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 0);
    });
  },
});

export default router;
