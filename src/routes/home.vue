<style>
.vue-home .container {
  background-color: #f8f9fa;
}

.vue-home .mt16 {
  margin-top: 16px;
}

.vue-home .mt10 {
  margin-top: 10px;
}
.vue-home .stat {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: 2px solid #f7f7f7;
  min-height: 148px;
  margin: 0 20px;
  text-align: center;
}

.vue-home .stat .wraper {
  align-items: center;
  min-width: 120px;
  justify-content: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 24px;
  margin: 12px;
  padding: 0;
  color: #666666;
  height: 120px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 320px) {
  .vue-home .stat .wraper {
    font-size: 14px;
  }
}
@media screen and (max-width: 480px) and (min-width: 321px) {
  .vue-home .stat .wraper {
    font-size: 16px;
  }
}
@media screen and (max-width: 720px) and (min-width: 481px) {
  .vue-home .stat .wraper {
    font-size: 18px;
  }
}
@media screen and (max-width: 800px) and (min-width: 721px) {
  .vue-home .stat .wraper {
    font-size: 26px;
  }
}
.vue-home .stat .wraper .text {
  font-size: 32px;
  color: #096dd9;
  font-weight: bold;
}

.vue-home .list {
  height: 725px;
  overflow: auto;
}

.vue-home .banner_left .list_tab {
  width: 100%;
  height: 60px;
  border-bottom: 3px solid #f7f7f7;
  background-color: #096dd9;
  position: relative;
  color: #fff;
}

