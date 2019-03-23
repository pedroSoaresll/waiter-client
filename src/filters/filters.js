import Vue from 'vue';

Vue.filter('price_formatted', (value) => {
  if (!value) return;
  return new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' })
    .format(value);
});
