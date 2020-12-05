<template>
  <div class="login">
    <form action="#" @submit.prevent="login">
      <div id="bank_login">
        <h1>Login</h1>
        <input type="email" placeholder="Email" v-model="user.email" />
        <input type="password" placeholder="Password" v-model="user.password" />
        <button>Login</button>
        <!-- <button disabled="disabled">Sign</button> -->
      </div>
    </form>
  </div>
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
    setUser(payload) {
      this.$store.dispatch("setUser", payload);
    },
    login() {
      let self = this;
      axios
        .post("http://localhost:3000/api/login", {
          user: self.user,
        })
        .then(function (response) {
          if (response.status == 200) {
            sessionStorage.setItem("authtk", response.data.accessToken);
            self.userStatus();
            self.setUser({
              username: self.user.email,
              authTk: response.data.accessToken,
            });
            self.$router.push("/dashboard");
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


<style lang="scss" scoped>
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";

.login {
  background: #3aafa9;
  color: #000000;
  height: 85vh;
  position: relative;
}

#bank_login {
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 50%;
  max-width: 50%;
  padding: 6rem 0rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5);
  background: #ffffff;
}

#bank_login h1 {
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
  border-bottom: 1px solid #17252a;
  transition: 0.3s all;
  // border-radius: $default-border-radius;
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
  font-size: 1.5rem;
  background-color: #596e79;
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 40px;
  display: inline-block;
  border-radius: $default-border-radius;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  color: #ffffff;
}
#bank_login button:not(:last-child) {
  margin-right: 1rem;
}
</style>
    