<template>
  <div id="app">
    <headerNav></headerNav>
    <router-view />
    <footerSec></footerSec>
  </div>
</template>

<script>
import headerNav from "@/components/headerNav.vue";
import footerSec from "@/components/footer.vue";
export default {
  components: {
    headerNav,
    footerSec
  },
  methods: {
    checkSession() {
      if (
        sessionStorage.getItem("session") == "false" &&
        this.$router.currentRoute.path != "/" &&
        this.$router.currentRoute.path != "/signup"
      )
        this.$router.push("/");
    },
  },
  mounted: function () {
    this.checkSession();
    return (document.title = "Bank of VueJS");
  },
};
</script>


<style lang="scss">
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap");

* {
  font-size: 62.5%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: "Lato", sans-serif !important;
  // background: rgba(#bab2b5, 0.5);
  max-width: 1920px;
  margin: auto;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin: 0rem 3rem 3rem;
  // background: rgba(#bab2b5, 0.5);
  // padding: 0rem 3rem 3rem 3rem;
  // border-radius: $default-border-radius;
  // box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
