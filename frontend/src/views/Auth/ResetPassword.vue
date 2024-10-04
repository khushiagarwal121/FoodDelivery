<template>
  <div class="reset-password">
    <h1>Reset Password</h1>
    <ResetPasswordForm />
    <router-link to="/login">Back to Login</router-link>
  </div>
</template>
  
  <script>
import ResetPasswordForm from "../../components/Auth/ResetPasswordForm.vue";

export default {
  components: {
    ResetPasswordForm,
  },
};
</script>
  
  <style>
/* Styles for the forgot password view */
</style>
  