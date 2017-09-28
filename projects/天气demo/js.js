function getWeather(callback) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "https://weixin.jirengu.com/weather", true)
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            callback(JSON.parse(xhr.responseText))
        } else {
            console.log("获取数据失败")
        }
    }
    xhr.onerror = function () {
        console.log("网络异常")
    }
    xhr.send()
}


var data = getWeather(function (list) {
    console.log(list.weather[0])
    var str = list.weather[0]
    $("header .city").text(list.weather[0].city_name)
    $("main .today .temperature").text(str.now.temperature+ "°C"
    )
    $("main .today .date").text(str.future[0].date + " " + str.future[0].day)
    var codeImg = `//weixin.jirengu.com/images/weather/code/${str.now.code}.png` 
    $("#weather").html("<img src="+codeImg+">") 

})