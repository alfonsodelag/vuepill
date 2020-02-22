import Vue from 'vue';
import App from './components/App.vue';

const root = new Vue({
  render: (h) => h(App)
}).$mount()

document.body.appendChild(root.$el)
