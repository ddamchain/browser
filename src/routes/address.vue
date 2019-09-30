<style>
.vue-address td.out {
  width: 50px;
}

.vue-address td.in::before,
.vue-address td.out::before {
  border-radius: 4px;
  color: white;
  padding: 3px 5px;
}

.vue-address td.in::before {
  background-color: var(--green);
  content: "in";
}

.vue-address td.out::before {
  background-color: var(--orange);
  content: "out";
}

.vue-address .container .table th {
  border-top: 0;
}

.vue-address .container .title {
  overflow: auto;
}

.vue-address .txfee {
  color: silver;
}

.vue-address .tab a {
  font-size: 13px;
}

.vue-address .fail {
  background: url(../../static/img/warning_icon.png) no-repeat 0 10px;
  padding-left: 28px;
}

.vue-address .fail a {
  display: inline-block;
  max-width: 142px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vue-address .tdxxxwddd {
  padding: 0.75rem 0.4rem;
}
.vue-address .tdxxxwddd img {
  margin-right: 5px;
}
</style>
<template>
  <!-- https://etherscan.io/address/0xea674fdde714fd979de3edf0f56aa9716b898ec8 -->
  <div class="vue-address" v-bind:triggerComputed="urlChange">
    <vue-bread v-bind:arr="breadcrumb"></vue-bread>
    <div class="container" v-if="obj">
      <table class="c333 table">
        <tr>
          <th>
            Overview
            <span class="c777" v-show="obj.hash">| {{ obj.hash }}</span>
          </th>
          <th class="text-right">
            <!-- * uncomment this img tag -->
            <!-- <img src=%qrcode> -->
          </th>
        </tr>
        <tr>
          <td>DDAM Balance:</td>
          <td
            v-if="obj.balance > 1000"
          >{{  numberAddComma(obj.balance) + " DDAM "}}</td>
          <td v-else>{{ toRa(obj.balance)}}</td>
        </tr>
        <tr>
          <td>Nonce:</td>
          <td>{{ obj.nonce }}</td>
        </tr>
        <tr>
          <td>Number Of Transactions:</td>
          <td>{{ obj.transCount }}</td>
        </tr>
        <tr>
          <td>Minted:</td>
          <td>{{ obj.blockNum }}</td>
        </tr>
      </table>

      <vue-tab-buttons class="mt20" v-bind:arr="tabButtons" v-bind:tab.sync="tab"></vue-tab-buttons>
      <div class="mt20"></div>

      <!--    Transactions
      ============================================================-->
      <div class="tab" v-show="tab == 1">
        <div class="align-items-center row title">
          <div class="col">
            <span class="c333 fa fa-sort-amount-desc" aria-hidden="true"></span>
            Latest {{ txs.length }} txns from a total Of
            <router-link
              v-bind:to="fragApi + '/txs?source=' + $route.params.id"
            >{{ obj.transCount }} transactions</router-link>
            <!--<router-link v-bind:to='fragApi + "/txs?a=" + $route.params.id + "&isPending=true" '>( + {{ obj.pendingTxCnt == 0? 0 : obj.pendingTxCnt }} PendingTxn )</router-link>-->
          </div>
          <div class="col-auto">
            <router-link
              class="btn btn-link"
              v-bind:to="fragApi + '/txs?address=' + $route.params.id"
            >View All {{ obj.transCount }} Txn</router-link>
            <!--|-->
            <!--<router-link class="btn btn-link" v-bind:to='fragApi + "/txs?address=" + $route.params.id + "&isPending=true" '>View All {{ obj.pendingTxCnt == 0? 0 : obj.pendingTxCnt }} PendingTxn</router-link>-->
          </div>
        </div>

        <table class="mt20 table">
          <tr>
            <th>TxHash</th>
            <th>Block</th>
            <th>Age</th>
            <th>From</th>
            <th></th>
            <th>To</th>
            <th>Value</th>
            <th class="txfee">[TxFee]</th>
          </tr>

          <tr v-for="(o, i) in txs" :key="i">
            <td>
              <router-link v-bind:to="fragApi + '/tx/' + o.hash">{{ o.hash }}</router-link>
            </td>
            <td>
              <router-link v-if="o.height" v-bind:to="fragApi + '/block/' + o.height">{{ o.height }}</router-link>
              <i v-else>(pending)</i>
            </td>
            <td class="time">
              <div>{{ timeConversion(o.curTime) }} ago</div>
              <div>{{ o.curTime }}</div>
            </td>
            <td class="tdxxxwddd">
              <span v-if="o.source == $route.params.id">{{ o.source }}</span>
              <router-link v-else v-bind:to="fragApi + '/address/' + o.source">{{ o. source }}</router-link>
            </td>
            <td class="text-uppercase" v-bind:class="inOutClass(o)"></td>
            <td class="tdxxxwddd">
              <span v-if="o.target == $route.params.id">{{ o.target }}</span>
              <router-link v-else v-bind:to="fragApi + '/address/' + o.target">{{ o.target }}</router-link>
            </td>
            <td>{{ o.value }} DDAM</td>
            <td class="txfee">
              <span
                v-if="o.height"
              >{{ (o.gasPrice * (o.receiptVo?o.receiptVo.cumulativeGasUsed :1))+'AM' }}</span>
              <i v-else>(pending)</i>
            </td>
          </tr>
        </table>
      </div>

      <!--    code
      ============================================================-->
      <div class="tab" v-show=" tab == 2">
        <table class="mt20 table">
          <!--<tr>-->
          <!--<pre><code class=language-javascript v-html=formatCode> </code></pre>-->
          <!--</tr>-->
        </table>
      </div>
      <!--    data
      ============================================================-->
      <div class="tab" v-show="tab == 3">
        <table class="mt20 table">
          <!--<tr>-->
          <!--<pre><code class=language-javascript v-html=formatData> </code></pre>-->
          <!--</tr>-->
        </table>
      </div>

      <!--    Minted Blocks
      ============================================================-->
      <div class="tab" v-show="tab == 2">
        <div class="align-items-center row title">
          <div class="col">
            <span class="c333 fa fa-sort-amount-desc" aria-hidden="true"></span>
            Latest {{ minted.length }} blocks (From a total of
            <router-link
              v-bind:to="fragApi + '/blocks?proposer=' + $route.params.id"
            >{{ obj.blockNum}}</router-link>)
          </div>
          <div class="col-auto">
            <router-link
              class="btn btn-link"
              v-bind:to="fragApi + '/blocks?proposer=' + $route.params.id"
            >View All</router-link>
          </div>
        </div>

        <table class="mt20 table">
          <tr>
            <th>Block</th>
            <th>Age</th>
            <th>Transactions Count</th>
          </tr>
          <tr v-for="(o, i) in minted" :key="i">
            <td>
              <router-link v-bind:to="fragApi + '/block/' + o.height">{{ o.height }}</router-link>
            </td>
            <td class="time">
              <div>{{ timeConversion(o.curTime) }} ago</div>
              <div>{{ o.curTime }}</div>
            </td>
            <td>{{ o.transCount }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
var api = require("@/assets/api"),
  prism = require("prismjs"),
  jsBeautify = require("js-beautify").js_beautify,
  utility = require("@/assets/utility"),
  BigNumber = require("bignumber.js");

module.exports = {
  components: {
    "vue-bread": require("@/components/vue-bread").default,
    "vue-pagination": require("@/components/vue-pagination").default,
    "vue-tab-buttons": require("@/components/vue-tab-buttons").default,
    "vue-blockies": require("@/components/vue-blockies").default
  },
  computed: {
    formatCode() {
      var lang = prism.languages.javascript;

      if (this.obj.code) {
        var code = JSON.parse(this.obj.code);
        if (code.code) {
          return prism.highlight(jsBeautify(code.code), lang);
        }
      }
      return "0x0";
    },
    formatData() {
      if (this.obj.state_data) {
        return this.obj.state_data;
      }
      return "0x0";
    },
    tabButtons() {
      return ["Transactions", "Minted Blocks"];
    },
    urlChange() {
      this.$root.showModalLoading = true;
      api.getChainAddress(
        { address: this.$route.params.id },
        o => {
          console.log(o);
          this.$root.showModalLoading = false;
          this.minted = o.blocks;
          this.obj = o;
          this.txs = o.trans;
          console.log(this.minted.length);
          console.log(this.txs.length);
        },
        xhr => {
          //this.$root.showModalLoading = false;
          //this.$router.replace((this.$route.params.api ? "/" + this.$route.params.api : "") + "/404!" + this.$route.fullPath);
        }
      );
    }
  },
  data() {
    return {
      breadcrumb: [{ text: "Home", to: "/" }, { text: "Address", to: "" }],
      fragApi: this.$route.params.api ? "/" + this.$route.params.api : "",
      minted: [],
      verified: [],
      obj: null,
      tab: 0,
      txs: [],
      tokens: []
    };
  },
  methods: {
    inOutClass(o) {
      if (o.source == this.$route.params.id) return "out";
      else if (o.target == this.$route.params.id) return "in";
      else return "";
    },
    failClass(o) {
      if (o.status == 0) return "!";
      else return " ";
    },
    numberAddComma(n) {
      return utility.numberAddComma(n);
    },
    timeConversion(d) {
      date = new Date(d);
      diff = Date.now() - date.getTime();
      return utility.timeConversion(diff);
    },
    timeConversionSec(ms) {
      return utility.timeConversionSec(ms);
    },
    toRa(n) {
      return utility.toRa(n);
    },
    easyNumber(n) {
      return utility.easyNumber(n);
    }
  }
};
</script>
