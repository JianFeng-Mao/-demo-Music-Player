function toData(obj) {
    if (obj == null) {
        return obj;
    }
    var arr = [];

    for (var i in obj) {
        var str = obj + '=' + obj[i];
        arr.push(str);
    }
    return arr.join("&");
}
function ajax(obj) {
    obj.data = obj.data || null;
    obj.type = obj.methods || "GET";
    obj.async = obj.async || true;
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft XMLHttp");
    }
    if(obj.type == "POST"){
        xhr.open(obj.type, obj.url, obj.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var data = toData(obj.data)
        xhr.send(data);
    }else if(obj.type == "GET"){
        var url = obj.url + '?' + toData(obj.data);
        xhr.open(obj.type, obj.url, obj.async);
        xhr.send();
    }
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                if(obj.success){
                    obj.success(JSON.parse(xhr.responseText));
                }
            }else{
                if(obj.error){
                    obj.error(xhr.status);
                }
            }
        }
    }
}