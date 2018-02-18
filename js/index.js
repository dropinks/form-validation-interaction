var body, lsLine, lsCircle, svg, inputElm;
function focusElement(inputElm){
  var field = inputElm.closest(".form-field");
  var lsLine = field.getElementsByClassName("ls-line")[0];
  var lsCircle = field.getElementsByClassName("ls-circle")[0];
  var svg = field.getElementsByTagName("svg")[0];

  if(svg.classList.contains("initial") || svg.classList.contains("validate") || svg.classList.contains("error") || svg.classList.contains("success")){
    svg.classList.remove("initial");
    svg.classList.remove("validate");
    svg.classList.add("focus");
    if(svg.classList.contains("error")){
      function transEnd(){
        svg.classList.remove("error")
        lsLine.removeEventListener("transitionend", transEnd)	
      }
      lsLine.addEventListener("transitionend", transEnd, false);
    }
    if(svg.classList.contains("success")){
      function transEnd(){
        svg.classList.remove("success")
        lsLine.removeEventListener("transitionend", transEnd)	
      }
      lsLine.addEventListener("transitionend", transEnd, false);
    }
  }
}
function blurElement(inputElm){
  var field = inputElm.closest(".form-field");
  var lsLine = field.getElementsByClassName("ls-line")[0];
  var lsCircle = field.getElementsByClassName("ls-circle")[0];
  var svg = field.getElementsByTagName("svg")[0];

  if(svg.classList.contains("focus")){
    svg.classList.remove("focus");
    svg.classList.add("validate");
    setTimeout(function(){
      svg.classList.remove("validate");
      if(inputElm.value.length > 0){
        svg.classList.add("success");
      }else{
        inputElm.setAttribute("placeholder", inputElm.getAttribute("data-text"));
        svg.classList.add("error");
      }
    },1900);
  }
}
function bindClick(){
  var formField = document.getElementsByClassName("form-field");
  for(var i=0; i<formField.length;i++){
    var inputElm = formField[i].getElementsByTagName("input")[0];
    inputElm.addEventListener("focus", function(){focusElement(this);}, false);
    inputElm.addEventListener("blur", function(){blurElement(this);}, false);
  }
}

bindClick();