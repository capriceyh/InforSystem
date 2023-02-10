import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Manage.vue'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 注意：刷新页面会重置路由
export const setRoutes = () => {
  const storeMenus = localStorage.getItem("menus");
  if(storeMenus) {

    const currentRoutes = router.getRoutes().map(v => v.name)
    if(!currentRoutes.includes('Manage')){
      // 拼装动态路由
      const manageRoute = {path: '/', component: () => import('../views/Manage.vue'), redirect: "/home", children: [
          { path: 'person', name: '个人信息', component: () => import('../views/Person.vue')},
          // { path: 'password', name: '修改密码', component: () => import('../views/Password.vue')}
        ]}
      const menus = JSON.parse(storeMenus)
      menus.forEach(item => {
        if(item.path){
          let itemMenu = {path: item.path.replace("/", ""), name: item.name, component: () => import('../views/'+ item.pagePath +'.vue')}
          manageRoute.children.push(itemMenu)
        }else if(item.children.length){
          item.children.forEach(item => {
            if(item.path){
              let itemMenu = {path: item.path.replace("/", ""), name: item.name, component: () => import('../views/'+ item.pagePath +'.vue')}
              manageRoute.children.push(itemMenu)
            }
          })
        }
      })
      // 动态添加到现在的路由对象中去
      router.addRoute(manageRoute)
    }

  }
}

// 提供一个重置路由的方法
export const resetRouter = () => {
  router.matcher = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}

// 刷新时重置再设置一下路由
setRoutes()

// 动态路由
// router.addRoute(
//     {
//       path: '/',
//       component: () => import('../views/Manage.vue'),
//       redirect: "/home",
//       children:[
//         {path: 'home', name: '首页', component: () => import('../views/Home')},
//         {path: 'user', name: '用户管理', component: () => import('../views/User.vue')},
//         {path: 'role', name: '角色管理', component: () => import('../views/Role.vue')},
//         {path: 'person', name: '个人信息', component: () => import('../views/Person.vue')},
//         {path: 'file', name: '文件管理', component: () => import('../views/File.vue')},
//         {path: 'menu', name: '菜单管理', component: () => import('../views/Menu.vue')}
//       ]
//     },
// )

//路由守卫
router.beforeEach((to,from,next)=>{
  localStorage.setItem("currentPathName",to.name)  //设置当前的路由名称,为了在Header组件中使用
  store.commit("setPath")  // 触发store的数据更新

  // 未找到路由的情况
  if (!to.matched.length) {
    const storeMenus = localStorage.getItem("menus")
    if (storeMenus) {
      next()
    }else {
      // 跳回登录界面
      next("/login")
    }
  }
  // 其他的情况都放行
  next()
})

export default router
