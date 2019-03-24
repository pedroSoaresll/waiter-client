import router from '../../routes/index';
import store from '../index';

export const state = {
  current: 'person',
};

export const getters = {
  current: state => state.current,
};

export const mutations = {
  setCurrent(state, value) {
    state.current = value;
  },
};

export const actions = {
  async verify({ commit }) {
    const clientName = store.getters['client/name'];

    const notInRoute = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(!router.currentRoute.name || router.currentRoute.name !== 'GetBasicInfo');
      }, 200);
    });

    if (!clientName && notInRoute) {
      commit('setCurrent', 'person');
      router.push({ name: 'GetBasicInfo' });
      return;
    }

    commit('setCurrent', router.currentRoute.meta.bottomNav);
  },
};
