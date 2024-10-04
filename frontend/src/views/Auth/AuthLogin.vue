<template>
  <div class="login">
    <h1>Login</h1>
    <LoginForm />
    <router-link to="/signup" class="signup-link"
      >Don't have an account? Signup</router-link
    >
    <br />
    <br />
    <router-link to="/forgot-password" class="forgot-password-link"
      >Forgot Password?</router-link
    >
  </div>
</template>

<script>
import LoginForm from "../../components/Auth/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9; /* Light background */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login h1 {
  text-align: center;
  color: #cf5a7b; /* Primary color */
}

.signup-link,
.forgot-password-link {
  display: block;
  text-align: center;
  color: #cf5a7b; /* Primary color */
  text-decoration: none;
}

.signup-link:hover,
.forgot-password-link:hover {
  text-decoration: underline; /* Underline on hover for better UX */
}
</style>