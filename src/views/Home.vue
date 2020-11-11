<template>
  <div class="home">
    <login/>
  </div>
</template>

<script>
// @ is an alias to /src
import login from '@/components/homepage.vue'

export default {
  name: 'Home',
  components: {
    login
  }, 
  computed: {
    // localStatus() {
    //   return sessionStorage.getItem('session');
    // },
  },
}
</script>
