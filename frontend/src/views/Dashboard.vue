<template>
  <div>
    <h1>Welcome to the Dashboard</h1>
    <button @click="logout">Logout</button>
    <p>Hello "Username"!</p>
  </div>
</template>
  
  <script>
export default {
  name: "MainDashboard",
  // Your Vue component or JavaScript file
  methods: {
    logout() {
      localStorage.removeItem("token"); // Remove token from localStorage
      // Redirect to login page or home page
      this.$router.push("/login"); // Adjust according to your routing structure
    },
  },
};
</script>
  
  <style scoped>
/* Styles for the dashboard view */
btn {
  text-align: right;
}
</style>
  