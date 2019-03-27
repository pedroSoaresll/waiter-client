export const state = {
  items: [],
};

export const getters = {
  items: state => state.items,
};

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },

  addItem(state, item) {
    state.items.push(item);
  },

  removeItem(state, item) {
    state.items = state.items
      .filter(crumb => crumb.routerName !== item.routerName);
  },
};

export const actions = {};
