import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import ThreadShow from '@/pages/PageThreadShow'
import ThreadCreate from '@/pages/PageThreadCreate'
import ThreadEdit from '@/pages/PageThreadEdit'
import Category from '@/pages/PageCategory'
import Forum from '@/pages/PageForum'
import Profile from '@/pages/PageProfile'
import Register from '@/pages/PageRegister'
import SignIn from '@/pages/PageSignIn'
import AdminCategories from '@/pages/AdminCategories'
import AdminForums from '@/pages/AdminForums'
import AdminThreads from '@/pages/AdminThreads'
import AdminCategoryCreate from '@/pages/AdminCategoryCreate'
import AdminForumCreate from '@/pages/AdminForumCreate'
import AdminCategoryEdit from '@/pages/AdminCategoryEdit'
import AdminForumEdit from '@/pages/AdminForumEdit'
import AdminThreadEdit from '@/pages/AdminThreadEdit'
import NotFound from '@/pages/PageNotFound'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true
    },
    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: ThreadCreate,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: ThreadEdit,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/me',
      name: 'Profile',
      component: Profile,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: Profile,
      props: {edit: true},
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      meta: { requiresGuest: true }
    },
    {
      path: '/logout',
      name: 'SignOut',
      meta: { requiresAuth: true },
      beforeEnter (to, from, next) {
        store.dispatch('signOut')
          .then(() => next({name: 'Home'}))
      }
    },
    {
      path: '/admin-categories',
      name: 'AdminCategories',
      component: AdminCategories,
      props: true,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '/admin-forums',
      name: 'AdminForums',
      component: AdminForums,
      props: true,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '/admin-threads',
      name: 'AdminThreads',
      component: AdminThreads,
      props: true,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '/admin-catcreate',
      name: 'AdminCategoryCreate',
      component: AdminCategoryCreate,
      props: true,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '/admin-forumcreate',
      name: 'AdminForumCreate',
      component: AdminForumCreate,
      props: true,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '/admin-catedit',
      name: 'AdminCategoryEdit',
      component: AdminCategoryEdit,
      props: true,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '/admin-forumedit',
      name: 'AdminForumEdit',
      component: AdminForumEdit,
      props: true,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '/admin-threadedit',
      name: 'AdminThreadEdit',
      component: AdminThreadEdit,
      props: true,
      meta: { requiresAdminAuth: true }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  store.dispatch('auth/initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.requiresAuth)) {
        // protected route
        if (user) {
          next()
        } else {
          next({name: 'SignIn', query: {redirectTo: to.path}})
        }
      } else if (to.matched.some(route => route.meta.requiresGuest)) {
        // protected route
        if (!user) {
          next()
        } else {
          next({name: 'Home'})
        }
      } else if (to.matched.some(route => route.meta.requiresAdminAuth)) {
        // protected route
        if (user.isAdmin) {
          next()
        } else {
          next({name: 'Home'})
        }
      } else {
        next()
      }
    })
})

export default router
