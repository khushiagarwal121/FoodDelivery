<template>
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input v-model="user.email" type="email" id="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="user.password" type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
//   import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
        message: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', this.user);
          // Store token or user data as needed (e.g., in localStorage or Vuex)
          localStorage.setItem('token', response.data.token); // Assuming token is returned on successful login
          this.message = 'Login successful! Redirecting...';
        //   this.$router.push('/dashboard'); // Redirect to dashboard or any other page
          this.$router.push('/'); // Redirect to dashboard or any other page
        } catch (error) {
          this.message = error.response.data.message || 'Login failed. Please try again.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-form {
    max-width: 400px;
    margin: auto;
  }
  .login-form div {
    margin-bottom: 15px;
  }
  </style>
  