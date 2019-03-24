// import apollo from '../../services/ApolloClient';
import router from '../../routes';

export const state = {
  qrCode: {
    table: null,
    restaurant: null,
  },
  name: null,
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
};

export const actions = {

  /*
   * call that function to start a new session from qrcode
   * url example: http://localhost:3002/table/1234/1234/your-profile
   * */
  startSession({ commit }, qrCodeUrlContent) {
    if (!qrCodeUrlContent) return;

    const urlContentSplitted = qrCodeUrlContent.data.split('/');
    const table = urlContentSplitted[urlContentSplitted.length - 3];
    const restaurant = urlContentSplitted[urlContentSplitted.length - 2];

    commit('setQrCode', {
      table,
      restaurant,
    });

    router.push({ name: 'GetBasicInfo', params: { tableId: table, storeId: restaurant } });
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
  // validate if qrCode values exists

  /*
   * called that function when you want update client name
   * */
  async updateName({ commit }, value) {
    if (!value) return;
    commit('setName', value);
  },
};
