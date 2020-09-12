<template>
  <div id="bank_transfers">
    <h1>Transfer</h1>
    <form action="#" @submit.prevent="transfer">
      <div class="form__group">
        <select v-model="transferDetails.fromAcc" name="widthdrawl from">
          <option value disabled>Withdraw From</option>
          <option value="checking" selected>Checking</option>
          <option value="savings">Savings</option>
        </select>
        <select v-model="transferDetails.toAcc" name="deposit to">
          <option value disabled>Deposit In</option>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>
        <input type="number" placeholder="Amount" v-model="transferDetails.fromAmnt" />
      </div>
      <div class="form__group">
        <button>Submit Transfer</button>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Transfers",
  computed: {
    username() {
      return this.$store.getters.grabUsername;
    },
  },
  data() {
    return {
      transferDetails: {
        fromAcc: "",
        fromAmnt: "",
        toAcc: "",
      },
    };
  },
  methods: {
    isPopulated() {
      for (let x in this.transferDetails) {
        if (this.transferDetails[x] == "") {
          return false;
        }
      }
      if (this.transferDetails.toAcc == this.transferDetails.fromAcc) {
        return false;
      }
      return true;
    },
    transfer() {
      let self = this;
      if (self.isPopulated()) {
        axios
          .post("http://localhost:3000/api/transfer", {
            transferdata: self.transferDetails,
            user: self.username,
          })
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              // window.location = "/";
              alert(response.status);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error.response);

            if (error.response.status === 409) {
              alert(error.response.data);
            }
          });
      } else {
        alert("Error. Please check all fields and try again.");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import "src/scss/base/_mixins.scss";
@import "src/scss/base/_variables.scss";
@import "src/scss/layout/_grid.scss";
#bank_transfers {
  margin: 0 auto;
  left: 0;
  top: 0;
  max-width: 80%;

  & h1 {
    font-weight: 700;
    font-size: 2.5rem;
    text-transform: uppercase;
    margin-bottom: 3rem;
  }

  & label {
    font-size: 1.5rem;
    display: block;
    padding: 2rem;
    text-align: left;
  }

  & select,
  input,
  option {
    display: inline-block;
    font-size: 1.25rem;
    margin: 0 auto;
    padding: 2rem;
    border: none;
    border-radius: $default-border-radius;
    text-align: center;
  }
  & select {
    width: 25%;
    margin-right: 2rem;

    &:focus {
      appearance: none;
      outline: none;
    }
    &:placeholder-shown {
      text-align: center;
    }
  }
  & option {
    padding: 2rem;
  }
  & input:focus:invalid {
    border-bottom: 3px solid #b83b5e;
  }
  & input:focus {
    outline: none;
  }
  & button {
    margin: 0 auto;
    display: block;
    font-size: 1.1rem;
    background-color: #596e79;
    text-transform: uppercase;
    text-decoration: none;
    padding: 15px 40px;
    border-radius: 100px;
    transition: all 0.2s;
    position: relative;
    border: none;
    cursor: pointer;
    color: #ffffff;

    &:focus {
      outline: none;
    }
  }

  & .form__group {
    display: block;
    & input {
      display: inline-block;
      width: 30%;
    }
    &:last-child {
      margin-top: 3rem;
    }
  }
}

.form__group--mw-40 {
  margin: 0 auto;
  display: inline-block;
  max-width: 70%;
}
</style>
    