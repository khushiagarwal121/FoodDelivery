<template>
  <div class="login-form">
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
        <span v-if="errors.email" class="error-message">
          <i>{{ errors.email }}</i>
        </span>
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          @blur="validatePassword"
          :class="{ 'input-error': errors.password }"
          required
        />
        <span v-if="errors.password" class="error-message">
          <i>{{ errors.password }}</i>
        </span>
      </div>
      <button type="submit" :disabled="!isFormValid">Login</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import JSEncrypt from "jsencrypt"; // Adjust according to your actual import
import AuthService from "../../services/AuthService";
import { errorToast } from "../../utils/toast.js";
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
      publicKey: null, // To store the fetched public key
    };
  },
  async created() {
    try {
      const response = await fetch("http://localhost:5000/api/auth/public-key");
      const data = await response.json();
      this.publicKey = data.publicKey;
      console.log("Fetched Public Key:", this.publicKey);
    } catch (error) {
      console.error("Error fetching public key:", error);
    }
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
      if (this.isFormInvalid) {
        this.message = "Please correct the form errors before submitting.";
        return;
      }

      try {
        // Encrypt the password using the fetched public key
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(this.publicKey);
        const encryptedPassword = encryptor.encrypt(this.user.password);

        // Send the login request
        const response = await AuthService.login(
          this.user.email,
          encryptedPassword
        );

        console.log("Login response: ", response);

        // If login is successful, proceed with redirection
        this.message = "Login successful! Redirecting...";

        this.$router.push("/"); // Redirect to homepage or dashboard
      } catch (error) {
        // if (
        //   error.response &&
        //   error.response.data &&
        //   error.response.data.message
        // ) {
        // this.showErrorToast("Invalid email or password. Please try again.");
        // toast.error("Invalid email or password. Please try again.");
        // this.message = error; // Backend message
        // } else {
        //   this.message = "Login failed. Please try again.";
        // }
        // console.error("Login error:", error); // Log for debugging
        errorToast(error);
      }
    },
    // showErrorToast(message) {
    //   const toast = useToast(); // Initialize the toast
    //   toast.error(message); // Show error toast
    // },
    validateEmail() {
      if (!this.user.email) {
        this.errors.email = "Email is required!";
      } else {
        this.errors.email = null;
      }
    },
    validatePassword() {
      if (!this.user.password) {
        this.errors.password = "Password is required!";
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
  border-color: #cf5a7b;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #cf5a7b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #cf5a7b;
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

button:disabled {
  background-color: #e9a4b5;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
