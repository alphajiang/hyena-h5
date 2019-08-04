import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PointList from '@/components/PointList.vue'
import PointLogList from '@/components/PointLogList.vue'
import PointRecList from '@/components/PointRecList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/point/list',
      name: 'pointList',
      component: PointList
    },
    {
      path: '/point/log/list',
      name: 'pointLogList',
      component: PointLogList
    },
    {
      path: '/point/rec/list',
      name: 'pointRecList',
      component: PointRecList
    }
  ]
})
