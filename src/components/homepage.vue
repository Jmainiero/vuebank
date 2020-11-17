<template>
  <div class="homepage">
    <section class="header">
      <div class="hero-box">
        <h1 class="u-margin-bottom-sm">Worlds Worst Bank</h1>
        <p class="u-margin-bottom-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quaerat
          minima ducimus cupiditate, soluta maxime, ullam odio deserunt magni,
          distinctio quos. Sit natus nisi voluptatem voluptatum voluptates
          explicabo cum provident!
        </p>
        <button href="#your-value">Our Values</button>
      </div>
      <div class="hero-form">
        <div id="bank_login">
          <h1 class="u-margin-bottom-sm">Welcome Back</h1>
          <button>
            <a href="/login">Sign In</a>
          </button>
        </div>
      </div>
    </section>

    <section class="your-value">
      <h1 class="u-margin-bottom-sm">Do what's right for you!</h1>
      <div>
        <VueSlickCarousel v-bind="settings">
          <font-awesome-icon icon="credit-card" />
          <font-awesome-icon icon="car" />
          <font-awesome-icon icon="chart-line" />
          <font-awesome-icon icon="home" />
        </VueSlickCarousel>
      </div>

      <div class="row">
        <div class="col-1-of-3">
          <div class="card">
            <h3 class="u-margin-bottom-sm">
              Earn a $200 Bonus If you Sign up Today!
            </h3>
            <p class="u-margin-bottom-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
              rerum quo impedit consequatur maiores molestiae dolorum autem.
              Neque quod, culpa libero magni quis, odit accusantium laborum
              molestias dolorum debitis possimus!
            </p>
            <button class="learn-more">Learn More</button>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="card">
            <h3 class="u-margin-bottom-sm">Shop at home for your next car</h3>
            <p class="u-margin-bottom-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
              rerum quo impedit consequatur maiores molestiae dolorum autem.
              Neque quod, culpa libero magni quis, odit accusantium laborum
              molestias dolorum debitis possimus!
            </p>
            <button class="learn-more">Learn More</button>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="card">
            <h3 class="u-margin-bottom-sm">
              $500 Bonus for closing all of your accounts today
            </h3>
            <p class="u-margin-bottom-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
              rerum quo impedit consequa tur maiores molestiae dolorum autem.
              Neque quod, culpa libero magni quis, odit accusantium laborum
              molestias dolorum debitis possimus!
            </p>
            <button class="learn-more">Learn More</button>
          </div>
        </div>
      </div>
    </section>

    <section class="extra-payments">
      <h1 class="u-margin-bottom-sm">Learn how to bank from almost anywhere</h1>
      <div class="row">
        <div class="col-1-of-2">
          <font-awesome-icon icon="camera-retro" />
        </div>
        <div class="col-1-of-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eum
            corporis voluptas. Ea nemo optio asperiores voluptatum iusto labore.
            Temporibus ex illo tenetur corporis corrupti similique repellendus
            repudiandae eligendi. Assumenda.
          </p>
          <button>Go to Videos</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
const axios = require("axios");
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "Login",
  components: { VueSlickCarousel },
  data: () => ({
    settings: {
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 500,
      cssEase: "linear",
    },
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
    setUser(username) {
      this.$store.dispatch("setUser", username);
    },
    login() {
      let self = this;
      axios
        .post("http://localhost:4000/api/login", {
          user: self.user,
        })
        .then(function (response) {
          if (response.status == 200) {
            self.userStatus();
            self.setUser(self.user.email);
            self.$router.push("/dashboard");
            sessionStorage.setItem("session", "true");
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

.u-margin-bottom-sm {
  margin-bottom: 3rem;
}

a {
  font-size: inherit;
  color: inherit;
  text-decoration: none;
}

button {
  font-weight: 700;
  transition: 0.3s all;
  display: inline-block;
}

button:hover {
  background: #def2f1;
  transform: scale(1.2);
}

.header {
  background-image: linear-gradient(
      to right,
      rgba(#3aafa9, 0.8),
      rgba(#2b7a78, 0.9)
    ),
    url("~@/assets/homepage/header-1.jpg");
  background-size: cover;
  background-position: bottom;
  height: 65vh;
  position: relative;
}

.hero-box {
  width: 30%;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  position: absolute;
  color: #ffffff;
  & h1 {
    font-size: 5rem;
  }
  & p {
    font-size: 1.5rem;
  }
  & button {
    padding: 1.5rem;
    font-size: 1.5rem;
    border-radius: 5px;
    outline: none;
    border: none;
  }
}
.hero-form {
  width: 30%;
  top: 50%;
  right: 30%;
  transform: translate(70%, -100%);
  position: absolute;
  color: #ffffff;
  padding: 2.5rem;
  background-color: rgba(#17252a, 0.8);
  border-radius: 1rem;
  & h1 {
    font-size: 2rem;
  }
  & button {
    padding: 1.5rem;
    font-size: 1.5rem;
    border-radius: 5px;
    outline: none;
    border: none;
    // color: #6e6658;
    width: 60%;
  }
}

.your-value {
  // height: 300px;
  padding: 5rem;
  // width: 50%;
  margin: 0 auto;
  & h1 {
    font-size: 3rem;
  }
  & h3 {
    font-size: 2rem;
  }
  & p {
    font-size: 1.5rem;
  }
  img {
    border-radius: 5px;
  }
  svg {
    font-size: 10rem;
  }

  .card {
    margin-top: 2rem;
    padding: 5rem;
  }

  & button {
    padding: 2rem;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 1.5rem;
    transition: 0.3s all;
  }
}

.extra-payments {
  background: #3aafa9;
  height: 300px;
  color: #ffffff;
  padding: 2rem;

  & h1 {
    font-size: 3rem;
  }
  & p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  & button {
    padding: 1rem;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 1.5rem;
    transition: 0.3s all;
  }
  svg {
    font-size: 10rem;
  }
}
</style>
    