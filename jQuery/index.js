$(document).ready(function(){
    console.log("Document is ready");
});
$("h1").text("Hello world");
$("h1").html("<em>Hello world</em>")
$("button").text("Press Me🤤");

$("h1").addClass("type");
$("h1").removeClass("type");

$(document).keypress(function(event){
    $("h1").text(event.key);
});

$("h1").on("mousemove", function(){
    $("h1").css("color", "Red");
})

$("h1").on("mouseleave", function(){
    $("h1").css("color", "Purple");
})

$("button").on("click", function(){
    $("h1").fadeOut().fadeIn().fadeOut().fadeIn();
});
$("button").on("click", function(){
    $("h1").slideUp().slideDown();
});
$("button").on("click", function(){
    $("h1").animate({opacity: 0.5}); //only works with numeric values
}); 