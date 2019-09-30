<style>
.vue-tx .table tbody tr td {
  border: 0;
}

.vue-tx td.code {
  background-color: #f8f9fa;
}

.vue-tx td.text {
  white-space: pre-line;
}
.vue-tx .fail {
  color: red;
}
.vue-tx .success {
  color: green;
}
.vue-tx .atpAddress {
  width: 134px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 18px;
  vertical-align: bottom;
}
</style>
<template>
  <div class="container vue-tx" v-bind:triggerComputed="urlChange">
    <vue-tab-buttons class="mt20" v-bind:arr="tabButtons" v-bind:tab.sync="tab"></vue-tab-buttons>
    <div class="mt20"></div>

    <div class="tab" v-show="tab == 1">
      <h3>Transaction Information</h3>
      <table class="table" v-if="tx">
        <tr>
          <td>TxHash:</td>
          <td class="monospace">{{ tx.hash }}</td>
        </tr>
        <tr>
          <td>TxReceipt Status:</td>

          <td>
            <span v-if="receiptVoStatus=='Success'" class="success">{{receiptVoStatus}}</span>
            <span v-else class="fail">{{receiptVoStatus}}</span>
          </td>
        </tr>
        <tr>
          <td>Block Height:</td>
          <td>
            <router-link v-bind:to="fragApi + '/block/' + tx.height">{{tx.height}}</router-link>
          </td>
        </tr>
        <tr>
          <td>TimeStamp:</td>
          <td>{{ timeConversion( tx.curTime) }} ago ({{ tx.curTime }})</td>
        </tr>
        <tr>
          <td>From:</td>
          <td class="monospace">
            <router-link
              v-if="tx.source"
              v-bind:to="fragApi + '/address/' + tx.source"
            >{{ tx.source }}</router-link>
          </td>
        </tr>
        <tr>
          <td>To:</td>
          <td class="monospace">
            <router-link
              v-if="tx.target"
              v-bind:to="fragApi + '/address/' + tx.target"
            >{{ tx.target }}</router-link>
          </td>
        </tr>
        <tr>
          <td>Value:</td>
          <td>{{ tx.value }} DDAM</td>
        </tr>
        <tr>
          <td>Gas Limit:</td>
          <td>{{ tx.gasLimit }}</td>
        </tr>
        <tr>
          <td>Gas Used By Txn:</td>
          <td>{{ tx.receiptVo.cumulativeGasUsed}}</td>
        </tr>
        <tr>
          <td>Gas Price:</td>
          <td>{{ tx.gasPrice }} AM</td>
        </tr>
        <tr>
          <td>Nonce:</td>
          <td>{{ tx.nonce }}</td>
        </tr>
        <tr>
          <td>Transaction Type:</td>
          <td>{{ txType }}</td>
        </tr>
        <!--<tr v-if="tx.receipt && tx.receipt.contractAddress && tx.receipt.contractAddress != '0x0000000000000000000000000000000000000000000000000000000000000000'">-->
        <!--<td>Contract Address:</td>-->
        <!--<td>-->
        <!--<router-link  v-bind:to='fragApi + "/address/" + tx.receipt.contractAddress'-->
        <!--&gt;{{tx.receipt.contractAddress}}</router-link>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>Args:</td>-->
        <!--<td v-if=" tx.type == 'deploy' ">{{ JSON.parse(tx.data).Args }}</td>-->
        <!--<td v-else></td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>Extra Data Type:</td>-->
        <!--<td >{{ tx.extra_data_type }}</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>Extra Data :</td>-->
        <!--<td v-if="tx.extra_data" class="text">{{ tx.extra_data }}</td>-->
        <!--<td v-else class="code">-->
        <!--<pre><code class="language-javascript" v-html="formatCode"></code></pre>-->
        <!--</td>-->
        <!--</tr>-->
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>

    <div class="tab" v-show="tab == 2">
      <h3>Internal Transactions</h3>
    </div>

    <div class="tab" v-show="tab == 3">
      <h3>Event Logs</h3>
    </div>
  </div>
</template>
<script>
var jsBeautify = require("js-beautify").js_beautify,
  prism = require("prismjs"),
  api = require("@/assets/api"),
  utility = require("@/assets/utility"),
  appConfig = require("@/assets/app-config"),
  BigNumber = require("bignumber.js");

require("prismjs/themes/prism.css");

module.exports = {
  components: {
    "vue-tab-buttons": require("@/components/vue-tab-buttons").default
  },
  computed: {
    formatCode() {
      var lang = prism.languages.javascript;
      if (this.tx.data)
        if (this.tx.type == "deploy")
          return prism.highlight(
            jsBeautify(JSON.parse(this.tx.data).Source),
            lang
          );
        else if (this.tx.type == "call")
          return prism.highlight(jsBeautify(this.tx.data), lang);

      return "0x0";
    },
    receiptVoStatus() {
      if (this.tx.receiptVo)
        switch (this.tx.receiptVo.status) {
          default:
          case 0:
            return "Success";
          case 1:
            return "Fail";
          case 2:
            return "BalanceNotEnough";
          case 3:
            return "ParseFail";
        }
      else return "";
    },
    txType() {
      if (this.tx)
        switch (this.tx.type) {
          default:
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
        }
      else return "";
    },
    urlChange() {
      api.getChainTransaction(
        { hash: this.$route.params.id },
        o => {
          this.tx = o;
          //          if (!o.tokenName || o.tokenName.length == 0) {
          //            if (o.hash == this.atpAddress()) {
          //              this.tx.tokenName = "ATP";
          //            }
          //          }
        },
        xhr => {
          this.$router.replace(
            (this.$route.params.api ? "/" + this.$route.params.api : "") +
              "/404!" +
              this.$route.fullPath
          );
        }
      );
    },
    isTokenTransfer() {
      try {
        if (
          this.tx.type == "call" &&
          JSON.parse(this.tx.data).Function == "transfer" &&
          JSON.parse(JSON.parse(this.tx.data).Args).length >= 2
        ) {
          return true;
        }
      } catch (error) {}
      return false;
    },
    tokenAmount() {
      BigNumber.config({ DECIMAL_PLACES: 18 });
      var amount = BigNumber(JSON.parse(JSON.parse(this.tx.data).Args)[1]);
      var decimals = BigNumber("1e+18");
      return amount.div(decimals).toFormat();
    }
  },
  data() {
    return {
      fragApi: this.$route.params.api ? "/" + this.$route.params.api : "",
      tab: 0,
      tabButtons: ["Overview"],
      tx: { tokenName: null, receiptVo: {} }
    };
  },
  methods: {
    numberAddComma(n) {
      return utility.numberAddComma(n);
    },
    timeConversion(d) {
      date = new Date(d);
      diff = Date.now() - date.getTime();
      return utility.timeConversion(diff);
    },
    toRa(n) {
      return utility.toRa(n);
    },
    atpAddress() {
      var api = this.$route.params.api ? this.$route.params.api : "mainnet";
      return appConfig.apiPrefixes[api].atp;
    }
  }
};
</script>
