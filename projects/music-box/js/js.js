var audioObject = new Audio()

function getMusiclist(callback) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "https://jirenguapi.applinzi.com/fm/getSong.php?channel=2", true)
    xhr.send()
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            callback(JSON.parse(xhr.responseText))
            console.log("ok")
        } else {
            console.log("获取数据失败")
        }
        xhr.onerror = function () {
            console.log("网络异常")
        }
    }
}
getMusiclist(function (list) {
    // console.log(arguments[0].song[0])
    let str = list.song[0]
    console.log(str)
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
