<template>
    <div class="login">
      <h1>Login</h1>
      <LoginForm />
      <router-link to="/signup">Don't have an account? Signup</router-link>
      <br>
      <br>
      <router-link to="/forgot-password">Forgot Password?</router-link>
    </div>
  </template>
  
  <script>
  import LoginForm from '../../components/Auth/LoginForm.vue';
  
  export default {
    components: {
      LoginForm
    }
  };
  </script>
  
  <style>
  /* Styles for the login view */
  </style>
  