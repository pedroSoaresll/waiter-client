import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

const theme = {
  primary: '#FFFFFF', // #E53935
  secondary: colors.red.lighten4, // #FFCDD2
  accent: '#ff3859' // #3F51B5
}

Vue.use(Vuetify, {
  iconfont: 'md',
  theme
})

export { theme }
