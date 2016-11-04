import Vue from 'vue'
import App from 'components/App.vue'

import ColorStage from 'components/ColorStage.vue';

Vue.component(ColorStage.name, ColorStage);

export default new Vue({
  ...App
})
