import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import './assets/global.css';
import request from "@/utils/request";
import store from "@/store";

Vue.use(ElementUI,{size: "mini"});
Vue.config.productionTip = false

Vue.prototype.request=request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
