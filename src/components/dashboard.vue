<template>
  <section class="dashboard">
    <div class="welcome-banner">
      <div class="welcome-baner--login-detail welcome-banner--block">
        <p class="welcome-banner--line">Welcome Back, Test!</p>
        <p class="welcome-banner--status">Your last login was 09/05/2015</p>
      </div>
      <div class="welcome-banner--balance welcome-banner--block">
        <p class="welcome-banner--totalbal--text">Total Balance</p>
        <p class="welcome-banner--totalbal--digit">{{ tot_bal }}</p>
      </div>
      <!-- <button class="welcome-banner--transfer">Make a Transfer</button> -->
    </div>
    <div class="container">
      <div class="account-overview">
        <!-- <h2>Recent Transactions</h2> -->
        <table class="trans_info">
          <thead>
            <tr class="accOverview-head">
              <th class="column1">Type</th>
              <th class="column1">Account Name</th>
              <th class="column2">Status</th>
              <th class="column3">Currency</th>
              <th class="column3">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Checking</td>
              <td>*******967</td>
              <td>Active</td>
              <td>USD</td>
              <td>$50,000</td>
            </tr>
            <tr>
              <td>Savings</td>
              <td>*******967</td>
              <td>Active</td>
              <td>USD</td>
              <td>$50,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="utility-table">
        <!-- <h2>Recent Transactions</h2> -->
        <div class="transfer">
          <p>Transfer Balance</p>
          <button>Transfer Now</button>
        </div>
        <div class="loan-apply">
          <p>Apply for Loan</p>
          <button>Apply Now</button>
        </div>
        <div class="offers">
          <p>Available Offers</p>
          <button>See Offers</button>
        </div>
      </div>
    </div>
    <div class="recent_transactions">
      <!-- <h2>Recent Transactions</h2> -->
      <table class="trans_info">
        <thead>
          <tr class="accOverview-head">
            <th class="column1">Date</th>
            <th class="column1">Account</th>
            <th class="column2">Description</th>
            <th class="column3">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, i) in transactions" :key="i">
            <td>{{ transaction.Date }}</td>
            <td>{{ transaction.ck_id }}</td>
            <td>{{ transaction.vendor }}</td>
            <td>${{ transaction.transAmnt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
const axios = require("axios");
export default {
  data: function () {
    return {
      ck_bal: 0,
      ck_starting: 0,
      ck_pending: 0,
      sv_bal: 0,
      sv_starting: 0,
      sv_pending: 0,
      tot_bal: 0,
      tot_start: 0,
      tot_pending: 0,
      transactions: [],
    };
  },
  components: {},
  computed: {
    loggedIn() {
      return this.$store.getters.grabStatus;
    },
    username() {
      return this.$store.getters.grabUsername;
    },
  },
  methods: {
    async getChecking() {
      let self = this;
      const results = await axios
        .post("http://localhost:3000/ck_accountInfo", {
          user: self.username,
        })
        .then(function (response) {
          if (response.status == 204) {
            console.log("No data found");
            alert("No data found. Have you setup your account properly?");
          } else {
            self.ck_bal = self.formatMoney(response.data[0].availBal);
            self.ck_pending = self.formatMoney(response.data[0].pendingBal);
            self.ck_starting = self.formatMoney(response.data[0].todaysBal);
            return response.data[0];
          }
        })
        .catch(function (error) {
          throw error;
        });
      return results;
    },
    async getSavings() {
      let self = this;
      const results = await axios
        .post("http://localhost:3000/sv_accountInfo", {
          user: self.username,
        })
        .then(function (response) {
          if (response.status == 204) {
            console.log("No data found");
          } else {
            self.sv_bal = self.formatMoney(response.data[0].availBal);
            self.sv_pending = self.formatMoney(response.data[0].pendingBal);
            self.sv_starting = self.formatMoney(response.data[0].todaysBal);
            return response.data[0];
          }
        })
        .catch(function (error) {
          throw error;
        });
      return results;
    },
    async getTransactions() {
      let self = this;
      const results = await axios
        .post("http://localhost:3000/ckTrans", {
          user: self.username,
        })
        .then(function (response) {
          console.log(response);
          self.transactions = response.data;
        })
        .catch(function (error) {
          throw error;
        });
      return results;
    },
    totalBal(checking, savings) {
      this.tot_bal = this.formatMoney(checking.availBal + savings.availBal);
      this.tot_start = this.formatMoney(checking.todaysBal + savings.todaysBal);
      this.tot_pending = this.formatMoney(
        checking.pendingBal + savings.pendingBal
      );
    },
    formatMoney(money) {
      money = money.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      return money;
    },
  },
  async mounted() {
    const checking = await this.getChecking();
    const savings = await this.getSavings();
    if (checking != undefined && savings != undefined) {
      await this.totalBal(checking, savings);
    }
    await this.getTransactions();
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";

.container {
  display: flex;
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
}

.account-overview,
.recent_transactions,
.utility-table {
  margin-bottom: 5rem;
}

.welcome-baner--login-detail {
  float: left;
  margin-left: 1rem;
  & p {
    display: block;
    text-align: left;
  }
}

.welcome-banner {
  max-width: 100%;
  max-width: 100%;
  padding: 1rem;
  background-color: #2b7a78;
  color: #feffff;
  height: 100px;
  margin-bottom: 2rem;

  // &--block {
  //   display: block;
  // }

  &--balance {
    display: inline-block;
  }
  & button {
    // position: absolute;
    float: right;
  }
  & p {
    margin: 1rem;
    // display: inline-block;
  }

  &--line {
    font-size: 2rem;
  }
  &--status {
    font-size: 1.5rem;
  }
  &--totalbal--text {
    font-size: 1.5rem;
    text-align: left;
  }
  &--totalbal--digit {
    font-size: 2rem;
  }
  &--transfer {
    padding: 3rem;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 1.5rem;
    transition: 0.3s all;
  }
}
.account-overview {
  width: 60%;
  & table {
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
    width: 100%;
    // margin-left: 10%;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

    & thead tr {
      height: 60px;
      font-size: 2.5rem !important;
      color: #2b7a78;
    }
    & tbody tr {
      height: 50px;
    }
    & tbody tr:last-child {
      border: 0;
    }
    & tbody tr {
      border-bottom: 2px solid #def2f1;
    }

    & td {
      font-size: 1.5rem;
    }

    & tbody tr {
      font-size: 2rem !important;
      color: $color-black;
      line-height: 1.2;
      font-weight: unset;
      transition: 0.3s all;
    }
    & tbody tr:hover {
      color: #17252a;
      background-color: #def2f1;
      transform: scale(1.05);
      font-weight: 700;
      overflow: none;
      cursor: pointer;
    }
  }
}
.utility-table {
  width: 40%;
  margin-left: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  & div {
    display: inline-block;
    font-size: 3rem;
    position: relative;
    margin: 1rem;

    & p {
      padding: 2.5rem;
    }

    & button {
      font-size: 1.5rem;
      background-color: #596e79;
      text-transform: uppercase;
      text-decoration: none;
      padding: 15px 40px;
      display: inline-block;
      border-radius: $default-border-radius;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
      color: #ffffff;
    }
  }
}
.recent_transactions {
  & table {
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

    & thead tr {
      height: 60px;
      font-size: 2.5rem !important;
      color: #2b7a78;
    }
    & tbody tr {
      height: 75px;
    }
    & tbody tr:last-child {
      border: 0;
    }
    & tbody tr {
      border-bottom: 2px solid #def2f1;
    }

    & tbody tr {
      font-size: 2rem !important;
      color: $color-black;
      line-height: 1.2;
      font-weight: unset;
      transition: 0.3s all;
    }

    & tbody tr:hover {
      color: #17252a;
      background-color: #def2f1;
      transform: scale(1.05);
      font-weight: 700;
      overflow: none;
      cursor: pointer;
    }
  }
}
</style>