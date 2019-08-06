import apolloClient from '../../services/ApolloClient';
import ADD_ORDERITEM from '../../services/add-orderitems.graphql';

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
      state.ordersSeparated[itemExists].quantity = state.ordersSeparated[itemExists].quantity + item.quantity;
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

  setOrdersSeparated(state, items) {
    state.ordersSeparated = items;
  },

  setOrdersRequested(state, items) {
    state.ordersRequested = state.ordersRequested
      .concat(items);
  },

  setOrdersRequestedRaw(state, items) {
    state.ordersRequested = items;
  },
};

export const actions = {
  requestOrdersSeparated({ state, commit }) {
    // only do this if API response is OK
    const makeOrder = item => apolloClient.mutate({
      mutation: ADD_ORDERITEM,
      variables: {
        itemId: item.id,
      },
    });

    const executePromise = state.ordersSeparated.flatMap((item) => {
      const times = [];

      for (let i = 0; i < item.quantity; i += 1) {
        times.push(makeOrder(item));
      }

      return times;
    });

    Promise.all(executePromise)
      .then((response) => {
        console.log('resposta das responses', response);
        commit('setOrdersRequested', state.ordersSeparated);
        commit('setOrdersSeparated', []);
      })
      .catch((error) => {
        console.error('erro das responses', error);
      });
  },

  clearOrders({ commit }) {
    commit('setOrdersSeparated', []);
    commit('setOrdersRequestedRaw', []);
  },
};
