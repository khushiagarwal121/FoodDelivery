import { createRouter, createWebHistory } from "vue-router";
// import store from '../store/store';
import Login from "../views/Auth/AuthLogin.vue";
import Signup from "../views/Auth/AuthSignup.vue";
import ForgotPassword from "../views/Auth/ForgotPassword.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from "../views/NotFound.vue";
import ResetPassword from "../views/Auth/ResetPassword.vue";
import axios from "axios";
// import Cookies from "js-cookie";

const routes = [
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/reset-password", component: ResetPassword },

  // { path: '/dashboard', component: Dashboard },
  {
    path: "/",
    component: Dashboard,
    meta: { requiresAuth: true }, // This route requires authentication
  },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = Cookies.get("authToken");
//   const authTokenFromDocument = document.cookie; // Check all cookies set

//   // Log both to debug
//   console.log("Using js-cookie:", Cookies.get("authToken"));
//   console.log("Using document.cookie:", authTokenFromDocument);

//   if (
//     (to.path === "/login" || to.path === "/forgot-password") &&
//     isAuthenticated
//   ) {
//     next("/");
//   }
//   // If the route requires authentication and the user is not authenticated
//   else if (to.meta.requiresAuth && !isAuthenticated) {
//     next("/login"); // Redirect to login page
//   } else {
//     next(); // Proceed to the route
//   }
// });
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem("authToken"); // Assume token is saved here after login

//   if (
//     to.matched.some((record) => record.meta.requiresAuth) &&
//     !isAuthenticated
//   ) {
//     // If the route requires authentication and the user is not logged in, redirect to login
//     next({ name: "Login" });
//   } else {
//     // Otherwise, proceed to the route
//     next();
//   }
// });
// Navigation guard
router.beforeEach(async (to, from, next) => {
  console.log(`Navigating to: ${to.path}`); // Log the target route

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("Checking authentication..."); // Log when checking auth

    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true, // This ensures that cookies are sent with the request
      }
    );
    console.log(response);
    if (response.status === 200) {
      console.log("User is authenticated."); // Log if authenticated
      next();
    } else {
      console.log("User is not authenticated. Redirecting to Login."); // Log if not authenticated
      next("/login");
    }
  } else {
    console.log("No authentication required."); // Log for non-auth routes
    next();
  }
});

export default router;
