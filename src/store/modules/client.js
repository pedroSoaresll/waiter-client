// import apollo from '../../services/ApolloClient';
import router from '../../routes';
import apolloClient from '../../services/ApolloClient';
import GQL_AUTHENTICATION from '../../services/authentication.graphql';
import { WAITER_TOKEN } from '../../common/client';

export const state = {
  qrCode: {
    table: null,
    restaurant: null,
  },
  name: null,
  token: null,
};

export const getters = {
  qrCode: state => state.qrCode,
  name: state => state.name,
};

export const mutations = {
  setQrCode(state, value) {
    state.qrCode.table = value.table;
    state.qrCode.restaurant = value.restaurant;
  },

  setName(state, value) {
    state.name = value;
  },

  setToken(state, value) {
    window.localStorage.setItem(WAITER_TOKEN, value);
    state.token = value;
  },
};

export const actions = {

  /*
   * call that function to start a new session from qrcode
   * url example: http://localhost:3002/table/1234/1234/your-profile
   * */
  startSession({ commit }, qrCodeUrlContent) {
    if (!qrCodeUrlContent) return;

    const { restaurantId: restaurant, tableId: table } = qrCodeUrlContent;

    commit('setQrCode', {
      table,
      restaurant,
    });

    router.push({
      name: 'GetBasicInfo',
      params: {
        tableId: table,
        storeId: restaurant,
      },
    });
  },

  logoutSession({ rootState, commit }) {
    const { order } = rootState;
    if (order.ordersRequested.length) {
      const hasPendingItem = order.ordersRequested
        .filter(item => item.status !== 'DELIVERED');
      // check if there is still a request with a different delivery status
      // if exists, show the dialog to inform the user
      if (hasPendingItem.length) throw new Error('Você ainda tem pedidos sendo preparado ou na espera para ser entregue a você.');
    }
    // if all ok to logout, clean qrcode and clean orders and go to Home
    commit('setQrCode', {
      table: null,
      restaurant: null,
    });
    commit('setName', null);
  },

  validateQrCodeContent({ state, commit }) {
    const { qrCode } = state;

    // validate if qrCode params is defined
    if (!qrCode.table || !qrCode.restaurant) {
      // reset all store if that is necessary
      commit('setQrCode', {
        table: null,
        restaurant: null,
      });
      commit('setName', null);

      setTimeout(() => router.push({ name: 'Home' }), 0);
    }
  },

  /*
   * called that function when you want update client name
   * */
  async updateName({ commit, state }, value) {
    if (!value) return;

    // generate token to client
    // eslint-disable-next-line global-require
    const authentication = await apolloClient.mutate({
      mutation: GQL_AUTHENTICATION,
      variables: {
        clientName: value,
        restaurantId: state.qrCode.restaurant,
        tableId: state.qrCode.table,
      },
    });

    const { data: { createTokenToClient: { token } } } = authentication;

    // update name
    commit('setName', value);
    commit('setToken', token);
  },
};
