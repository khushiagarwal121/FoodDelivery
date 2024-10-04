<template>
    <div class="signup">
      <h1>Signup</h1>
      <SignupForm />
      <router-link to="/login">Already have an account? Login</router-link>
    </div>
  </template>
  
  <script>
  import SignupForm from '../../components/Auth/SignupForm.vue';
  
  export default {
    components: {
      SignupForm
    }
  };
  </script>
  
  <style>
  /* Styles for the signup view */
  </style>
  