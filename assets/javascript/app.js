// ---------- Initial State


var timeRemaining = 30;
var isRunning = true;

var handle;

var onQuestion = 1

var questionOne = {
    question: "Which is a Dungeons & Dragons character class?",
    choices: ["Wizard", "Warrior", "Priest", "Shaman"],
    answer: 0
}

var questionTwo = {
    question: "Which die is NOT commonly used in D&D?",
    choices: ["30 sided die (D30)", "6 sided die (D6)", "10 sided die (D10)", "8 sided die (D8)"],
    answer: 0
}


var questionThree = {
    question: "Movement is measured in increments of how many feet?",
    choices: ["1 foot", "3 feet", "5 feet", "10 feet"],
    answer: 2
}

var questionFour = {
    question: "Which Ability Score do Elves naturally get a +2 bonus in?",
    choices: ["Intelligence", "Strength", "Dexterity", "Charisma"],
    answer: 2
}


var questionArr = [questionOne, questionTwo, questionThree, questionFour];

// ---------- Text and Timer Set-up


$("#question").text(questionOne.question)
console.log($("#question").text(questionOne.question))



for (var i = 0; i < 4; i++) {

$("#choices-container").append("<div class='choice' value=" + i + ">" + questionArr[onQuestion-1].choices[i] + "</div>")

}

start();

$(".choice").on("click", function(e) {

    console.log(this);
    console.log($(this).attr("value"))

    if ($(this).attr("value") === questionArr[onQuestion-1].answer.toString()) {
        console.log("Correct!")
        stop();
        correct();
    }
    else {
        console.log("Wrong!")
        stop();
        wrong();
    }

});




// ---------- Functions

    function start() {
        handle = setInterval (decrement, 1000);
    }


    function decrement() {
        if (isRunning = true) {
        timeRemaining--;
        $("#time-remaining").html(timeRemaining + " seconds");
        }
        if (timeRemaining === 0) {
            stop();
        }
    
    }

    function stop() {
        clearInterval(handle);
        isRunning = false;
        timeRemaining = 30;
    }

    function wrong() {
        $("#question").html("<h2>Nope!</h2>");
        $("#choices-container").html("<h3>The correct answer was: " + questionArr[onQuestion-1].choices[questionArr[onQuestion-1].answer])
    }

    function correct() {
        $("#question").html("<h2>Correct!</h2>");
        $("#choices-container").html("<img src='assets/images/wizard.png'><div class='answer-label'>A Wizard</div>");
    }
