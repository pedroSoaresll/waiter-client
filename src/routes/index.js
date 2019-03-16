import VueRouter from 'vue-router';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('./views/Home'),
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
