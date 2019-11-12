
// Choose button randomly
var buttons = ["green", "red", "blue", "yellow"];
var randomButtons = [];//save the sequence of button numbers being generated
var clickedButtons = [];//save the sequence of buttons being clicked
var level = 0;
var gameOverText;

if (window.matchMedia("(min-width:1000px)").matches) {//PC

  gameOverText = "Game Over, Press Any Key to Restart";

  $(document).on("keypress", function (event) {
    if (level===0) {
      genRandomButton();
    }
  });
}
else {//Mobile or Tablet
  gameOverText = "Game Over, Click Here To Restart";
  $("#level-title").text("Click here to start");

  $("#level-title").on("click", function (event) {
    if (level===0) {
      genRandomButton();
    }
  });
}

//---------------

// Click on a button
$(".btn").on("click", function() {

  var btn = this;
  btn.classList.add("pressed");
  setTimeout(function () {
    btn.classList.remove("pressed");
  }, 100);

  var audio = new Audio("sounds/"+btn.id+".mp3");
  audio.play();

  clickedButtons.push(buttons.indexOf(btn.id));

  if ( randomButtons.length === 0 ||
      randomButtons.slice(0, clickedButtons.length).toString() !== clickedButtons.toString()) {
    gameOver();
  }
  else if (randomButtons.toString() === clickedButtons.toString()) {
    genRandomButton();
  }
});

//---------------

function genRandomButton() {

  setTimeout(function() {
    level++;
    $("#level-title").text("Level " + level);
  }, 200);

  setTimeout(function() {
    var randomNumber = Math.floor(Math.random()*4);//0:green; 1:red; 2:blue; 3:yellow
    randomButtons.push(randomNumber);
    clickedButtons = [];
    $("#" + buttons[randomNumber]).fadeOut("fast").fadeIn("fast");
  }, 800);

}

//---------------

function gameOver() {
  level = 0;
  $("#level-title").text(gameOverText);
  randomButtons = [];
  clickedButtons = [];
  $("body").addClass("game-over");

  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 120);
}
