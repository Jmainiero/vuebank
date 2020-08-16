<template>
  <div>
    <!-- <appNav /> -->
    <div class="accountOverview">
      <div class="row">
        <div class="accountOverview--acctype">
          <h1>Checking</h1>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p class="p-ck-title p-ck-title--balance">Checking</p>
            <p class="p-ck---balance">$7,077.21</p>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p class="p-ck-title p-ck-title--startbalance">Starting Balance</p>
            <p class="p-ck--startbalance">$6,981.08</p>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p class="p-ck-title p-ck-title--availbal">Available Balance</p>
            <p class="p-ck--availbal">$5,451.79</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="accountOverview--acctype">
          <h1>Savings</h1>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p class="p-sv-title p-sv-title--availbal">Available Balance</p>
            <p class="p-sv--availbal">$5,451.79</p>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p class="p-sv-title p-sv-title--availbal">Available Balance</p>
            <p class="p-sv--availbal">$5,451.79</p>
          </div>
        </div>
        <div class="col-1-of-3">
          <div class="feature-box">
            <p class="p-sv-title p-sv-title--availbal">Available Balance</p>
            <p class="p-ck--availbal">$5,451.79</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    loggedIn() {
      return this.$store.getters.grabStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";

.accountOverview {
  background: linear-gradient(
    to bottom right,
    rgba(#254e58, 0.9),
    rgba(#112d32, 1)
  );
  // background: linear-gradient(
  //   to bottom right,
  //   rgba(#3b6978, 0.9),
  //   rgba(#204051, 1)
  // );
  border-radius: 3px;
  padding: 5rem;
  margin: 0rem 10rem;
  color: $color-white;
  &--acctype {
    // display: inline-block;
    // width: 60%;
    & h1 {
      font-size: 3rem;
      font-weight: 300;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
  }
}

.row {
  padding: 1rem;
  background: linear-gradient(
    to bottom right,
    rgba(#3b6978, 0.8),
    rgba(#204051, 0.8)
  );
  box-shadow: 0 1.5rem 4rem rgba($color-black, 0.15);
}

.feature-box {
  font-size: 2rem;
  padding: 5rem;
  text-align: center;
  color: $color-white;
  text-transform: uppercase;
  transition: 0.2s all;

  &:not(:last-child) {
    border-right: 0.001rem solid $color-grey-dark-3;
  }

  & p {
    font-size: inherit;
    font-weight: 700;
  }
}
.p-sv-title,
.p-ck-title {
  font-size: 1.5rem !important;
  margin-bottom: 2rem;
  color: $color-grey-light-2;
  font-weight: 300 !important;
}
</style>