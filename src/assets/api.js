var {ajax, ajaxSplitAction, getNebulasNetHost} = require("@/assets/utility");

module.exports = {

    getChainAddress(t, done, fail) {
        // wtf - webpack 对 if (typeof t == "object") 报异常
        if (eval('typeof t == "object"'))
            ajax1("post address/detail", t, d, fail);
        else
            ajax1("post address/detail/" + t, null, d, fail);
        function d(s, xhr) {
            var o = JSON.parse(s);
            if (o.code == 200)
                done(o.data);
            else if (typeof fail == "function")
                fail(xhr);
        }
    },

    getChainStat(done, fail) {
        ajax1("post stat",null,d, fail);
        // console.log("stat" + done)

        function d(s, xhr) {
            var o = JSON.parse(s);
            if (o.code == 200)
                done(o.data);
            else if (typeof fail == "function")
                fail(xhr);
        }
    },

    // - p      - 页码, 默认 1
    // - m      - miner hash
    getChainBlocks(t, done, fail) {
        ajax1("post block/list", t, d, fail);
        function d(s, xhr) {
            var o = JSON.parse(s);
            if (o.code == 200)
                done(o.data);
            else if (typeof fail == "function")
                fail(xhr);
        }
    },

    getChainLatestBlocks(done, fail) {
        // console.log("block" + done)
        ajax1("post block/latest", null, d, fail);

        function d(s, xhr) {
            var o = JSON.parse(s);

            if (o.code == 200) {
                done(o.data);
            }
            else if (typeof fail == "function")
                fail(xhr);
        }
    },
    getChainBlock(t, done, fail) {
        ajax1("post block/detail", t, d, fail);
        function d(s, xhr) {
            var o = JSON.parse(s);
            if (o.code == 200)
                done(o.data);
            else if (typeof fail == "function")
                fail(xhr);
        }
    },
    getChainLatestTransactions(done, fail) {
        // console.log("latest" + done)
        ajax1("post transaction/latest", null, d, fail);

        function d(s, xhr) {
            var o = JSON.parse(s);

            if (o.code == 200) {
                done(o.data);
            }
            else if (typeof fail == "function")
                fail(xhr);
        }
    },

    // - p      - 页码, 默认 1
    // - m      - miner hash
    getChainTransactions(t, done, fail) {
        ajax1("post transaction/list", t, d, fail);

        function d(s, xhr) {
            var o = JSON.parse(s);

            if (o.code == 200)
                done(o.data);
            else if (typeof fail == "function")
                fail(xhr);
        }
    },

    getChainTransaction(t, done, fail) {
        ajax1("post transaction/detail", t, d, fail);
        function d(s, xhr) {
            var o = JSON.parse(s);
            if (o.code == 200)
                done(o.data);
            else if (typeof fail == "function")
                fail(xhr);
        }
    },
    getChainSearch(query, done, fail) {
        ajax1("post block/search", { query }, function (s, xhr) {
            var o = JSON.parse(s);
            if (o.code == 200)
                done(o.data);
            else if (typeof fail == "function")
                fail(xhr);
        }, fail);
    },

};

function ajax1(action, args, done, fail) {
    var a = ajaxSplitAction(action);
    return ajax(a[0] + " " + sessionStorage.apiPrefix + a[1], args, done, fail);
}
