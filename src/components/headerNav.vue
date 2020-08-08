<template>
  <nav id="primary-nav">
    <router-link to="/">Home</router-link>
    <router-link to="/">Login</router-link>
    <router-link to="/signup">Sign Up</router-link>
  </nav>
</template>

<style scoped>
#primary-nav {
  text-align: right;
  padding: 1rem !important;
  /* margin-bottom: 3rem; */
  font-size: 2.5rem;
  left: 0;
  background-image: linear-gradient(to bottom, #1F2933, #1F2833);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  opacity: 0.8;
}

#primary-nav a {
  text-transform: uppercase;
  color: #C5C6C7;
  font-weight: 700;
  padding: 1rem;
  display: inline-block;
  transition: ease-in-out .2s all;
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