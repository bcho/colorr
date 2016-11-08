import Vue from 'vue'

const App = require('./components/App.vue');
const ColorStage = require('./components/ColorStage.vue');

Vue.component(ColorStage.name, ColorStage);

export default new Vue(App)
