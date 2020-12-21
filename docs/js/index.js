function MusicPlayer(dom) {
    this.wrap = dom; //播放器的容器  用于加载listControl模块
    this.dataList = []; //存放请求得到的数据
    this.player = window.player;
    this.rotateTimer = null;
    this.indexObj = null; //切歌
    this.list = null;
    this.curIndex = 0;
    this.progress = this.player.progress.pro();
}
MusicPlayer.prototype = {
    init() {
        this.getData('../mock/data.json');
        this.getDom();
    },
    getDom() {
        this.record = document.querySelector(".song-img img"); //图片旋转
        this.controlBtns = document.querySelectorAll(".song-control li");
        this.circle = document.querySelector(".circle");
    },
    getData(url) {
        var _this = this;
        ajax({
            url: url,
            type: "get",
            success(data) {

                _this.dataList = data;

                _this.indexObj = new _this.player.indexControl(data.length);

                _this.listPlay(_this.indexObj.index);

                _this.loadMusic(_this.indexObj.index);

                _this.musicControl();

                _this.dragProgress();
            },
            error(data) {
                console.log("请求失败", data);
            }
        });
    },
    loadMusic(index) {
        //处理加载音乐  渲染图片、信息

        this.player.render(this.dataList[index]);

        this.player.music.load(this.dataList[index].audioSrc);

        this.progress.renderTotalTime(this.dataList[index].duration);

        if (this.player.music.state == "play") {
            //播放音乐

            this.player.music.play();

            this.controlBtns[2].className = "playing";
            this.imgRotate(0);

            this.progress.move(0);
        }
        this.curIndex = index;
        this.list.changeSelect(index);
    },
    musicControl() {
        //控制上一首，下一首，开始/暂停 按钮、歌曲列表
        var _this = this;

        this.controlBtns[1].addEventListener("touchend", function () {
            //上一首

            _this.player.music.state = "play";

            _this.loadMusic(_this.indexObj.prev());
        });

        this.controlBtns[2].addEventListener("touchend", function () {
            // 切换开始/暂停 按钮状态
            if (_this.player.music.state == "play") {
                //切换为暂停状态 默认

                _this.player.music.pause();

                this.className = "";
                _this.imgStop();
                _this.progress.stop();
            } else {
                //切换为播放状态

                _this.player.music.play();

                this.className = "playing";
                var deg = _this.record.dataset.rotate || 0;
                _this.imgRotate(deg);
                _this.progress.move();
            }
        });

        this.controlBtns[3].addEventListener("touchend", function () {
            //下一首
            _this.player.music.state = "play";

            _this.loadMusic(_this.indexObj.next());
        });
    },

    imgRotate(deg) {
        //唱片旋转
        clearInterval(this.rotateTimer);
        var _this = this;

        this.rotateTimer = setInterval(() => {
            deg = +deg + 0.2;
            _this.record.style.transform = "rotate(" + deg + "deg)";
            _this.record.dataset.rotate = deg; //设置行间特性 data-rotate  用于记录每次已经旋转了的角度
        }, 1000 / 60);
    },

    imgStop() {
        //唱片停止旋转
        clearInterval(this.rotateTimer);
    },

    listPlay() {
        var _this = this;
        this.list = this.player.listControl(this.dataList, this.wrap);
        this.controlBtns[4].addEventListener("touchend", function () {
            _this.list.slideUp();
        });

        this.list.musicArr.forEach((item, index) => {
            item.addEventListener("touchend", function () {
                if (index === _this.curIndex) return;
                _this.player.music.state = 'play';
                _this.indexObj.index = index;
                _this.loadMusic(index);
            });
        });
    },
    dragProgress() {
        var _this = this;
        var circle = this.player.progress.drag(this.circle);
        circle.init();

        circle.move = function (per) {
            _this.progress.update(per);
        };
        circle.end = function (per) {
            var cutTime = per * _this.dataList[_this.indexObj.index].duration;

            _this.player.music.playTo(cutTime);
            _this.player.music.play();

            _this.progress.move(per);

            var deg = _this.record.dataset.rotate || 0;
            _this.imgRotate(deg); //旋转图片

            _this.controlBtns[2].className = 'playing'; //按钮状态变成播放状态
        };
    }

};

var musicPlayer = new MusicPlayer(document.getElementById("wrap"));
musicPlayer.init();