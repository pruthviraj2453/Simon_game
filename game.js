var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [] ,userClickedPattern = [];
var gameStarted = false,level=1,unequal=true;
var success = false,count=0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4)+1;
    var randomChosenColour = buttonColours[randomNumber];  
    gamePattern.push(randomChosenColour);
    animateNextSequence(randomChosenColour);
    playSound_system(randomChosenColour);
    $("h1").text("level "+level);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    playSound_click(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userChosenColour);
})

function playSound_system(name){
    var audio1 = new Audio(name +".mp3");
    audio1.play();
}

function playSound_click(name){
    console
    var audio2 = new Audio(name +".mp3");
    audio2.play();
}

function animateNextSequence(name){
    $("#"+name).fadeOut(100).fadeIn(100);
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

$(document).keydown(function(){
    if(gameStarted==false){
        nextSequence();
    }
    gameStarted=true;
    })

function checkAnswer(userChosenColour){
    if(userChosenColour!=gamePattern[count] || count>level){
        $("h1").text("Game over , Press any key to restart");
        playSound_system("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        level=1;
        gamePattern=[];
        userClickedPattern=[];
        count = 0;
        gameStarted=false;
    }
    if(userChosenColour==gamePattern[count] && count<level){
        count++;
        if(count==level){
            success=true;
        }
    }
    if(success==true){
        setTimeout(function(){
            nextSequence();
        },1000)
        userClickedPattern=[];
        level++;
        success=false,count=0;
    }
    
}

