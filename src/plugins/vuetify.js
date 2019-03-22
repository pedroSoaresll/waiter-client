import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
// import colors from 'vuetify/es5/util/colors'

const theme = {
  primary: '#595BD3', // #E53935
  secondary: '#FFFFFF', // #FFCDD2
  accent: '#ff3859', // #3F51B5
  success: '#4CAF50',
  error: '#ff3859',
};

Vue.use(Vuetify, {
  iconfont: 'md',
  theme,
});

export { theme }; // eslint-disable-line
