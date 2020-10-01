document.getElementsByTagName("div")[0].onclick = function (e) {
    e.target.style.backgroundColor = "red";
    console.log("div被点击了");
}