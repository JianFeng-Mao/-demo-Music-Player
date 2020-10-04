(function (root) {

    function Progress() {
        this.durTime = 0; // 总时间 单位ms
        this.frameId = null; // 定时器
        this.startTime = 0; //开始的时间
        this.lastPercent = 0; //暂停前一次播放的百分比
        this.init();
    }

    Progress.prototype = {
        init() {
            this.getDom();
        },

        getDom() {
            this.curTime = document.querySelector(".cur-time");
            this.circle = document.querySelector(".circle");
            this.frontPro = document.querySelector(".front-progress");
            this.totalTime = document.querySelector(".total-time");
        },

        renderTotalTime(time) {
            this.durTime = time;
            time = this.formatTime(time);
            this.totalTime.innerHTML = time;
        },

        formatTime(time) {
            //处理时间 将时间转化为 xx:xx 格式
            time = Math.round(time);

            var m = Math.floor(time / 60);
            var s = time % 60;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            return m + ':' + s;
        },

        move(per) {
            var _this = this;
            cancelAnimationFrame(this.frameId);
            this.lastPercent = per === undefined ? this.lastPercent : per;

            this.startTime = new Date().getTime(); //记录开始播放的时间
            function frame() {
                var curTime = new Date().getTime(); //

                var per = _this.lastPercent + (curTime - _this.startTime) / (_this.durTime * 1000);

                if (per <= 1) {
                    _this.update(per);
                } else {
                    cancelAnimationFrame(_this.frameId);
                }

                _this.frameId = requestAnimationFrame(frame);
            }
            frame();
        },

        update(per) {
            //更新已播放时间
            var time = this.formatTime(per * this.durTime);
            this.curTime.innerHTML = time;

            this.frontPro.style.width = per * 100 + '%';
            var l = per * this.circle.parentNode.offsetWidth;
            this.circle.style.transform = 'translateX(' + l + 'px)';
        },

        stop() {
            cancelAnimationFrame(this.frameId);

            var stopTime = new Date().getTime();
            this.lastPercent += (stopTime - this.startTime) / (this.durTime * 1000);
        }
    };

    function instanceProgress() {
        return new Progress();
    }

    function Drag(obj) {
        this.obj = obj; //要拖拽的元素
        this.startPointX = 0;
        this.startLeft = 0;
        this.percent = 0;
    }
    Drag.prototype = {
        init() {
            var _this = this;
            this.obj.style.transform = "translateX(0)";
            this.obj.addEventListener("touchstart", function (ev) {
                _this.startPointX = ev.changedTouches[0].pageX;
                _this.startLeft = parseFloat(this.style.transform.split('(')[1]);

                _this.start && _this.start();
            });

            this.obj.addEventListener("touchmove", function (ev) {
                _this.disPointX = ev.changedTouches[0].pageX - _this.startPointX;
                var l = _this.startLeft + _this.disPointX;

                if (l < 0) {
                    l = 0;
                } else if (l > this.offsetParent.offsetWidth) {
                    l = this.offsetParent.offsetWidth;
                }
                this.style.transform = 'translateX(' + l + 'px)';
                _this.percent = l / this.offsetParent.offsetWidth;

                _this.move && _this.move(_this.percent);

                ev.preventDefault();
            });

            this.obj.addEventListener('touchend', function () {
                _this.end && _this.end(_this.percent);
            });
        }

    };

    function instanceDrag(obj) {
        return new Drag(obj);
    }

    root.progress = {
        pro: instanceProgress,
        drag: instanceDrag
    };
})(window.player || (window.player = {}));