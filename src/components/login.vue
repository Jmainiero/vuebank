<template>
  <div id="bank_login">
    <h1>Bank of VueJS</h1>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <button disabled="disabled">Login</button>
    <button disabled="disabled">Forgot Password</button>
  </div>
</template>
<script>
const axios = require("axios");

export default {
  name: "Login",
  components: {},
  mounted() {
    axios
      .get("http://localhost:3000/api/listAccounts")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
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
    