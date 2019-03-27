export const state = {
  ordersSeparated: [],
  ordersRequested: [],
};

export const getters = {
  ordersSeparated: state => state.ordersSeparated,
  ordersRequested: state => state.ordersRequested,
};

export const mutations = {
  separateItem(state, item) {
    const itemExists = state.ordersSeparated.findIndex(_item => _item.id === item.id);
    if (itemExists !== -1) {
      state.ordersSeparated[itemExists].quantity =
        state.ordersSeparated[itemExists].quantity + item.quantity;
      return;
    }

    state.ordersSeparated.push(item);
  },

  removeSeparatedItem(state, item) {
    const removeItem = () => state.ordersSeparated.filter(_item => _item.id !== item.id);

    const itemExists = state.ordersSeparated.findIndex(_item => _item.id === item.id);
    if (itemExists !== -1) {
      const calc = state.ordersSeparated[itemExists].quantity - item.quantity;
      state.ordersSeparated[itemExists].quantity = calc || 0;

      if (state.ordersSeparated[itemExists].quantity !== 0) return;
    }

    state.ordersSeparated = removeItem();
  },

  remoteSeparateItem(state, item) {
    state.ordersSeparated = state.ordersSeparated
      .filter(_item => _item.id !== item.id);
  },

  setOrdersRequested(state, items) {
    state.ordersRequested = state.ordersRequested
      .concat(items);
  },
};

export const actions = {
  requestOrdersSeparated({ state, commit }) {
    // only do this if API response is OK
    commit('setOrdersSeparated', state.ordersSeparated);
  },
};
