
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
// Load icon-font css.
// require('../icons/00-icon.font.js');

Vue.component('example', require('./Example.vue'));

const app = new Vue({
  el: '#vue-app'
});
