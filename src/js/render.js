//模块1： 渲染背景、音乐信息、是否喜欢
(function (root) {
    function renderImg(src){
        
        root.blurImg(src);
        var img = document.querySelector(".song-img img");
        img.src = src;
    }
    function renderInfo(data){
        var songInfoChildren = document.querySelector('.song-info').children;
		songInfoChildren[0].innerHTML = data.name;
		songInfoChildren[1].innerHTML = data.singer;
		songInfoChildren[2].innerHTML = data.album;
    }
    function renderIsLike(isLike){
        var lis = document.querySelectorAll(".song-control li");
        if(isLike){
            lis[0].className = 'liking';
        }
    }

    root.render = function (data) { //data为请求来的数据，必须
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }

})(window.player || (window.player = {}))