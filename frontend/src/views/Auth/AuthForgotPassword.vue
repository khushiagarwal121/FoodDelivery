<template>
  <div class="forgot-password">
    <h1>Forgot Password</h1>
    <ForgotPasswordForm />
    <router-link to="/login" class="back-link">Back to Login</router-link>
  </div>
</template>

<script>
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm.vue";

export default {
  components: {
    ForgotPasswordForm,
  },
};
</script>

<style scoped>
.forgot-password {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9; /* Light background */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.forgot-password h1 {
  text-align: center;
  color: #cf5a7b; /* Primary color */
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #cf5a7b; /* Primary color */
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline; /* Underline on hover for better UX */
}
</style>