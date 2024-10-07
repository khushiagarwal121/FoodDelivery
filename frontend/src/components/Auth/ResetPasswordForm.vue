<template>
  <div class="reset-password-form">
    <!-- <h2>Reset Password</h2> -->
    <form @submit.prevent="resetPassword">
      <div class="input-group">
        <input
          v-model="newPassword"
          type="password"
          placeholder="Enter new password"
          required
        />
      </div>
      <div class="input-group">
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
    };
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  methods: {
    async resetPassword() {
      // Check if passwords match
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const resetToken = this.route.query.token;
      try {
        await AuthService.confirmResetPassword(resetToken, this.newPassword);
        alert("Password reset successfully");
        this.$router.push("/login");
      } catch (error) {
        alert("Error resetting password");
      }
    },
  },
};
</script>

<style scoped>
.reset-password-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

.reset-password-form h2 {
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

button:hover {
  background-color: #cf5a7b; /* Darker shade on hover */
}
</style>