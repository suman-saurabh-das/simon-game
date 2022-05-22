// Array to store button colors
var buttonColors = ["red", "blue", "green", "yellow"];
// Array to store game patterns
var gamePattern = [];
// Array to store user clicked patterns
var userClickedPattern = [];
// Variable to store if user pressed a key (Game started or not)
var gameStarted = false;
// Variable to store level
var level = 0;

// function to choose a random color
function nextSequence() {

    // Empty the array so that user will again choose the colors
    userClickedPattern = [];

    // Increament level every time nextSequence is called
    level = level+1;
    // Changing h1 text
    $("#level-title").text("Level " + level);

    // Generating a random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    // Choosing a color from array (buttonColors) based on random number
    var randomChosenColor = buttonColors[randomNumber];
    // Storing the game pattern colors
    gamePattern.push(randomChosenColor);

    // Adding animation to the game pattern selected.
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    // Playing sound
    playSound(randomChosenColor);

    console.log("gamePattern");
    console.log(gamePattern);
}

// handlerFunction - triggered upon selecting a button
function handlerFunction(event) {
    // Storing id of the button click in userChosenColor variable
    var userChosenColor = event.currentTarget.id;
    // Storing the user chosen color in array userClickedPattern
    userClickedPattern.push(userChosenColor);

    // Playing sound
    playSound(userChosenColor);
    // Animating button
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

    console.log("userClickedPattern");
    console.log(userClickedPattern);
}

// checkAnswer - function to check the answer
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        // console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
}

// function to start the game again
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    $("#start").css("display", "inline-block");
}

// function to play sound
function playSound(name) {
    var buttonColorSound = new Audio("sounds/" + name + ".mp3");
    buttonColorSound.play()
}

// function to animate button pressed
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

// Detecting keyboard pressed
$(document).on("keypress", function () {
    if (gameStarted === false) {
        nextSequence();
        gameStarted = true;
    }
})

// On button click run handlerFunction()
$(".btn").on("click", handlerFunction)

$(".start-button").on("click", function(){
    $("#start").css("display", "none");
    nextSequence();
});