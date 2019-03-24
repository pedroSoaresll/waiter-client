import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import './plugins/vuetify';
import App from './App.vue';
import store from './store';
import router from './routes';
// import VueAnalytics from 'vue-analytics'
// import VueApollo from 'vue-apollo'
// import Amplify, * as AmplifyModules from 'aws-amplify'
// import { AmplifyPlugin } from 'aws-amplify-vue'
// import apolloClient from './services/ApolloClient'
import 'bootstrap-utilities/bootstrap-utilities.css';
import './filters/filters';

moment.suppressDeprecationWarnings = true;
moment.tz.setDefault('America/Sao_Paulo');

// Amplify.configure({
//   Auth: {
//     userPoolId: "us-east-1_bOqbI1cFg",
//     region: "us-east-1",
//     userPoolWebClientId: "gc7m92hpt9e42tus6bj3jnnh3"
//   }
// });

Vue.use(VueRouter);
// Vue.use(VueApollo);
// Vue.use(AmplifyPlugin, AmplifyModules);
// Vue.use(VueAnalytics, {
//   id: 'token-here',
//   router
// })
Vue.use(VueMoment, { moment });

/* const apolloProvider = new VueApollo({
 defaultClient: apolloClient,
 });
 */

router.beforeEach((to, from, next) => {
  // todo - validate if the qr code is defined
  if (to.name !== 'Home') {
    store.dispatch('client/validateQrCodeContent');
    // validate bottom nav
    // todo - validate if the qr code have a table and restaurant valid
    store.dispatch('bottomNav/verify');
  }
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // apolloProvider,
  render: h => h(App),
}).$mount('#app');
