<template>
  <div>
    <h2>Forgot Password</h2>
    <form @submit.prevent="resetPassword">
      <input v-model="email" type="email" placeholder="Enter your email" required />
      <button type="submit">Send Reset Link</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      message: '',
    };
  },
  methods: {
    async resetPassword() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email: this.email });
        this.message = response.data.message;
      } catch (error) {
        this.message = 'Error sending reset link. Please try again.';
      }
    },
  },
};
</script>
