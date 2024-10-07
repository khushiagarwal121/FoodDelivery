<template>
  <div class="signup">
    <h1>Signup</h1>
    <SignupForm />
    <router-link to="/login" class="login-link"
      >Already have an account? Login</router-link
    >
  </div>
</template>

<script>
import SignupForm from "../../components/Auth/SignupForm.vue";

export default {
  components: {
    SignupForm,
  },
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin: -30px auto 0; /* Negative top margin to move form upward */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9; /* Light background */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.signup h1 {
  text-align: center;
  color: #cf5a7b; /* Primary color */
}

.login-link {
  display: block;
  text-align: center;
  color: #cf5a7b; /* Primary color */
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline; /* Underline on hover for better UX */
}
</style>