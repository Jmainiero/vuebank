<template>
  <nav id="primary-nav">
    <router-link v-if="username == ''" to="/">Home</router-link>
    <!-- <router-link v-if="username == ''" to="/signup">Sign Up</router-link> -->
    <!-- <router-link v-if="username != ''" to="/transfer">Transfer</router-link> -->
    <router-link v-if="username != ''" @click.native="logout" to="/"
      >Log Out</router-link
    >
  </nav>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.getters.grabUsername;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("resetUser");
      sessionStorage.removeItem("authtk");
    },
  },
};
</script>
// 

<style lang="scss" scoped>
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";

#primary-nav {
  color: #feffff;
  text-align: right;
  padding: 1rem !important;
  font-size: 2.5rem;
  left: 0;
  background: #17252a;
}

#primary-nav a {
  text-transform: uppercase;
  font-weight: 500;
  padding: 1.5rem;
  display: inline-block;
  transition: ease-in-out 0.2s all;

  &:last-child {
    background: rgba(#2b7a78, 0.9);
    font-weight: 700;
    color: #def2f1;
  }

  &:not(:last-child) {
    color: inherit;
  }

  border-radius: $default-border-radius;
  text-decoration: none;
}

#primary-nav a:hover {
  text-decoration: none;
  color: #3aafa9;
  transform: scale(1.2);
  margin: 0 1rem 0 2rem;
  background: transparent;
}
#primary-nav a:not(:last-child) {
  margin-right: 1rem;
}
</style>