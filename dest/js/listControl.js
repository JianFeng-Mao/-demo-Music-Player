(function (root) {
    function listControl(data, wrap) {
        const playList = document.createElement("div"),
              musicList = document.createElement("div"),
              dl = document.createElement("dl"),
              titleList = document.createElement("div"),
              close = document.createElement("div");

        let musicArr = []; //存放所有歌曲对应的dom


        playList.className = "play-list";

        musicList.className = "music-list";

        dl.className = "play-title";
        dl.innerText = "播放列表";

        titleList.className = "title-list";

        close.className = "close";
        close.innerText = "关闭";
        close.addEventListener("touchend", slideDown);

        musicList.appendChild(dl);
        musicList.appendChild(titleList);
        playList.appendChild(musicList);
        playList.appendChild(close);

        wrap.appendChild(playList);

        data.forEach((item, index) => {
            const dd = document.createElement("dd");
            dd.innerText = item.name;
            titleList.appendChild(dd);
            musicArr.push(dd);
            dd.addEventListener("touchend", function () {
                changeSelect(index);
                slideDown();
            });
        });
        let disY = playList.offsetHeight; //歌曲列表的高度

        playList.style.transform = "translateY(" + disY + "px)";

        function slideUp() {
            playList.style.transition = ".2s";
            playList.style.transform = "translateY(0)";
        }
        function slideDown() {
            playList.style.transition = ".2s";
            playList.style.transform = "translateY(" + disY + "px)";
        }

        function changeSelect(index) {
            //设置当前播放歌曲的状态
            musicArr.forEach(item => {
                item.className = '';
            });
            musicArr[index].className = "active";
        }

        return {
            musicArr: musicArr,
            slideUp: slideUp,
            slideDown: slideDown,
            changeSelect: changeSelect
        };
    }

    root.listControl = listControl;
})(window.player || (window.player = {}));