<template>
    <form @submit.prevent="resetPassword">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  </template>
  
  <script>
  import AuthService from '../../services/AuthService';
  
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      async resetPassword() {
        try {
          const response = await AuthService.resetPassword(this.email);
          console.log(response);
          alert('Password reset link sent to your email.');
        } catch (error) {
          console.error('Error sending reset link:', error);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Styles for the forgot password form */
  </style>
  