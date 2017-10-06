let audioObject = new Audio()
var channelId
var url1 = "https://jirenguapi.applinzi.com/fm/getSong.php?channel="
var url = url1 + channelId
// function getChannels() {
//     let xhr = new XMLHttpRequest()
//     xhr.open("GET", "http://api.jirengu.com/fm/getChannels.php")
//     xhr.send()
//     // let str = JSON.parse(xhr.responseText)
//     xhr.onload = function () {
//         console.log(JSON.parse(xhr.responseText))
//     }

// }
// getChannels()

$(".music-type .img").on("click", function () {
    let alt = $(this).attr("alt")
    console.log(alt)
    $(".type-title .type").text(alt)
    let Id = $(this).attr("title")
    console.log(Id)
    var url = "https://jirenguapi.applinzi.com/fm/getSong.php?channel=" + channelId
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.send()
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            let list = JSON.parse(xhr.responseText)
            // console.log(str)
            let str = list.song[0]
            // console.log(str)
            $(".info .music-title").text(str.title)
            $(".info .music-author").text(str.artist)
            $(".main-img img").attr("src", str.picture)
            audioObject.src = str.url
            console.log("ok")
        } else {
            console.log("获取数据失败")
        }
        xhr.onerror = function () {
            console.log("网络异常")
        }
        $(".icon-play").addClass("icon-pause")
        $(".icon-play").removeClass("icon-play")
        audioObject.play()

    }
})



function getMusiclist(callback) {
    // let url = "https://jirenguapi.applinzi.com/fm/getSong.php?channel="
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    // console.log(url+"123124")
    xhr.send()
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            callback(JSON.parse(xhr.responseText))
            // console.log("ok")
        } else {
            console.log("获取数据失败")
        }
        xhr.onerror = function () {
            console.log("网络异常")
        }
    }
}
getMusiclist(function (list) {
    console.log(list)
    let str = list.song[0]
    // console.log(str)
    $(".info .music-title").text(str.title)
    $(".info .music-author").text(str.artist)
    $(".main-img img").attr("src", str.picture)
    audioObject.src = str.url
})

let next = function () {
    getMusiclist(function (list) {
        // console.log(arguments[0].song[0])
        let str = list.song[0]
        // console.log(str)
        $(".info .music-title").text(str.title)
        $(".info .music-author").text(str.artist)
        $(".main-img img").attr("src", str.picture)
        audioObject.src = str.url
        audioObject.autoplay = true
    })
}

//绑定按钮
$(".icon-pause, .icon-play").on("click", function () {
    if ($(this).hasClass("icon-play")) {
        $(this).toggleClass("icon-pause")
        $(this).toggleClass("icon-play")
        audioObject.play()
    } else {
        audioObject.pause()
        $(this).toggleClass("icon-pause")
        $(this).toggleClass("icon-play")
    }
})
$(".icon-next").on("click", function () {
    next()
    $(".icon-play").addClass("icon-pause")
    $(".icon-play").removeClass("icon-play")
})
$(".icon-love").on("click", function () {
    $(this).toggleClass("icon-red")
})
// 监听歌曲结束事件
$(audioObject).on("ended", function () {
    next()
})
setInterval(function () {
    $(".bar .now").attr("style", 'width:' + (audioObject.currentTime / audioObject.duration) * 100 + "%")
    // console.log((audioObject.currentTime/audioObject.duration)*100+"%")
    $(".progress .music-time").text(Math.floor(audioObject.currentTime / 60) + ":" + ((Math.floor(audioObject.currentTime % 60)) < 10 ? "0" + Math.floor(audioObject.currentTime % 60) : Math.floor(audioObject.currentTime % 60)))

}, 1000)

$(".bar .total").on("click", function (e) {
    // console.log($(e))
    let str = $(e)[0].offsetX
    // console.log(str)
    let width = $(".bar .total").innerWidth()
    $(".bar .now").attr("style", 'width:' + (str / width) * 100 + "%")
    audioObject.currentTime = str / width * audioObject.duration
})
$(".bar .now").on("click", function (e) {
    // console.log($(e))
    let str = $(e)[0].offsetX
    // console.log(str)
    let width = $(".bar .total").innerWidth()
    $(".bar .now").attr("style", 'width:' + (str / width) * 100 + "%")
    audioObject.currentTime = str / width * audioObject.duration
})

//音乐分类导航栏