(function (root) {
    function AudioManage() {
        this.audio = new Audio();
        this.state = "pause"; //默认为暂停状态
    }
    AudioManage.prototype = {

        load: function (src) { //加载音乐
            this.audio.src = src; //设置音乐路径
            this.audio.load();
        },

        play: function () { //播放音乐
            this.audio.play();
            this.state = "play";
        },

        pause: function () { //暂停音乐
            this.audio.pause();
            this.state = "pause";
        },

        end: function (fn) { //音乐播放结束事件
            this.audio.ended = fn;
        },

        playTo: function (time) {
            // console.log(time)
            this.audio.currentTime = time; //单位是秒，不是毫秒
        }
    }

    root.music = new AudioManage();
})(window.player || (window.player = {}))