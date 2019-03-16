import Vue from 'vue';
import Vuex from 'vuex';
import PersistedState from 'vuex-persistedstate';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [
    PersistedState({
      key: 'kovi-signup',
    }),
  ],
  strict: process.env.NODE_ENV !== 'production',
});
Object.keys(modules)
  .forEach((moduleName) => {
    if (modules[moduleName].actions && modules[moduleName].actions.init) {
      store.dispatch(`${moduleName}/init`);
    }
  });

export default store;
