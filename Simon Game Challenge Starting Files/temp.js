var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
function nextSequence(){
    var next = Math.floor(Math.random() * 4);
    return next;
}
$(document).on("keydown", function(e){
    var flag = false;
    if (e.key.length == 1) {
        //game start
        var c = 0;
        do {
            c++;
            $("h1").text("Level " + c);
            for (let i = 0; i < c; i++) {
                var nextButton = buttonColors[nextSequence()];

                btnPress(nextButton);

                gamePattern.push(nextButton);

                for (let i = 0; i < c; i++) {
                    $(".btn").on("click", function(){
                        btnPress(this.id);
                        userPattern.push(this.id);

                        if(userPattern[i] !== gamePattern[i]) flag = true;
                    });

                    if(flag) break;
                }
            }
        } while (!flag);
        // pattern broken
        if (flag) {
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 100);
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
        }
    }
});

function btnPress(nextButton){
    $("#" + nextButton).addClass("pressed");
    setTimeout(function(){
        $("#" + nextButton).removeClass("pressed")
    }, 100);

    var audio = new Audio ("./sounds/" + nextButton +".mp3");
    audio.play();
}