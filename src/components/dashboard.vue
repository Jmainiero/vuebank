<template>
  <div class="grid">
    <div class="grid--item grid--one grid__table">
      <table class="account_info">
        <thead>
          <tr class="accOverview-head">
            <th class="column1">Account</th>
            <th class="column2">Available Balance</th>
            <th class="column3">Starting Balance</th>
            <th class="column4">Pending Transacitons</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="column1">Checking</td>
            <td class="column2">{{ck_bal}}</td>
            <td class="column3">{{ck_starting}}</td>
            <td class="column4">{{ck_pending}}</td>
          </tr>
          <tr>
            <td class="column1">Savings</td>
            <td class="column2">{{sv_bal}}</td>
            <td class="column3">{{sv_starting}}</td>
            <td class="column4">{{sv_pending}}</td>
          </tr>
          <tr class="accOverview-total">
            <td class="column1">Total</td>
            <td class="column2">{{tot_bal}}</td>
            <td class="column3">{{tot_start}}</td>
            <td class="column4">{{tot_pending}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grid--item grid--two grid__trans">
      <table class="trans_info">
        <thead>
          <tr class="accOverview-head">
            <th class="column1">Date</th>
            <th class="column2">Description</th>
            <th class="column3">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction,i) in transactions" :key="i">
            <td>{{ transaction.created_date }}</td>
            <td>{{ transaction.vendor }}</td>
            <td>{{ transaction.transAmnt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grid--item grid--three grid__ads">
      <h2>Digital Banking Tutorials</h2>
      <p>Get updates, tools and resources to help support your financial needs and goals. We are committed to helping you find solutions to your financial challenges.</p>

      <a href="#" class="resources">Find Resources</a>
    </div>
    <div class="grid--item grid--four grid__ads">
      <h2>New to Digital Banking</h2>
      <p>Get how-to tours of our Online Banking and TD Bank app services with these interactive tutorials</p>

      <a href="#" class="exploreTuts">Explore Tutorials</a>
    </div>
  </div>
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

.grid {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 1rem;

  &--one {
    grid-column: span 2;
  }
  &--two {
    grid-row: span 5;
  }

  &--three,
  &--four {
    grid-column: span 1;
    h2 {
      display: block;
      position: relative;
      font-size: 2.5rem;
      text-transform: uppercase;
      color: #123c69;
    }
    h2:before {
      content: "";
      position: absolute;
      width: 50%;
      bottom: -15px;
      left: 25%;
      border-bottom: 2px solid #123c69;
    }
    p {
      padding: 2rem;
      margin: 2rem;
      font-size: 1.5rem;
      height: 110px;
    }
    a {
      font-size: 1.5rem;
      text-decoration: none;
      color: $color-white;
      padding: 2rem;
      background-color: #123c69;
      font-family: inherit;
      border-radius: $default-border-radius;
    }
  }
}

.accountOverview {
  height: 50vh;
  border-radius: $default-border-radius;
  margin: 0rem 10rem;
  color: $color-white;
  padding: 1rem;

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
  background: #123c69;
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
  text-transform: uppercase;
  font-weight: 500;
}

tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}

tbody tr:last-child {
  font-weight: 700;
  font-size: 2.25rem !important;
}

tbody tr {
  font-size: 2rem !important;
  color: $color-black;
  line-height: 1.2;
  font-weight: unset;
  transition: 0.3s all;
}

tbody tr:hover {
  color: #ac3b51;
  background-color: #f5f5f5;
  transform: scale(1.05);
  font-weight: 700;
  overflow: none;
  cursor: pointer;
}
</style>