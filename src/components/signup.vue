<template>
  <form action="#" @submit.prevent="signup" autocomplete="off">
    <div id="bank_signup">
      <h1>Sign Up</h1>
      <div class="form__group">
        <input type="text" placeholder="First Name" v-model="formdata.first" />
        <input type="text" placeholder="Last Name" v-model="formdata.last" />
      </div>
      <input type="text" placeholder="Address" v-model="formdata.address" />
      <input type="text" placeholder="City" v-model="formdata.city" />
      <input type="text" placeholder="State" v-model="formdata.state" />
      <input type="text" placeholder="Zip-Code" v-model="formdata.zip" />

      <div class="form__group">
        <input type="email" placeholder="Email" v-model="formdata.email" />
        <input type="tel" placeholder="Phone Number" v-model="formdata.phone" />
      </div>
      <div class="form__group">
        <input
          type="password"
          placeholder="Password"
          v-model="formdata.password"
        />
        <input type="password" placeholder="Confirm Password" />
      </div>
      <button>Create Account</button>
    </div>
  </form>
</template>

<script>
const axios = require("axios");

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      formdata: {
        first: "",
        last: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      let self = this;
      axios
        .post("http://localhost:3000/api/postSignup", {
          formdata: self.formdata,
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            self.$router.push("/");
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);

          if (error.response.status === 409) {
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
#bank_signup {
  margin: 0 auto;
  left: 0;
  top: 0;
  max-width: 60%;
  padding: 6rem 0rem;
  background-image: linear-gradient(to right bottom, #254e58, #112d32);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5);
  border-radius: $default-border-radius;
}

#bank_signup h1 {
  color: #ffffff;
  font-weight: 700;
  font-size: 3rem;
  text-transform: uppercase;
}

#bank_signup h1:not(:last-child) {
  margin-bottom: 3rem;
}

#bank_signup input {
  display: block;
  font-size: 1.25rem;
  margin: 0 auto;
  padding: 2rem;
  width: 50%;
  border: none;
  border-radius: $default-border-radius;
}
#bank_signup input:not(:last-child) {
  margin-bottom: 3rem;
}

#bank_signup .form__group {
  display: block;
}
#bank_signup .form__group input {
  display: inline-block;
  width: 25%;
}
#bank_signup .form__group input:not(:last-child) {
  display: inline-block;
  margin-right: 1rem;
}

#bank_signup input:focus {
  outline: none;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  border-bottom: 3px solid #99b898;
}

#bank_signup input:focus:invalid {
  border-bottom: 3px solid #b83b5e;
}

#bank_signup button {
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
#bank_signup button:not(:last-child) {
  margin-right: 1rem;
}
</style>
    