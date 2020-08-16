<template>
  <nav id="primary-nav">
    <router-link v-if="username == ''"  to="/">Home</router-link>
    <router-link v-else to="/dashboard">Home</router-link>
    <router-link v-if="username == ''" to="/signup">Sign Up</router-link>
    <router-link v-if="username != ''" @click.native="logout" to="/">Log Out</router-link>
  </nav>
</template>

<script>
const axios = require("axios");
export default {
  computed: {
    username(){ return this.$store.getters.grabUsername}
  },
  methods: {
    logout() {
      let self = this;
      axios
        .delete("http://localhost:4000/api/logout/", {
          data: {
            email: self.username,
          }
        })
    .then(function (response) {
          if (response.status == 204) {
            self.$store.dispatch('resetUser');
          }
        })
        .catch(function (error) {
          // handle error
          if (error.response.status === 401) {
            alert(error.response.data);
          }
        });
    },
  },
};
</script>
// 

<style scoped>
#primary-nav {
  text-align: right;
  padding: 1rem !important;
  margin-bottom: 5rem;
  font-size: 2.5rem;
  left: 0;
  background-image: linear-gradient(to bottom, #112d32, #254e58);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  /* opacity: 0.8; */
}

#primary-nav a {
  text-transform: uppercase;
  color: #c5c6c7;
  font-weight: 700;
  padding: 1rem;
  display: inline-block;
  transition: ease-in-out 0.2s all;
}

#primary-nav a:hover {
  text-decoration: none;
  color: #32e0c4;
  transform: scale(1.5);
  margin: 0 1rem 0 2rem;
}
#primary-nav a:not(:last-child) {
  margin-right: 1rem;
}
</style>