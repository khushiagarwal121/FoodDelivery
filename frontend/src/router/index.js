import { createRouter, createWebHistory } from 'vue-router';
// import store from '../store/store';
import Login from '../views/Auth/AuthLogin.vue';
import Signup from '../views/Auth/AuthSignup.vue';
import ForgotPassword from '../views/Auth/ForgotPassword.vue';
import Dashboard from '../views/Dashboard.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forgot-password', component: ForgotPassword },
  // { path: '/dashboard', component: Dashboard },
  { path: '/', component: Dashboard ,  meta: { requiresAuth: true }, // This route requires authentication
  },
  {  path: '/:catchAll(.*)', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


// // Navigation guard
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.state.isAuthenticated; // Check if user is authenticated

//   // If the route requires authentication and the user is not authenticated
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next('/login'); // Redirect to login page
//   } else {
//     next(); // Proceed to the route
//   }
// });


export default router;
