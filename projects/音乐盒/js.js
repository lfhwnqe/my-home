
var audioObject = new Audio()

function $(selector) {
    return document.querySelector(selector)
}
function $$(selector) {
    return document.querySelectorAll(selector)
}
// 封装ajax

function getMusicList(callback) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "https://jirenguapi.applinzi.com/fm/getSong.php", true)
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






getMusicList(function (list) {
    // var str = list.song[0].picture
    console.log(list.song[0].picture)
    audioObject.src = list.song[0].url
    $(".music-box .title").innerText = list.song[0].title
    $(".music-box .author").innerText = list.song[0].artist
    $(".music-picture #roll-img").setAttribute("src", list.song[0].picture)
})



var test = function () {
    audioObject.play()
}



$(".music-box .icon-play").addEventListener("click", function () {
    audioObject.play()
    $(".music-picture #roll-img").setAttribute("style", "animation-play-state: running;")
})

$(".music-box .icon-pause").addEventListener("click", function () {
    audioObject.pause()
    $(".music-picture #roll-img").setAttribute("style", "animation-play-state: paused;")
})

$(".music-box .icon-next").addEventListener("click", function () {
    getMusicList(function (list) {
        // var str = list.song[0].picture
        console.log(list.song[0].picture)
        audioObject.src = list.song[0].url
        $(".music-box .title").innerText = list.song[0].title
        $(".music-box .author").innerText = list.song[0].artist
        $(".music-picture #roll-img").setAttribute("src", list.song[0].picture)
        audioObject.play()
        $(".music-picture #roll-img").setAttribute("style", "animation-play-state: running;")
    })
})




// 时间显示进度条显示
var progress_now = $(".music-box .progress-now")
var progress_total = $(".music-box .progress-total")
setInterval(function () {
    $(".music-box .time").innerText =
        Math.floor(audioObject.currentTime / 60) + ":" + ((Math.floor(audioObject.currentTime % 60)) < 10 ? "0" + Math.floor(audioObject.currentTime % 60) : Math.floor(audioObject.currentTime % 60))
    $(".music-box .progress-now").style.width = (audioObject.currentTime / audioObject.duration) * 100 + "%"
}, 100)



$(".music-box .progress-total").addEventListener("click", function (e) {
    audioObject.currentTime = e.offsetX / 280 * audioObject.duration
})


