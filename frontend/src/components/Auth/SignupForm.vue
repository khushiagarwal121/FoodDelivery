<template>
  <div class="signup-form">
    <form @submit.prevent="handleSignup">
      <div class="input-group">
        <label for="first_name">First Name:</label>
        <input
          v-model="user.first_name"
          type="text"
          id="first_name"
          @blur="validateFirstName"
          :class="{ 'input-error': errors.first_name }"
          required
        />
        <span v-if="errors.first_name" class="error-message">{{
          errors.first_name
        }}</span>
      </div>

      <div class="input-group">
        <label for="last_name">Last Name:</label>
        <input
          v-model="user.last_name"
          type="text"
          id="last_name"
          @blur="validateLastName"
          :class="{ 'input-error': errors.last_name }"
          required
        />
        <span v-if="errors.last_name" class="error-message">{{
          errors.last_name
        }}</span>
      </div>

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
          :class="{ 'input-error': errors.password }"
          required
        />
        <span v-if="errors.password" class="error-message">{{
          errors.password
        }}</span>
      </div>

      <div class="input-group">
        <label for="country_code">Country Code:</label>
        <input
          v-model="user.country_code"
          type="text"
          id="country_code"
          @blur="validateCountryCode"
          :class="{ 'input-error': errors.country_code }"
          required
        />
        <span v-if="errors.country_code" class="error-message">{{
          errors.country_code
        }}</span>
      </div>

      <div class="input-group">
        <label for="phone_number">Phone Number:</label>
        <input
          v-model="user.phone_number"
          type="tel"
          id="phone_number"
          @blur="validatePhoneNumber"
          :class="{ 'input-error': errors.phone_number }"
          required
        />
        <span v-if="errors.phone_number" class="error-message">{{
          errors.phone_number
        }}</span>
      </div>

      <div class="input-group">
        <label for="dob">Date of Birth:</label>
        <input
          v-model="user.dob"
          type="date"
          id="dob"
          @blur="validateDOB"
          :class="{ 'input-error': errors.dob }"
          required
        />
        <span v-if="errors.dob" class="error-message">{{ errors.dob }}</span>
      </div>

      <button :disabled="isFormInvalid" type="submit">Submit</button>
    </form>

    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import JSEncrypt from "jsencrypt";
import AuthService from "@/services/AuthService";

export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        // password: "", // sensitive data to encrypt
        country_code: "",
        phone_number: "",
        dob: "",
      },
      message: "",
      errors: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        country_code: null,
        phone_number: null,
        dob: null,
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
    isFormInvalid() {
      return (
        Object.values(this.errors).some((error) => error !== null) ||
        Object.values(this.user).some((value) => !value)
      );
    },
  },
  methods: {
    async handleSignup() {
      if (this.isFormInvalid) {
        this.message = "Please correct the form errors before submitting.";
        return;
      }
      // Encrypt the password
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(this.publicKey);
      const encryptedPassword = encryptor.encrypt(this.user.password);

      // Prepare the payload
      const signupData = {
        ...this.user,
        password: encryptedPassword, // use the encrypted password
      };
      console.log("signup data ", signupData);
      try {
        const response = await AuthService.signup(signupData);
        console.log("response:", response);

        // Assuming the backend sends a success message in response.data.message
        this.message = response.message;

        alert(
          "User registered successfully. You will be redirected to the login page."
        );
        this.$router.push("/login");
      } catch (error) {
        // Enhanced error handling: Check for different types of errors
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.message = error.response.data.message; // Backend error message
        } else if (error.response && error.response.data) {
          this.message = "Signup failed. No detailed message available.";
        } else if (error.response) {
          this.message = "An unknown error occurred during signup.";
        } else {
          // Fallback for network issues or unknown errors
          this.message = "A network error occurred. Please try again.";
        }

        // Log the full error object for debugging purposes
        console.error("Signup error:", error);
      }
    },
    validateFirstName() {
      if (!this.user.first_name) {
        this.errors.first_name = "First name is required.";
      } else {
        this.errors.first_name = null;
      }
    },
    validateLastName() {
      if (!this.user.last_name) {
        this.errors.last_name = "Last name is required.";
      } else {
        this.errors.last_name = null;
      }
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.user.email) {
        this.errors.email = "Email is required.";
      } else if (!emailPattern.test(this.user.email)) {
        this.errors.email = "Invalid email format.";
      } else {
        this.errors.email = null;
      }
    },
    validatePassword() {
      if (!this.user.password) {
        this.errors.password = "Password is required.";
      } else if (this.user.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters.";
      } else {
        this.errors.password = null;
      }
    },
    validateCountryCode() {
      if (!this.user.country_code) {
        this.errors.country_code = "Country code is required.";
      } else {
        this.errors.country_code = null;
      }
    },
    validatePhoneNumber() {
      if (!this.user.phone_number) {
        this.errors.phone_number = "Phone number is required.";
      } else {
        this.errors.phone_number = null;
      }
    },
    validateDOB() {
      if (!this.user.dob) {
        this.errors.dob = "Date of birth is required.";
      } else {
        this.errors.dob = null;
      }
    },
  },
};
</script>

<style scoped>
.signup-form {
  max-width: 350px;
  margin: auto;
  padding: 10px;
}

.signup-form h2 {
  text-align: center;
  color: #cf5a7b;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 80%;
  padding: 8px;
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

button:disabled {
  background-color: #e9a4b5;
  cursor: not-allowed;
}

button:hover {
  background-color: #cf5a7b;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column; /* Stack label, input, and error vertically */
}

.input-group input {
  width: 100%; /* Take up the full width */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block; /* Ensures the error message is on a new line */
}

.input-error {
  border-color: red; /* Highlight input with error */
}
</style>
