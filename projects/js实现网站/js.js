function $(selector){
    return document.querySelector(selector)
}

function $$(selector){
    return document.querySelectorAll(selector)
}

$(".flip-modal").onclick = function(e){
    if(e.target.classList.contains("login")){
        $(".flip-modal").classList.remove("register")
        $(".flip-modal").classList.add("login")
    }
    if(e.target.classList.contains("register")){
        $(".flip-modal").classList.remove("login")
        $(".flip-modal").classList.add("register")
    }
    window.target = e.target
}

console.log("hello")