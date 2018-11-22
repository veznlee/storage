/**
 * Created by Bruce on 2017/12/22.
 */
var module= {
    baseUrl: "http://58.42.235.214:8090/",//http://nyy.http520.cn/",//"http://localhost:8080/",
    getData: function (params, callback) {
        module.requestSeque.push({url: module.baseUrl + params, callback: callback})
    },
    requestSeque: [],
    getJSON: function () {
        this.ready = false;
        $.ajax({
            url: module.requestSeque[0].url,
            type: "GET",
            success: function (data) {
                //console.log("成功返回:" + JSON.stringify(data));
                if (data.retHead.errCode== "0") {
                    if (typeof(module.requestSeque[0].callback) == "function") {
                        module.requestSeque[0].callback(data);
                    }
                }
                else {
                    console.log("发生错误了：" + data.retHead.errMsg);
                }
                module.ready = true;
                module.requestSeque.splice(0, 1);
            },
            headers: {'Content-Type': 'application/json'},
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("返回结果错误：status:" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + " message:" + textStatus);
                module.ready = true;
            },
            dataType: "JSON"
        });
    },
    ready: true,
    nextRequest: function () {
        if (module.ready && module.requestSeque.length > 0) {
            module.getJSON();
        }
    }
};
setInterval(function () {
    module.nextRequest();
}, 100);