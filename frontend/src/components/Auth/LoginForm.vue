<template>
  <div class="login-form">
    <!-- <h2>Login</h2> -->
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Email:</label>
        <input
          v-model="user.email"
          type="email"
          id="email"
          @blur="validateEmail"
          :class="{ 'input-error': errors.email }"
          required
        />
        <span v-if="errors.email" class="error-message">{{
          errors.email
        }}</span>
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          @blur="validatePassword"
          :class="errors.password"
          required
        />
        <span v-if="errors.password" class="error-message">{{
          errors.password
        }}</span>
      </div>
      <button type="submit" :disabled="!isFormValid">Login</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      message: "",
      errors: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    isFormValid() {
      return (
        this.user.email &&
        this.user.password &&
        !this.errors.email &&
        !this.errors.password
      );
    },
  },
  methods: {
    async handleLogin() {
      try {
        const response = await AuthService.login(
          this.user.email,
          this.user.password
        );
        localStorage.setItem("token", response.data.token);
        this.message = "Login successful! Redirecting...";
        this.$router.push("/"); // Redirect to homepage or dashboard
      } catch (error) {
        this.message =
          error.response.data.message || "Login failed. Please try again.";
      }
    },
    validateEmail() {
      if (!this.user.email) {
        this.errors.email = "Email is required";
      } else {
        this.errors.email = null;
      }
    },
    validatePassword() {
      if (!this.user.password) {
        this.errors.password = "Password is required";
      } else {
        this.errors.password = null;
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  /* border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
}

.login-form h2 {
  text-align: center;
  color: #cf5a7b; /* Primary color */
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
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

.message {
  text-align: center;
  margin-top: 10px;
}

.input-error {
  border-color: red;
  color: red;
}
span {
  color: red;
  font-size: 11px;
}
/* Style for disabled button */
button:disabled {
  background-color: #e9a4b5; /* Lighter color when disabled */
  cursor: not-allowed; /* Change cursor to not-allowed */
  opacity: 0.7; /* Reduce opacity to make it look disabled */
}
</style>