<template>
  <div id="bank_signup">
    <h1>Sign Up</h1>
    <div class="form__group">
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
    </div>
    <input type="text" placeholder="Address" />
    <input type="text" placeholder="City" />
    <input type="text" placeholder="State" />
    <input type="text" placeholder="Zip-Code" />

    <div class="form__group">
      <input type="email" placeholder="Email" />
      <input type="tel" placeholder="Phone Number" />
    </div>
    <div class="form__group">
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
    </div>
    <button disabled="disabled">Create Account</button>
  </div>
</template>

<style scoped>
#bank_signup {
  margin: 0 auto;
  left: 0;
  top: 0;
  max-width: 60%;
  padding: 6rem 0rem;
  background-image: linear-gradient(to right bottom, #f5efef, #86c4ba);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5);
}

#bank_signup h1 {
  color: #596e79;
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
  border-radius: 3px;
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
    