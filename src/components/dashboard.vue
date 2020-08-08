<template>
  <div>
    <appNav />
    <div class="accountOverview">
      <div class="accountOverview--acctype">
        <h1>Checking</h1>
      </div>
      <div class="row">
        <div class="col-1-of-3">
          <div class="feature-box">
            <p>Checking</p>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p>Starting Balance</p>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p>Available Balance</p>
          </div>
        </div>
      </div>
      <div class="accountOverview--acctype">
        <h1>Savings</h1>
      </div>
      <div class="row">
        <div class="col-1-of-3">
          <div class="feature-box">
            <p>Savings</p>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p>Starting Balance</p>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p>Available Balance</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appNav from "@/components/appNav.vue";
export default {
  components: {
    appNav,
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";

.accountOverview {
  background: linear-gradient(to bottom right, rgba(#ffcb9a, 0.6), rgba(#d9b08c, 1));
  padding: 2rem;
  margin: 0rem 10rem;

  &--acctype {
    display: inline-block;
    width: 60%;
    & h1 {
      color: #2C3531;
      font-size: 3rem;
      text-align: left;
      margin-bottom: 1rem;
    }
  }
}

.feature-box {
  background-color: rgba($color-white, 0.8);
  font-size: 1.5rem;
  padding: 2.5rem;
  text-align: center;
  border-radius: 2px;
  box-shadow: 0 1.5rem 4rem rgba($color-black, 0.15);

  & p {
      font-size: inherit;
  }
}
</style>