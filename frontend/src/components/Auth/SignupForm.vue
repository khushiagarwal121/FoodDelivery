<template>
  <div class="signup-form">
    <!-- <h2>Sign Up</h2> -->
    <form @submit.prevent="handleSignup">
      <div class="input-group">
        <label for="first_name">First Name:</label>
        <input v-model="user.first_name" type="text" id="first_name" required />
      </div>
      <div class="input-group">
        <label for="last_name">Last Name:</label>
        <input v-model="user.last_name" type="text" id="last_name" required />
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input v-model="user.email" type="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input v-model="user.password" type="password" id="password" required />
      </div>
      <div class="input-group">
        <label for="country_code">Country Code:</label>
        <input
          v-model="user.country_code"
          type="text"
          id="country_code"
          required
        />
      </div>
      <div class="input-group">
        <label for="phone_number">Phone Number:</label>
        <input
          v-model="user.phone_number"
          type="tel"
          id="phone_number"
          required
        />
      </div>
      <div class="input-group">
        <label for="dob">Date of Birth:</label>
        <input v-model="user.dob" type="date" id="dob" required />
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        country_code: "",
        phone_number: "",
        dob: "",
      },
      message: "",
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          this.user
        );
        this.message = response.data.message;

        // Show success message on the signup page
        // upon clciking button on alert message screen changed
        alert(
          "User registered successfully. You will be redirected to the login page."
        );

        // Wait 2 seconds before redirecting to login page
        // setTimeout(() => {
        this.$router.push("/login");
        // }, 2000); // 2000ms = 2 seconds
      } catch (error) {
        this.message =
          error.response.data.message || "An error occurred during signup.";
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
  /* border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
}

.signup-form h2 {
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
  width: 80%;
  padding: 8px;
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
</style>