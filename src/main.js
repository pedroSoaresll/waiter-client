import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import VueApollo from 'vue-apollo'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import App from './App.vue'
import store from './store';
import apolloClient from './services/ApolloClient'
import routes from './routes'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import 'moment/locale/pt-br';
moment.suppressDeprecationWarnings = true;
moment.tz.setDefault('America/Sao_Paulo');

Amplify.configure({
  Auth: {
    userPoolId: "us-east-1_bOqbI1cFg",
    region: "us-east-1",
    userPoolWebClientId: "gc7m92hpt9e42tus6bj3jnnh3"
  }
});

Vue.use(VueRouter);
Vue.use(VueApollo);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(VueMoment, { moment });

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

const router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach(async (to, from, next) => {
  // validar entrada do usuário
  try {

    if (to.params.load)
      return next()

    const phone_number = sessionStorage.getItem('kovi_phone')
    if (!phone_number)
      return next({ name: 'Home', params: { load: true } })

    //store.dispatch('lead/createDriver', phone_number)
    return next()

  } catch (e) {
    console.error(e)
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
