<template>
  <div>
    <!-- <appNav /> -->
    <!-- <div class="accountOverview">
			<div class="row">
				<div class="col-1-of-4 titlebar">
					<div class="title-box">
						<h2 class="titlebar_title">Account Type</h2>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="title-box">
						<h2 class="titlebar_title">Available Balance</h2>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="title-box">
						<h2 class="titlebar_title">Today's Starting Balance</h2>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="title-box">
						<h2 class="titlebar_title">Pending Transactions</h2>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-acc">Checking</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-avail">$7,081.79</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-today">$7,081.79</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-pending">$7,081.79</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-acc">Savings</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-avail">$7,081.79</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-today">$7,081.79</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-pending">$7,081.79</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-acc">TOTAL</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-avail-total">$14,081.79</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-today-total">14,081.79</p>
					</div>
				</div>
				<div class="col-1-of-4">
					<div class="detail-box">
						<p class="detail_title detail_title-pending-total">$14,081.79</p>
					</div>
				</div>
			</div>
    </div>-->
    <table>
      <thead>
        <tr class="accOverview-head">
          <th class="column1">Date</th>
          <th class="column2">Order ID</th>
          <th class="column3">Name</th>
          <th class="column4">Price</th>
          <th class="column5">Quantity</th>
          <th class="column6">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="column1">2017-09-29 01:22</td>
          <td class="column2">200398</td>
          <td class="column3">iPhone X 64Gb Grey</td>
          <td class="column4">$999.00</td>
          <td class="column5">1</td>
          <td class="column6">$999.00</td>
        </tr>
        <tr>
          <td class="column1">2017-09-28 05:57</td>
          <td class="column2">200397</td>
          <td class="column3">Samsung S8 Black</td>
          <td class="column4">$756.00</td>
          <td class="column5">1</td>
          <td class="column6">$756.00</td>
        </tr>
        <tr>
          <td class="column1">2017-09-26 05:57</td>
          <td class="column2">200396</td>
          <td class="column3">Game Console Controller</td>
          <td class="column4">$22.00</td>
          <td class="column5">2</td>
          <td class="column6">$44.00</td>
        </tr>
      </tbody>
    </table>
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
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";

.accountOverview {
  height: 50vh;
  border-radius: $default-border-radius;
  margin: 0rem 10rem;
  color: $color-white;
  padding: 1rem;
  &--acctype {
    & h1 {
      font-size: 3rem;
      font-weight: 300;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
    display: block;
    margin-bottom: 2rem;
  }
}
//Testing

table {
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
	width: 100%;
}

table thead tr {
  height: 60px;
  // background: #ac3b61;
  background: #123C69;
}
table tbody tr {
  height: 75px;
}
table tbody tr:last-child {
  border: 0;
}


.accOverview-head th {
  font-size: 2rem !important;
  color: $color-white;
}

tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}

tbody tr {
  font-size: 2rem !important;
  color: $color-black;
  line-height: 1.2;
	font-weight: unset;
	transition: 0.3s all;
}

tbody tr:hover {
  color: #AC3B51;
	background-color: #f5f5f5;
	transform: scale(1.05);
	font-weight: 700;
	overflow: none;
  cursor: pointer;
}
</style>