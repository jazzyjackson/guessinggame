
var latestguess;
var arrowSelected = false;
var arrowElement = document.getElementById("arrow");
var sliderElement = document.getElementById("slider");

var checkGuess = matchGenerator();

sliderElement.addEventListener('mousedown', function(e){
  arrowSelected = true;
})

document.body.addEventListener('mouseup', function(e){
  if(arrowSelected){
    latestguess = Math.floor((Number(arrowElement.style.left.slice(0,-2)) + 15)/ 6);
    var magnitudeOfWrongness = checkGuess(latestguess);
    console.log(magnitudeOfWrongness);
    if(magnitudeOfWrongness === 0){
        arrowElement.style.borderBottomColor = "rgb(0,255,0)";
    } else {
        var red = (255 - Math.floor(magnitudeOfWrongness * 255));
        var blue = Math.floor(magnitudeOfWrongness * 255);
        arrowElement.style.borderBottomColor = "rgb("+red+",0,"+blue+")";
    }

    arrowSelected = false;
    //displayGuess();
  }
})


document.body.addEventListener('mousemove', function(e){
  if(arrowSelected){
    var newpos = Number(arrowElement.style.left.slice(0,-2)) + e.movementX;
    if(newpos >= -15 && newpos <= 585){
      arrowElement.style.left = newpos + "px";
      arrowElement.childNodes[1].textContent = Math.floor((newpos + 15) / 6);
    }
  }
})

function displayGuess(){
  document.getElementById("debug").childNodes[1].textContent = "Your last guess was " + latestguess;
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