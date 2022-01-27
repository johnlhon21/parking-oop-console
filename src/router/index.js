import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: 'parking-complex',
    },
    {
      name: 'Parking-Complex',
      path: '/parking-complex',
      component: () => import('@/views/ParkingComplex'),
    },
    {
      name: 'EntryPoint',
      path: '/entry-point',
      component: () => import('@/views/EntryPoint'),
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/views/404'),
    },
]
const router = new VueRouter({
  mode: 'history',
  routes,
})
export default router
