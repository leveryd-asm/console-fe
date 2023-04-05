import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/brotherdomain',
    name: 'Info',
    meta: { title: '信息情报', icon: 'example' },
    children: [
      {
        path: 'brotherdomain',
        name: 'Brotherdomain',
        component: () => import('@/views/info/brotherdomain'),
        meta: { title: '兄弟域名', icon: 'table' }
      },
      {
        path: 'subdomain',
        name: 'Subdomain',
        component: () => import('@/views/info/subdomain'),
        meta: { title: '子域名', icon: 'table' }
      }
    ]
  },
  {
    path: '/alarm',
    component: Layout,
    redirect: '/alarm/poc',
    name: 'Alarm',
    meta: { title: '报警模块', icon: 'example' },
    children: [
      {
        path: 'alarm',
        name: 'alarm',
        component: () => import('@/views/alarm/bbscan'),
        meta: { title: '漏洞报警', icon: 'tree' }
      },
      {
        path: 'ms',
        name: 'ms',
        component: () => import('@/views/alarm/ms'),
        meta: { title: '管理后台', icon: 'tree' }
      }
    ]
  },
  {
    path: '/workflow',
    redirect: '/workflow/manage',
    component: Layout,
    name: 'Workflow',
    meta: {
      title: '工作流管理',
      icon: 'example'
    },
    children: [
      {
        name: 'workflow',
        path: 'manage',
        component: () => import('@/views/dashboard/workflow'),
        meta: { title: '工作流管理', icon: 'tree' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

