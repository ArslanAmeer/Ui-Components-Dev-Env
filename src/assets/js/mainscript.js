"use strict"

document.getElementById("add-btn").addEventListener("click",()=>{
    var li = document.createElement("li");
    li.innerText = document.getElementById("add-input").value;
    var ul = document.querySelector(".todo-list ul");
    ul.insertBefore(li,ul.firstChild);
});