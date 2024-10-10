<template>
  <div>
    <h1>Welcome to the Dashboard</h1>
    <button @click="logout">Logout</button>
    <p>Hello "Username"!</p>
  </div>
</template>
  
  <script>
import AuthService from "../services/AuthService";

export default {
  name: "MainDashboard",
  // Your Vue component or JavaScript file
  methods: {
    async logout() {
      try {
        await AuthService.logout(); // Call the logout method from AuthService
        this.$router.push("/login"); // Redirect to the login page
      } catch (error) {
        console.error("Logout failed:", error);
        // Optionally, show an error message to the user
      }
    },
    // logout() {
    // localStorage.removeItem("token"); // Remove token from localStorage
    // // Redirect to login page or home page
    // this.$router.push("/login"); // Adjust according to your routing structure
    // },
  },
};
</script>
  
  <style scoped>
/* Styles for the dashboard view */
btn {
  text-align: right;
}
</style>
  