<template>
  <div>
    <h1>Reset Password</h1>
    <form @submit.prevent="resetPassword">
      <input
        v-model="newPassword"
        type="password"
        placeholder="Enter new password"
        required
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>

<script>
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

      try {
        const resetToken = this.route.query.token; // Assumes token is passed as query parameter
        const response = await fetch(
          "http://localhost:5000/api/auth/reset-password/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: resetToken, // Use the reset token from the query parameter
              newPassword: this.newPassword, // Use the new password from the data model
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Password reset successfully");
          console.log(data);
        } else {
          alert(data.message || "Error resetting password"); // Handle error messages
          console.error(data);
        }
      } catch (error) {
        alert("Error resetting password");
        console.error(error);
      }
    },
  },
};
</script>
