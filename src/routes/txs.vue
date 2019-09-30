<style>
.vue-txs .tip a {
  color: rgb(76, 32, 133);
}

.vue-txs .info-and-pagination .info a {
  color: inherit;
}

.vue-txs td,
.vue-txs th {
  border-top-color: #ddd;
}
.vue-txs th {
  border-top-color: #ddd;
  background-color: #096dd9;
  color: #fff;
}

.vue-txs .fail {
  background: url(../../static/img/warning_icon.png) no-repeat 0 10px;
  padding-left: 28px;
}

.vue-txs .fail a {
  display: inline-block;
  max-width: 142px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<template>
  <!-- https://etherscan.io/txs -->
  <div class="vue-txs">
    <vue-bread v-bind:arr="breadcrumb" title="Transactions"></vue-bread>

    <div class="container mt20">
      <div class="align-items-center info-and-pagination mt20 row">
        <div
          class="col info"
        >{{ totalTxs }} transactions found (showing the last {{ maxDisplayCnt }} records)</div>
        <vue-pagination
          class="col-auto"
          v-bind:current="currentPage"
          v-bind:total="totalPage"
          v-on:first="onFirst"
          v-on:last="onLast"
          v-on:next="onNext"
          v-on:prev="onPrev"
          v-on:to="onTo"
        ></vue-pagination>
      </div>

      <table class="mt20 table">
        <tr>
          <th>TxHash</th>
          <th>Block</th>
          <th class="text-right">Age</th>
          <th>Type</th>
          <th>From</th>
          <th></th>
          <th>To</th>
          <th class="text-right">Value</th>
        </tr>

        <tr v-for="(o, i) in arr" :key="i">
          <td class="tdxxxwdddi">
            <router-link v-bind:to="fragApi + '/tx/' + o.hash">{{ o.hash }}</router-link>
          </td>

          <td>
            <router-link v-bind:to="fragApi + '/block/' + o.height">{{ o.height }}</router-link>
          </td>
          <td class="time">
            <div class="text-right">{{ timeConversion(o.curTime) }} ago</div>
            <div>{{ o.curTime }}</div>
          </td>
          <td class="tdxxxwdddi">{{ formatType(o.type) }}</td>
          <td class="tdxxxwddd">
            <router-link v-bind:to="fragApi + '/address/' + o.source">{{ o.source }}</router-link>
          </td>
          <td>
            <span class="fa fa-arrow-right" aria-hidden="true"></span>
          </td>
          <td class="tdxxxwddd">
            <router-link v-bind:to="fragApi + '/address/' + o.target">{{ o.target }}</router-link>
          </td>
          <td class="text-right">{{ o.value }} DDAM</td>
        </tr>
      </table>

      <vue-pagination
        v-bind:current="currentPage"
        right="1"
        v-bind:total="totalPage"
        v-on:first="onFirst"
        v-on:last="onLast"
        v-on:next="onNext"
        v-on:prev="onPrev"
        v-on:to="onTo"
      ></vue-pagination>
    </div>
  </div>
</template>
<script>
var api = require("@/assets/api"),
  utility = require("@/assets/utility"),
  BigNumber = require("bignumber.js");

module.exports = {
  components: {
    "vue-bread": require("@/components/vue-bread").default,
    "vue-pagination": require("@/components/vue-pagination").default
  },
  data() {
    return {
      arr: [],
      breadcrumb: [{ text: "Home", to: "/" }, { text: "Transactions", to: "" }],
      currentPage: 0,
      pageSize: 20,
      fragApi: this.$route.params.api ? "/" + this.$route.params.api : "",
      maxDisplayCnt: 0,
      totalPage: 0,
      totalTxs: 0
    };
  },
  methods: {
    nav(n) {
      var query = JSON.parse(window.JSON.stringify(this.$route.query));

      query.currentPage = n;
      this.$router.push({ path: this.$route.path, query });
    },
    nthPage() {
      this.$root.showModalLoading = true;

      api.getChainTransactions(
        {
          pageNum: this.$route.query.currentPage || 1,
          pageSize: this.pageSize,
          block: this.$route.query.block,
          today: this.$route.query.today || null
        },
        o => {
          console.info("。。");
          this.$root.showModalLoading = false;
          this.arr = o.content;
          this.currentPage = o.pageNum;
          this.maxDisplayCnt = o.pageSize;
          this.totalPage = o.totalPages;
          this.totalTxs = o.totalCount;
        },
        xhr => {
          console.log(xhr);
          this.$root.showModalLoading = false;
          this.$router.replace(
            (this.$route.params.api ? "/" + this.$route.params.api : "") +
              "/404!" +
              this.$route.fullPath
          );
        }
      );
    },
    numberAddComma(n) {
      return utility.numberAddComma(n);
    },
    onFirst() {
      this.nav(1);
    },
    onLast() {
      this.nav(this.totalPage);
    },
    onNext() {
      this.nav(this.currentPage + 1);
    },
    onPrev() {
      this.nav(this.currentPage - 1);
    },
    onTo(n) {
      this.nav(n);
    },
    timeConversion(d) {
      date = new Date(d);
      diff = Date.now() - date.getTime();
      return utility.timeConversion(diff);
    },
    formatType(type) {
      switch (type) {
        case 0:
          return "Transfer";
        case 1:
          return "Bind";
        case 2:
          return "TransformBind";
        case 3:
          return "UnBind";
        case 4:
          return "StakeAdd";
        case 5:
          return "StakeReduce";

        default:
          return "";
      }
    },
    toRa(n) {
      return utility.toRa(n);
    },
    easyNumber(n) {
      return utility.easyNumber(n);
    },
    tokenAmount(n) {
      BigNumber.config({ DECIMAL_PLACES: 9 });
      var amount = BigNumber(n);
      var decimals = BigNumber("1e+18");
      return amount.div(decimals).toFormat();
    }
  },
  mounted() {
    this.nthPage();
  },
  watch: {
    $route() {
      this.nthPage();
    }
  }
};
</script>
