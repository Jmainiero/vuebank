<template>
  <form action="#" @submit.prevent="login">
    <div id="bank_login">
      <h1>Bank of VueJS</h1>
      <input type="email" placeholder="Email" v-model="user.email" />
      <input type="password" placeholder="Password" v-model="user.password" />
      <button>Login</button>
      <!-- <button disabled="disabled">Sign</button> -->
    </div>
  </form>
</template>
<script>
const axios = require("axios");

export default {
  name: "Login",
  data: () => ({
    user: {
      email: "",
      password: "",
    },
    loggedStatus: false,
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.grabStatus;
    },
  },
  methods: {
    userStatus() {
      this.$store.dispatch("setStatus");
    },
    login() {
      let self = this;
      axios
        .post("http://localhost:3000/api/login", {
          user: self.user,
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            console.log("hello");
            self.userStatus();
            window.location = "/dashboard";
            sessionStorage.setItem("session", "true");
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          if (error.response.status === 401) {
            alert(error.response.data);
          }
        });
    },
  },
};
</script>


<style scoped>
#bank_login {
  margin: 0 auto;
  left: 0;
  top: 0;
  max-width: 60%;
  padding: 6rem 0rem;
  background-image: linear-gradient(to right bottom, #f0ece3, #dfd3c3);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5);
}

#bank_login h1 {
  color: #596e79;
  font-weight: 700;
  font-size: 3rem;
  text-transform: uppercase;
}

#bank_login h1:not(:last-child) {
  margin-bottom: 3rem;
}

#bank_login input {
  font-size: 1.5rem;
  display: block;
  margin: 0 auto;
  padding: 2rem;
  width: 50%;
  border: none;
  border-radius: 3px;
}
#bank_login input:not(:last-child) {
  margin-bottom: 3rem;
}

#bank_login input:focus {
  outline: none;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  border-bottom: 3px solid #99b898;
}

#bank_login input:focus:invalid {
  border-bottom: 3px solid #b83b5e;
}

#bank_login button {
  font-size: 1.1rem;
  background-color: #596e79;
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 40px;
  display: inline-block;
  border-radius: 100px;
  transition: all 0.2s;
  position: relative;
  border: none;
  cursor: pointer;
  color: #ffffff;
}
#bank_login button:not(:last-child) {
  margin-right: 1rem;
}
</style>
    