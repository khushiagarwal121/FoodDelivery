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