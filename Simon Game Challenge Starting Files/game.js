var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function(e){
    //console.log(e.target.id);
    userClickedPattern.push(e.target.id);

    animatePress(e.target.id);
    playSound(e.target.id);
    checkAnswer(userClickedPattern.length-1);
})

$(document).keydown(function(e){
  if (started == false) {
    $("#level-title").text("Level " + level);
      nextSequence();

      started = true;
  }

})


function nextSequence() {
  userClickedPattern = [];
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
 $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColor);
level = level + 1;
$("#level-title").text("Level " + level);


}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
  $("#" + currentColor).removeClass("pressed")},100);
}


function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function(){
              nextSequence();
            }, 1000)
          }
  }else {
    playSound("wrong");


    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over")},300);
     $("#level-title").text("Game Over, Press Any Key to Restart");
     startOver();
  }

  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
