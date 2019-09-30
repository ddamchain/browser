<style>
.vue-block .table tbody tr td {
  border: 0;
  vertical-align: middle;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background-color: #096dd9;
  color: #fff;
}
.vue-block td .pagination {
  margin: 0;
  vertical-align: top;
}

.vue-block tr > td:first-child::after {
  content: ":";
}

.vue-block .dynasty {
  height: 78px;
  overflow: hidden;
}

.vue-block .dynasty a {
  display: block;
}

.vue-block .dynasty button {
  background-color: darkgray;
  border-color: none;
}

.vue-block .card {
  border: 0;
}
</style>
<template>
  <!-- https://etherscan.io/block/4951841 -->
  <div class="container vue-block" v-bind:triggerComputed="urlChange">
    <vue-tab-buttons class="mt20" v-bind:arr="tabButtons" v-bind:tab.sync="tab"></vue-tab-buttons>
    <div class="mt20"></div>
    <div class="tab" v-show="tab == 1">
      <h4>Block Information</h4>
      <table class="table" v-if="block">
        <tr>
          <td>height</td>
          <td>
            <nav aria-label="Page navigation" class="navgation-tab">
              <ul class="pagination">
                <li>
                  <router-link
                    v-bind:to="fragApi + "/block/" + (+$route.params.height - 1)"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&lt; Prev</span>
                  </router-link>
                </li>
                <li>&nbsp; {{ block.height }} &nbsp;</li>
                <li>
                  <router-link
                    v-bind:to="fragApi + "/block/" + (+$route.params.height + 1)"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">Next &gt;</span>
                  </router-link>
                </li>
              </ul>
            </nav>
          </td>
        </tr>
        <tr>
          <td>TimeStamp</td>
          <td>{{ timeConversion(block.curTime ) }} ago ({{ block.curTime }})</td>
        </tr>
        <tr>
          <td>Transactions</td>
          <td>
            <router-link v-bind:to="fragApi + "/txs?block=" + block.height">{{ block.transCount }}</router-link>tx in this block
          </td>
        </tr>
        <tr>
          <td>Hash</td>
          <td class="monospace">{{ block.hash }}</td>
        </tr>
        <tr>
          <td>preHash</td>
          <td class="monospace">{{ block.preHash }}</td>
        </tr>
        <tr>
          <td>Minted</td>
          <td class="monospace">{{ block.proposer }}</td>
        </tr>
        <tr>
          <td>Nonce</td>
          <td class="monospace">{{ block.nonce }}</td>
        </tr>
        <tr>
          <td>TxTree</td>
          <td class="monospace">{{ block.txTree }}</td>
        </tr>
        <tr>
          <td>ReceiptTree</td>
          <td class="monospace">{{ block.receiptTree }}</td>
        </tr>
        <tr>
          <td>StateTree</td>
          <td class="monospace">{{ block.stateTree }}</td>
        </tr>
        <tr>
          <td>BaseTarget</td>
          <td class="monospace">{{ block.baseTarget }}</td>
        </tr>
        <tr>
          <td>CumulativeDifficulty</td>
          <td class="monospace">{{ block.cumulativeDifficulty }}</td>
        </tr>
        <tr>
          <td>Difficulty</td>
          <td class="monospace">{{ block.difficulty }}</td>
        </tr>
        <tr>
          <td>Capacity</td>
          <td class="monospace">{{ block.capacity }}</td>
        </tr>
        <tr>
          <td>Auth</td>
          <td class="monospace">{{ block.auth }}</td>
        </tr>
        <!--<tr>-->
        <!--<td>PreTotalQn</td>-->
        <!--<td class=monospace>-->
        <!--{{ block.preTotalQn }}-->
        <!--</td>-->
        <!--</tr>-->
      </table>
    </div>
  </div>
</template>
<script>
var api = require("@/assets/api"),
  utility = require("@/assets/utility");

module.exports = {
  components: {
    "vue-tab-buttons": require("@/components/vue-tab-buttons").default
  },
  computed: {
    urlChange() {
      api.getChainBlock(
        { height: this.$route.params.height },
        o => {
          this.block = o;
        },
        xhr => {
          this.$router.replace(
            (this.$route.params.api ? "/" + this.$route.params.api : "") +
              "/404!" +
              this.$route.fullPath
          );
        }
      );
    }
  },
  methods: {
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
    toTb(n) {
      return utility.toTb(n);
    }
  },
  data() {
    return {
      block: { bonus_info: { verifier_bonus: {} } },
      fragApi: this.$route.params.api ? "/" + this.$route.params.api : "",
      tab: 0,
      tabButtons: ["Overview"]
    };
  }
};
</script>
