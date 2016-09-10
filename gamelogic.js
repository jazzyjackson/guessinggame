var arrowSelected = false;
var arrowElement = document.getElementById("arrow");
var sliderElement = document.getElementById("slider");

var checkGuess = matchGenerator();







  sliderElement.addEventListener('mousedown', function(e){
    arrowSelected = true;
  })

  document.body.addEventListener('mouseup', function(e){
    if(arrowSelected){
      makeAGuess(Math.floor((Number(arrowElement.style.left.slice(0,-2)) + 15)/ 6));

    }
  })


  document.getElementById('guessbutton').addEventListener('click', function(){
    var guessVal = document.getElementById('guesstext').value;
    if(guessVal >= 0 && guessVal <= 100){
      moveArrow(-15 + (guessVal * 6));
    }
    makeAGuess(guessVal);
  })

  document.body.addEventListener('mousemove', function(e){
    if(arrowSelected){
      moveArrow(Number(arrowElement.style.left.slice(0,-2)) + e.movementX);
    }
  })

  document.getElementById('guesstext').addEventListener('keydown', function(e){
    if(e.key == "Enter"){
      document.getElementById('guessbutton').click();
    }
    console.log(e);

  })

  document.getElementById('resetbutton').addEventListener('click', function(){
    document.getElementById('guesstext').value = '';
    document.getElementById('guesstext').style.borderColor = "black";
    resetSlider();

  })

function resetSlider(){

  arrow.style.left = "-15px";
  arrow.style.borderBottomColor = "#888888";
  arrow.childNodes[1].innerText = 0;
  while(slider.childNodes.length > 2){
    slider.removeChild(slider.firstChild);
  }

}


function makeAGuess(latestguess){
    var magnitudeOfWrongness = checkGuess(latestguess);
    console.log(magnitudeOfWrongness);
    if(magnitudeOfWrongness === 0){
        arrowElement.style.borderBottomColor = "rgb(0,255,0)";
        guesstext.style.borderColor = "rgb(0,255,0)";
    } else {
        var red = (255 - Math.floor(magnitudeOfWrongness * 255));
        var blue = Math.floor(magnitudeOfWrongness * 255);
        arrowElement.style.borderBottomColor = "rgb("+red+",0,"+blue+")";
        guesstext.style.borderColor = "rgb("+red+",0,"+blue+")";
    }
    document.getElementById('guesstext').value = latestguess;

    attachGuessArrow();
    arrowSelected = false;
    //displayGuess();
}


function attachGuessArrow(){
  var newArrow = arrowElement.cloneNode(false)
  newArrow.id = "";
  sliderElement.insertBefore(newArrow, arrowElement);
}


function moveArrow(newpos){
  if(newpos >= -15 && newpos <= 585){
      arrowElement.style.left = newpos + "px";
      arrowElement.childNodes[1].textContent = Math.floor((newpos + 15) / 6);
    }
}




function matchGenerator(){ //returns a function that takes a number as an argument.
//the distance of the guess from the random number enclosed is returned as a ratio
                           // 0 means a match, 1 means you couldn't be more wrong. Closer to 0 = getting warmer.
  var numberToMatch = Math.floor(Math.random() * 100);
  return function(numberToCheck){
    console.log(numberToMatch);
    if(numberToMatch === numberToCheck){
      return 0;
    } else if(numberToCheck > numberToMatch){
      return (numberToCheck - numberToMatch) / (100 - numberToMatch);
    } else {
      return (numberToMatch - numberToCheck) / numberToMatch;
    }
  }
}

