var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var lvl = 0;
var curKey;
var i = 0;

function nextSequence(){
    var next = Math.floor(Math.random() * 4);
    return next;
}

$(document).on("keydown", function(e){
    if (e.key.length == 1 && !started){
        $("body").removeClass("game-over");
        started = true;
        nextLvl();
    }
});

$(".btn").on("click", function(){
    i++;
    btnPress(this.id);

    if (this.id == gamePattern[i-1]) userPattern.push(this.id);
    else {
        gameOver();
        return;
    }
    setTimeout(() => {if (i === gamePattern.length) nextLvl()}, 500);
})

function btnPress(nextButton){
    $("#" + nextButton).addClass("pressed");
    setTimeout(function(){
        $("#" + nextButton).removeClass("pressed")
    }, 100);

    var audio = new Audio ("./sounds/" + nextButton +".mp3");
    audio.play();
}

function nextLvl(){
    lvl++;
    $("h1").text("Level " + lvl);
    curKey = buttonColors[nextSequence()];
    gamePattern.push(curKey);
    btnPress(curKey);

    userPattern.length = 0;
    i = 0;
}

function gameOver() {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    gamePattern.length = 0;
    userPattern.length = 0;
    started = false;
    lvl = 0;
    i = 0;
}