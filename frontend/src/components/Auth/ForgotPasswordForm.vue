<template>
  <div class="forgot-password-form">
    <form @submit.prevent="resetPassword">
      <div class="input-group">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <button type="submit" :disabled="loading">Send Reset Link</button>
      <!-- Show loading spinner while sending the reset link -->
      <div v-if="loading" class="loading-spinner">
        <span>Sending...</span>
      </div>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      message: "",
      loading: false, // Add loading state
    };
  },
  methods: {
    async resetPassword() {
      this.loading = true; // Start loading
      this.message = ""; // Clear previous messages
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/forgot-password",
          { email: this.email }
        );
        this.message = response.data.message;
      } catch (error) {
        this.message = "Error sending reset link. Please try again.";
      } finally {
        this.loading = false; // Stop loading
      }
    },
  },
};
</script>

<style scoped>
.forgot-password-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

.forgot-password-form h2 {
  text-align: center;
  color: #cf5a7b; /* Primary color */
}

.input-group {
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-group input:focus {
  border-color: #cf5a7b; /* Change border color on focus */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #cf5a7b; /* Primary button color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc; /* Disable button style */
  cursor: not-allowed; /* Change cursor for disabled button */
}

button:hover:enabled {
  background-color: #cf5a7b; /* Darker shade on hover */
}

.loading-spinner {
  text-align: center;
  margin-top: 10px;
}

.message {
  text-align: center;
  margin-top: 10px;
}
</style>
