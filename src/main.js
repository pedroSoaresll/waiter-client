import Vue from 'vue'
import './plugins/vuetify'
import VueApollo from 'vue-apollo'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import App from './App.vue'
import store from './store';
import apolloClient from './services/ApolloClient'

Amplify.configure({Auth: {
    userPoolId: "us-east-1_bOqbI1cFg",
        region: "us-east-1",
        userPoolWebClientId: "gc7m92hpt9e42tus6bj3jnnh3"
}});

Vue.use(VueApollo);
Vue.use(AmplifyPlugin, AmplifyModules);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
    store,
    apolloProvider,
    render: h => h(App),
}).$mount('#app');
