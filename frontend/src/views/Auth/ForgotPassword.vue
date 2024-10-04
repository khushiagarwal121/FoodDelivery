<template>
    <div class="forgot-password">
      <h1>Forgot Password</h1>
      <ForgotPasswordForm />
      <router-link to="/login">Back to Login</router-link>
    </div>
  </template>
  
  <script>
  import ForgotPasswordForm from '../../components/Auth/ForgotPasswordForm.vue';
  
  export default {
    components: {
      ForgotPasswordForm
    }
  };
  </script>
  
  <style>
  /* Styles for the forgot password view */
  </style>
  