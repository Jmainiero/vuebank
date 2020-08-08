<template>
  <div class="sub-nav-acc">
    <nav>
      <ul>
        <li>Checking</li>
        <li>Savings</li>
        <li>Credit Card</li>
        <li>Support</li>
        <li>Transfer</li>
      </ul>
    </nav>
  </div>
</template>


<style lang="scss" scoped>
.sub-nav-acc {
  & {
    margin-bottom: 3rem;
    padding: 1rem !important;
    font-size: 2.5rem;
    left: 0;
    background-image: linear-gradient(
      to bottom,
      rgba(#1f2833, 50%),
      rgba(#1f2833, 30%)
    );
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    opacity: 0.8;
  }
  & ul {
    font-size: 2.5rem;
    list-style: none;
    display: block;

    & li {
      display: inline-block;
      margin: 0rem 3rem;
    }
  }
}
</style>