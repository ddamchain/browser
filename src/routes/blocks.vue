<template>
  <!-- https://etherscan.io/blocks -->
  <div class="vue-blocks">
    <vue-bread v-bind:arr="breadcrumb" title="Blocks"></vue-bread>

    <div class="container mt20">
      <div class="align-items-center info-and-pagination row">
        <div
          class="col"
        >Showing Block (#{{ heightFrom }} to #{{ heightTo }}) out of {{ totalBlocks }} total blocks</div>
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
          <th>Height</th>
          <th class="text-right">Age</th>
          <th>Nonce</th>
          <th>Trans Count</th>
          <th>Minted</th>
        </tr>
        <tr v-for="(o, i) in arr" :key="i">
          <td>
            <router-link v-bind:to="fragApi + '/block/' + o.height">{{ o.height+1 }}</router-link>
          </td>
          <td class="time">
            <div class="text-right">{{ timeConversion( o.curTime) }} ago</div>
          </td>
          <td>
            <div class="text-left">{{ o.nonce }}</div>
            <!--<router-link v-bind:to="fragApi + '/block／' + o.height">{{o.nonce }}</router-link>-->
          </td>
          <td class="text-left">
            <router-link v-bind:to="fragApi + '/txs?block=' + o.height" class="trans">
              <b>{{o.transCount}}</b> transactions
            </router-link>
            <!--<router-link v-bind:to="fragApi + '/txs/block=' + o.height">{{ o.transCount }}</router-link>-->
          </td>
          <td class="monospace">
            <router-link v-bind:to="fragApi + '/address/' + o.proposer">{{ o.proposer }}</router-link>
          </td>
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
  utility = require("@/assets/utility");

module.exports = {
  components: {
    "vue-bread": require("@/components/vue-bread").default,
    "vue-pagination": require("@/components/vue-pagination").default
  },
  data() {
    return {
      arr: [],
      breadcrumb: [{ text: "Home", to: "/" }, { text: "Blocks", to: "" }],
      currentPage: 0,
      pageSize: 20,
      fragApi: this.$route.params.api ? "/" + this.$route.params.api : "",
      heightFrom: 0,
      heightTo: 0,
      totalBlocks: 0,
      totalPage: 0
    };
  },
  methods: {
    nthPage() {
      var pageNum = this.$route.query.pageNum || 1;
      var today = this.$route.query.today || null;

      if (pageNum == this.currentPage)
        console.log(
          "nthPage - 请求的第",
          pageNum,
          "页正是当前页, 忽略此次调用"
        );
      else {
        this.$root.showModalLoading = true;

        api.getChainBlocks(
          this.genQuery(pageNum),
          o => {
            this.$root.showModalLoading = false;
            this.arr = o.content;
            this.currentPage = o.pageNum;
            this.totalPage = o.totalPages;
            this.totalBlocks = o.totalSize;

            if (this.arr.length) {
              this.heightFrom = this.arr[0].height + 1;
              this.heightTo = this.arr[this.arr.length - 1].height + 1;
            } else {
              this.heightFrom = 0;
              this.heightTo = 0;
            }
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
      }
    },
    genQuery(page) {
      var query = { pageNum: page, pageSize: this.pageSize };
      if (this.$route.query.proposer) {
        query.proposer = this.$route.query.proposer;
      }
      if (this.$route.query.today) {
        query.today = "1";
      }
      return query;
    },
    numberAddComma(n) {
      return utility.numberAddComma(n);
    },
    onFirst() {
      this.$router.push({
        path: this.$route.path,
        query: this.genQuery(1)
      });
    },
    onLast() {
      this.$router.push({
        path: this.$route.path,
        query: this.genQuery(this.totalPage)
      });
    },
    onNext() {
      this.$router.push({
        path: this.$route.path,
        query: this.genQuery(this.currentPage + 1)
      });
    },
    onPrev() {
      this.$router.push({
        path: this.$route.path,
        query: this.genQuery(this.currentPage - 1)
      });
    },
    onTo(n) {
      this.$router.push({
        path: this.$route.path,
        query: this.genQuery(n)
      });
    },
    timeConversion(d) {
      date = new Date(d);
      diff = Date.now() - date.getTime();
      return utility.timeConversion(diff);
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

<style>
.vue-blocks table th {
  background-color: #096dd9;
  color: #fff;
}
</style>
