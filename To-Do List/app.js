LikeBtn.onclick = function(){
    LikeBtn.classList.toggle("fa-solid");
    document.body.classList.toggle("fa-regular");

    if (localStorage.getItem('like') == "notliked"){
        localStorage.setItem('like', "liked");
    }
    else{
        localStorage.setItem("like", "notliked");
    }
}
if (localStorage.getItem("like") == "notliked"){
    LikeBtn.classList.remove("fa-solid");
    document.body.classList.remove("fa-solid");
    document.body.classList.add("fa-regular");
}
else if (localStorage.getItem("like")== "liked"){
    LikeBtn.classList.remove("fa-regular");
    document.body.classList.remove("fa-regular");
    document.body.classList.add("fa-solid");
}
else{
    localStorage.setItem("like", "fa-regular")
}