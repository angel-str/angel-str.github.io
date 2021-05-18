console.log("Connected");
var jsHide_var = [];
jsHide_var = document.getElementsByClassName("jsHide");
var jsShow_var = [];
jsShow_var = document.getElementsByClassName("jsShow");

console.log(jsHide_var);

jsHide_var[0].style.display = "none";

function onScroll(){
  var y = window.scrollY;
  document.getElementById("listSvg");
}

window.addEventListener("scroll", onScroll);
