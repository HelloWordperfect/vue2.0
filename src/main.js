import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResouce from 'vue-resource';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

import './common/stylus/index.styl';
/*  main 入口js */
Vue.config.productionTip = false;

/*全局注册*/
Vue.use(VueRouter);
Vue.use(VueResouce)

// 定义路由
const routes = [ 
// 如果你访问的是这个url 请到这个组建
	{path: '/goods', component: goods},
	{path: '/ratings', component: ratings},
	{path: '/seller', component: seller},
	{path:'*',redirect:'/goods'}
];
// 创建 router 实例
const router = new VueRouter({
  routes,
  /*修改默认的 点击加的类名*/
  linkActiveClass:'active'
});
//最后挂到vue
new Vue({
	router,
	el: '#app',
	// render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来
	render: h => h(App)
});