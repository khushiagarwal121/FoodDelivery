<template>
    <div class="signup-form">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div>
          <label for="first_name">First Name:</label>
          <input v-model="user.first_name" type="text" id="first_name" required />
        </div>
        <div>
          <label for="last_name">Last Name:</label>
          <input v-model="user.last_name" type="text" id="last_name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="user.email" type="email" id="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="user.password" type="password" id="password" required />
        </div>
        <div>
          <label for="country_code">Country Code:</label>
          <input v-model="user.country_code" type="text" id="country_code" required />
        </div>
        <div>
          <label for="phone_number">Phone Number:</label>
          <input v-model="user.phone_number" type="tel" id="phone_number" required />
        </div>
        <div>
          <label for="dob">Date of Birth:</label>
          <input v-model="user.dob" type="date" id="dob" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          country_code: '',
          phone_number: '',
          dob: '',
        },
        message: '',
      };
    },
    methods: {
      async handleSignup() {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/signup', this.user);
          this.message = response.data.message;
        } catch (error) {
          this.message = error.response.data.message || 'An error occurred during signup.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .signup-form {
    max-width: 400px;
    margin: auto;
  }
  .signup-form div {
    margin-bottom: 15px;
  }
  </style>
  