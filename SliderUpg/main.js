
    $(".button").show();
    $(".buttonCss").hide();
    $("#navTextBox a").show();

    var counter=1;
    var amountOfSlides=4;
    var autoSlide=true;
    var picClass = $("#pictures");
    var navTxt = $("#navTextBox");

    $("#button2").click(function(){
      if (!(counter==amountOfSlides)) {
        picClass.animate({
          "left" : "-=300px"});
        navTxt.animate({
          "left" : "-=300px"});

        autoSlide=false;
        counter++;
      }else {
        picClass.animate({
          "left" : "+=900px"});
        navTxt.animate({
          "left" : "+=900px"});

        autoSlide=false;
        counter=1;
      }
    });


    $("#button1").click(function(){
      if (!(counter==1)) {
        picClass.animate({
          "left" : "+=300px"});
        navTxt.animate({
          "left" : "+=300px"});

        autoSlide=false;
        counter--;
      }else {
        picClass.animate({
          "left" : "-=900px"});
        navTxt.animate({
          "left" : "-=900px"});

        autoSlide=false;
        counter=amountOfSlides;
      }
    });

function auto(){
  if(autoSlide){
    if (!(counter==amountOfSlides)) {
      $("#pictures").animate({
        "left" : "-=300px"});
      $("#navTextBox").animate({
        "left" : "-=300px"});

      counter++;
    }else {
      $("#pictures").animate({
        "left" : "+=900px"});
      $("#navTextBox").animate({
        "left" : "+=900px"});

      autoSlide=false;
      counter=1;
    }
  }
}

setInterval(auto,1250);
