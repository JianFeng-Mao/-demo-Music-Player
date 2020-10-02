function MusicPlayer(dom) {
    this.wrap = dom; //播放器的容器  用于加载listControl模块
    this.dataList = [] //存放请求得到的数据
    this.player = window.player;
    this.rotateTimer = null;
    this.now = 1; //当前播放音乐的索引
}
MusicPlayer.prototype = {
    init: function () {
        this.getData('../mock/data.json');
        this.getDom();
    },
    getDom: function () {
        this.record = document.querySelector(".song-img img"); //图片旋转
        this.controlBtns = document.querySelectorAll(".song-control li");
    },
    getData: function (url) {
        var _this = this;
        ajax({
            url: url,
            type: "get",
            success: function (data) {
                
                _this.dataList = data;

                _this.loadMusic(_this.now);

                _this.musicControl();
            },
            error: function (data) {
                console.log("请求失败", data)
            }
        })
    },
    loadMusic: function (index) { //处理加载音乐  渲染图片、信息

        this.player.render(this.dataList[index]);

        this.player.music.load(this.dataList[index].audioSrc);

        if (this.player.music.state == "play") { //播放音乐

            this.player.music.play();
            
            this.controlBtns[2].className = "playing";
            this.imgRotate(0);
        }

    },
    musicControl: function () { //控制上一首，下一首，开始/暂停 按钮
        var _this = this;

        this.controlBtns[1].addEventListener("touchend", function () { //上一首

            _this.player.music.state = "play";

            _this.loadMusic(--_this.now);
        })

        this.controlBtns[2].addEventListener("touchend", function () { // 切换开始/暂停 按钮状态
            if (_this.player.music.state == "play") { //切换为暂停状态 默认

                _this.player.music.pause();

                this.className = "";
                _this.imgStop();
            } else { //切换为播放状态

                _this.player.music.play();

                this.className = "playing";
                var deg = _this.record.dataset.rotate || 0;
                _this.imgRotate(deg);
            }
        })

        this.controlBtns[3].addEventListener("touchend", function () { //下一首

            _this.player.music.state = "play";

            _this.loadMusic(++_this.now);
        })
    },

    imgRotate: function(deg) { //唱片旋转
        clearInterval(this.rotateTimer);

        var _this = this;
        console.log(deg)
        this.rotateTimer = setInterval(function () {
            deg = +deg + 0.2;
            _this.record.style.transform = "rotate(" + deg + "deg)";
            _this.record.dataset.rotate = deg; //设置行间特性 data-rotate  用于记录每次已经旋转了的角度
        }, 1000 / 60);
    },

    imgStop: function() { //唱片停止旋转
        clearInterval(this.rotateTimer);
    }

}


var musicPlayer = new MusicPlayer(document.getElementById("wrap"));
musicPlayer.init();