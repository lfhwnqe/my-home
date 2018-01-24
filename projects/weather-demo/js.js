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
    // console.log(list.weather[0].future)
    var str = list.weather[0]
    $("header .city").text(list.weather[0].city_name)
    $("main .today .temperature").text(str.future[0].low + "°C" +"~"+str.future[0].high + "°C"
    )
    $("main .today .date").text(str.future[0].date + " " + str.future[0].day)
    var codeImg = `//weixin.jirengu.com/images/weather/code/${str.now.code}.png`
    $("#weather").html("<img src=" + codeImg + ">")



    console.log(list.weather[0])
    var str2 = list.weather[0].future
    for(var i=0; i<str2.length; i++){
        var str3 = $($(".future")[i])
        // console.log(str3)
        var codeImg2 = `//weixin.jirengu.com/images/weather/code/${str2[i].code1}.png`
        // console.log(codeImg2)
        // str3.html("<img src="+ `//weixin.jirengu.com/images/weather/code/${str2[i].code1}.png`+" "+"class='week-icon'>")
        str3.text(str2[i].day+"         "+str2[i].low+"°C           "+"-"+str2[i].high+"°C              "+str2[i].text)
        
    }

})


$("#btn-week").on("click", function (e) {
    console.log(e)
    $(".week").toggle("active")
    $(".today").toggle("active")
})
$("#btn-today").on("click", function (e) {
    console.log(e)
    $(".week").toggle("active")
    $(".today").toggle("active")
})


// var data2 = getWeather(function (list) {
//     console.log(list.weather[0].future)
//     var str2 = list.weather[0].future
//     for(var i=0; i<str2.length; i++){
//         var s = $("(day+'i')")
//         console.log( var str2 = list.weather[0].future
//             for(var i=0; i<str2.length; i++){
//                 var s = $("(day+'i')")
//                 console.log(s))
//     }
// })