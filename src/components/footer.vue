<template>
  <footer class="footer-nav">
    <p>Thank you for visiting the world worst bank. I hope you didn't arrive with high exepectations.</p>

    <p>This website was designed and built by <a href="www.JohnMainiero.com">John Mainiero&copy;</a></p>
  </footer>
</template>



<style lang="scss" scoped>
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";

footer {
    // height: 10vh;
    background: #2b2b2b;
    color: #ffffff;
    font-size: 2rem;
    padding: 2rem;
    width: 100%;
    bottom: 0;
}
p {
    padding: 2rem;
}
a {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.75rem;
    display: inline-block;
    transition: 0.3s all;
    
    &:hover {
        color: orangered;
        transform: translate(10px, -10px) scale(1.1);
    }
}
</style>