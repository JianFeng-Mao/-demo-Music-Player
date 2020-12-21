(function (root) {
    function Index(len) {
        this.index = 0;
        this.len = len;
    }

    Index.prototype = { //按钮切歌  -1为上一首 +1为下一首

        prev() {
            return this.get(-1);
        },

        next() {
            return this.get(1);
        },

        get(val) {
            this.index = (this.index + val + this.len) % this.len;
            return this.index;
        }

    };

    root.indexControl = Index;
})(window.player || (window.player = {}));