<template>
  <div id="app">
     <headerNav/>
      <router-view/>
  </div>
</template>

<script>
import headerNav from '@/components/headerNav.vue'
export default {
  components: {
    headerNav
  },
  methods: {
    checkSession() {
     if (sessionStorage.getItem('session') == 'false' && this.$router.currentRoute.path != ('/') && this.$router.currentRoute.path != '/signup') this.$router.push('/');
    }
  },
  mounted: function(){
    this.checkSession();
      console.log(this.$router.currentRoute);
      return document.title = "Bank of VueJS";
    
  }
}
</script>


<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

* {
  font-size: 62.5%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Lato', sans-serif !important;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
