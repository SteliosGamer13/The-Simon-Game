var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var bestScore = 0;

// Ξεκινάει με πλήκτρο ή με κλικ/πάτημα έξω από τα κουμπιά
$(document).on("keypress click touchstart", function(event) {
  if (!started) {
    if ($(event.target).hasClass("btn")) {
      return;
    }

    started = true;
    playStartSound();

    setTimeout(function() {
      nextSequence();
    }, 800);
  }
});

$(".btn").on("click touchstart", function(e) {
  e.preventDefault();

  if (!started) {
    return;
  }

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function playStartSound() {
  var audio = new Audio("sounds/start.mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Επίπεδο " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    if (level - 1 > bestScore) {
      bestScore = level - 1;
      $("#best-score").text("Καλύτερο σκορ: " + bestScore);
    }

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Έχασες! Κάνε κλικ έξω ή πάτα κάποιο πλήκτρο για να ξαναπαίξεις");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
