document.addEventListener("DOMContentLoaded", function () { timeOut(document.getElementById("title"), 50); timeOut(document.getElementById("logo"), 350); timeOut(document.getElementById("subtitle"), 650) }); function timeOut(elm, time) { setTimeout(function () { elm.classList.add("visible") }, time) }