.vue-home .banner_left .list_tab .img {
  position: absolute;
  top: 33%;
  left: 2%;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.vue-home .banner_left .list_tab .btn {
  position: absolute;
  right: 2%;
  top: 20%;
  color: #333333;
  font-size: 14px;
}

.vue-home .li {
  align-items: center;
  background-color: #fff;
  border-bottom: 4px solid #f7f7f7;
  display: flex;
  height: 120px;
}

.vue-home li .trans {
  color: #a1b0ed !important;
}
.vue-home li .monospace {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a1b0ed;
}

.vue-home .blocks li .monospace {
  width: 350px;
}

.vue-home .txs li .monospace {
  width: 400px;
}

.vue-home .blocks li > .img {
  background-color: #5f78db;
  flex-shrink: 0;
  margin-right: 20px;
  height: 90px;
  width: 160px;
}

.vue-home .blocks li > .img > * {
  color: white;
  display: block;
  text-align: center;
  font-weight: bold;
}

.vue-home .tab-right {
  height: 60px;
  border-bottom: 3px solid #f7f7f7;
  background-color: #096dd9;
  position: relative;
}

.vue-home .tab-right .img {
  position: absolute;
  top: 33%;
  left: 2%;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.vue-home .tab-right .btn {
  position: absolute;
  right: 2%;
  top: 20%;
  font-size: 14px;
  color: #fff;
}

.vue-home .txs li {
  border-left: 2px solid;
}

.vue-home .txs li > img {
  flex-shrink: 0;
  margin: 0 20px;
}

.vue-home .txs li tr > td:first-child {
  height: 28px;
  width: 40px;
}

.vue-home .txs li:nth-of-type(4n + 1) {
  border-left-color: #3cba54;
}

.vue-home .txs li:nth-of-type(4n + 2) {
  border-left-color: #f4c20d;
}

.vue-home .txs li:nth-of-type(4n + 3) {
  border-left-color: #db3236;
}

.vue-home .txs li:nth-of-type(4n + 4) {
  border-left-color: #4885ed;
}

/*
        chart
        */

.vue-home #chart {
  height: 300px;
  max-width: 800px;
}

.vue-home .chart_banner .name,
.value {
  color: black;
  border-bottom: 1px inset;
  margin-left: 12px;
  margin-right: 12px;
}

.vue-home .chart_banner .name {
  font-size: 30px;
}

.vue-home .chart_banner .value {
  font-size: 60px;
}

.vue-home .chart_banner .msg {
  font-size: 16px;
  margin-top: 24px;
}

.vue-home .chart_banner .msg div {
  margin-top: 10px;
}

.vue-home .chart_banner .msg .msg_change_right {
  float: right;
  margin-right: 10px;
  color: black;
}

.vue-home .chart_banner .msg .red {
  color: red;
}

.vue-home .chart_banner .msg .green {
  color: green;
}

.vue-home .chart_banner .msg .msg_change_left {
  margin-left: 10px;
  color: black;
}

.vue-home text.highcharts-credits {
  display: none;
}

.vue-home .updataTime {
  float: right;
}
</style>
<template>
  <div class="container vue-home">
    <div class="stat">
      <div class="wraper">
        Block Height
        <router-link
          v-if="this.stat"
          class="text"
          v-bind:to="fragApi + '/block/'+ this.stat.topBlockHeight"
        >{{ this.stat.topBlockHeight }}</router-link>
        <router-link v-else class="text" v-bind:to="fragApi + 'blocks'">0</router-link>
      </div>
      <div class="wraper">
        Total Transactions
        <router-link
          v-if="this.stat"
          class="text"
          v-bind:to="fragApi + '/txs'"
        >{{ this.stat.totalTransCount }}</router-link>
        <router-link v-else class="text" v-bind:to="fragApi + 'txs'">0</router-link>
      </div>
      <div class="wraper">
        Blocks Today
        <router-link
          v-if="this.stat"
          class="text"
          v-bind:to="fragApi + '/blocks?today=1'"
        >{{ this.stat.blocksCountToday }}</router-link>
        <router-link v-else class="text" v-bind:to="fragApi + 'blocks'">0</router-link>
      </div>
      <div class="wraper">
        Transactions Today
        <router-link
          v-if="this.stat"
          class="text"
          v-bind:to="fragApi + '/txs?today=1'"
        >{{ this.stat.transCountToday }}</router-link>
        <router-link v-else class="text" v-bind:to="fragApi + 'txs'">0</router-link>
      </div>
    </div>
    <div class="mt20">
      <div class="row">
        <div class="banner_left col-md-6">
          <div class="list_tab">
            <div class="img">
              <span class="fa fa-th-large" aria-hidden="true"></span>
              Blocks
            </div>
            <router-link
              class="btn btn-default pull-right"
              v-bind:to="fragApi + '/blocks'"
              role="button"
              style="color:#fff"
            >View All</router-link>
          </div>
          <ul class="blocks list">
            <li class="li" v-for="(o, i) in blocks" :key="i">
              <div class="img">
                <router-link
                  class="mt20"
                  v-bind:to="fragApi + '/block/' + o.height"
                  style="font-size:18px"
                >Block {{ o.height }}</router-link>
                <div class="mt10">{{ timeConversion(o.curTime)}} ago</div>
              </div>
              <div class="right">
                Minted By
                <router-link
                  class="monospace"
                  v-bind:to="fragApi + '/address/' + o.proposer"
                >{{ o.proposer }}</router-link>
                <div class="mt16">
                  <router-link v-bind:to="fragApi + '/txs?block=' + o.height" class="trans">
                    <b>{{o.transCount}}</b> transactions
                  </router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <div class="tab-right">
            <div class="img">
              <span class="fa fa-list" aria-hidden="true"></span>
              Transactions
            </div>
            <router-link
              class="btn btn-default pull-right"
              v-bind:to="fragApi + '/txs'"
              role="button"
            >View All</router-link>
          </div>
          <ul class="list txs">
            <li class="li" v-for="(o, i) in txs" :key="i">
              <img src=/static/img/icon.png height=43 width=43 alt="">
              <div>
                <table>
                  <tr>
                    <td>TX#</td>
                    <td>
                      <router-link
                        class="monospace"
                        v-bind:to="fragApi + '/tx/'+ o.hash"
                      >{{ o.hash }}</router-link>
                    </td>
                  </tr>
                  <tr v-if="o.source">
                    <td>From</td>
                    <td>
                      <router-link
                        class="monospace"
                        v-bind:to="fragApi + '/address/' + o.source"
                      >{{ o.source }}</router-link>
                    </td>
                  </tr>
                  <tr v-if="o.target">
                    <td>To</td>
                    <td>
                      <router-link
                        class="monospace"
                        v-bind:to="fragApi + '/address/' + o.target"
                      >{{ o.target }}</router-link>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">> {{timeConversion(o.curTime)}} ago</td>
                  </tr>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var api = require("@/assets/api"),
  utility = require("@/assets/utility");

module.exports = {
  data() {
    return {
      intervalId: 0,
      blocks: [],
      chartConfig: {
        legend: {
          align: "right",
          layout: "vertical",
          verticalAlign: "middle"
        },
        series: [
          {
            data: null,
            name: "transactions"
            // , type: "area"
          }
        ],
        subtitle: {
          text: "Data Source: TAS"
        },
        title: {
          text: "transactions"
        },
        xAxis: {
          labels: {
            format: "{value:%m-%d}",
            rotation: -30
          },
          type: "datetime"
        },
        yAxis: {
          title: {
            text: "Amount"
          }
        }
      },
      fragApi: this.$route.params.api ? "/" + this.$route.params.api : "",
      stat: null,
      txs: []
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
    updateData() {
      if (this.$route.path != "/") {
        return false;
      }
      api.getChainLatestBlocks(o => (this.blocks = o));
      api.getChainLatestTransactions(o => (this.txs = o));
      api.getChainStat(o => (this.stat = o));
    }
  },

  mounted() {
    var _this = this;
    this.intervalId = setInterval(() => {
      this.updateData();
    }, 30000);
    this.updateData();
  }
};
</script>
