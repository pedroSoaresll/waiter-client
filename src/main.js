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

/*
  router.beforeEach(async (to, from, next) => {

  })
 */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // apolloProvider,
  render: h => h(App),
}).$mount('#app');
