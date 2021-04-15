
$(document).ready(function(){
    $('.btn').css({
      "display":"inline"
    });
    $('.slider').css({
        "border": "12px solid  #7B0000",
        "overflow": "hidden"
    });
    $('.pictures').css({
        "display": "flex"

    });
  });

  const fKnapp= document.querySelector('#förra');
  const nKnapp= document.querySelector('#nästa');

  var currentPic = 1;

  nKnapp.addEventListener('click',()=>{
      if(currentPic == 3){
          $('.pictures').animate({
              "marginLeft": "+=1280px"
          })
          currentPic = 1;
      }else{
          $('.pictures').animate({
              "marginLeft": "-=640px"
          })
          currentPic++;
      }


  });


  fKnapp.addEventListener('click',()=>{
    if(currentPic == 1){
        $('.pictures').animate({
            "marginLeft": "-=1280px"
        })
        currentPic = 3;
    }else{
        $('.pictures').animate({
            "marginLeft": "+=640px"
        })
        currentPic--;
    };
});
