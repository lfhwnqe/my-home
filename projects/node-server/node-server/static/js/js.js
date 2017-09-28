
var audioObject = new Audio()

function $(selector){
    return document.querySelector(selector)
}
function $$(selector){
    return document.querySelectorAll(selector)
}
// 封装ajax
function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open("GET","//jirenguapi.applinzi.com/fm/getSong.php",true)
    xhr.onload = function(){
        if((xhr.status>=200 && xhr.status <300) || xhr.status ===304){
            callback(JSON.parse(xhr.responseText))
        }else {
            console.log("获取数据失败")
        }
    }
    xhr.onerror = function(){
        console.log("网络异常")
    }
    xhr.send()
}





var musicPlay = getMusicList(function(list){
    audioObject.src = list.song[0].url
    $(".music-box .title").innerText = list.song[0].title
    $(".music-box .author").innerText = list.song[0].artist
    var src = list.song[0].picture
    $(".music-box .music-picture").innerHTML = '<img src="' +src+'">'
})



// 光盘旋转效果，未完成
$(".music-box .icon-play").addEventListener("click",function(){
    musicPlay
    audioObject.play()
    $(".music-picture img").classList.add("transform")
})
$(".music-box .icon-pause").addEventListener("click",function(){
    audioObject.pause()
    $(".music-picture img").classList.remove("transform")
})
$(".music-box .icon-next").addEventListener("click",function(){
    getMusicList(function(list){
        audioObject.src = list.song[0].url
        $(".music-box .title").innerText = list.song[0].title
        $(".music-box .author").innerText = list.song[0].artist
        var src = list.song[0].picture
        $(".music-box .music-picture").innerHTML = '<img src="' +src+'">'
        audioObject.play()
})})
// audioObject.onplay = function(){
//     $(".music-picture img").classList.add("transform")
// }

// 时间显示进度条显示
var progress_now = $(".music-box .progress-now")
var progress_total = $(".music-box .progress-total")
setInterval(function(){
$(".music-box .time").innerText = 
Math.floor(audioObject.currentTime/60)+":"+((Math.floor(audioObject.currentTime%60))<10?"0" + Math.floor(audioObject.currentTime%60):Math.floor(audioObject.currentTime%60))
$(".music-box .progress-now").style.width = (audioObject.currentTime/audioObject.duration)*100+"%"
},100)

getMusicList(function(list){
    console.log(list)
})

$(".music-box .progress-total").addEventListener("click",function(e){
    audioObject.currentTime = e.offsetX/280*audioObject.duration
})



