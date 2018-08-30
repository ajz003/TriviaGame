// ---------- Initial State


var timeRemaining;
var isRunning = true;

var handle;

var onQuestion = 1

var correctAnswers = 0
var wrongAnswers = 0
var unanswered = 0;

var fireball = 0;
for (var i = 0; i < 8; i++) {
    var d6 = Math.floor((Math.random() * 6) + 1);
    fireball += d6;
}



var questionOne = {
    question: "Which is a Dungeons & Dragons character class?",
    choices: ["Wizard", "Warrior", "Priest", "Shaman"],
    answer: 0,
    correctImage: "<img src='assets/images/wizard.png'>",
    caption: "A Wizard"
}

var questionTwo = {
    question: "Which die is NOT commonly used in D&D?",
    choices: ["30 sided die (D30)", "6 sided die (D6)", "10 sided die (D10)", "8 sided die (D8)"],
    answer: 0,
    correctImage: "<img src='assets/images/die.png'>",
    caption: "A 30 sided die... who even uses this?"
}


var questionThree = {
    question: "Movement is measured in increments of how many feet?",
    choices: ["1 foot", "3 feet", "5 feet", "10 feet"],
    answer: 2,
    correctImage: "<img src='assets/images/foot.jpg'>",
    caption: "Each square is 5 feet by 5 feet. If you're using a hex system, you're on your own though!"
}

var questionFour = {
    question: "Which Ability Score do Elves naturally get a +2 bonus in?",
    choices: ["Intelligence", "Strength", "Dexterity", "Charisma"],
    answer: 2,
    correctImage: "<img src='assets/images/elf.png'>",
    caption: "An Elf (the first one that pops up for D&D on Google Images)"
}

var questionFive = {
    question: "Who was the original designer of Dungeons & Dragons?",
    choices: ["Sandy Petersen", "J. R. R. Tolkien", "Rick Priestley", "Gary Gygax"],
    answer: 3,
    correctImage: "<img src='assets/images/gygax.jpg'>",
    caption: "Gary Gygax 1938-2008"
}

var questionSix = {
    question: 'Which is a necessary spell component to cast the spell "Fireball"?',
    choices: ["A bit of fleece", "Bat guano", "A pinch of sand", "300 gold pieces worth of diamond dust"],
    answer: 1,
    correctImage: "<img src='assets/images/fireball.jpg'>",
    caption: "Fireball does 8d6 damage. This time it deals " + "<div id='fire'>" + fireball + "</div>" + " damage!"
}


var questionSeven = {
    question: 'Which is a necessary spell component to cast the spell "Fireball"?',
    choices: ["A bit of fleece", "Bat guano", "A pinch of sand", "300 gold pieces worth of diamond dust"],
    answer: 1,
    correctImage: "<img src='assets/images/fireball.jpg'>",
    caption: "Fireball does 8d6 damage. This time it deals " + "<div id='fire'>" + fireball + "</div>" + " damage!"
}

var questionEight = {
    question: 'Which is a necessary spell component to cast the spell "Fireball"?',
    choices: ["A bit of fleece", "Bat guano", "A pinch of sand", "300 gold pieces worth of diamond dust"],
    answer: 1,
    correctImage: "<img src='assets/images/fireball.jpg'>",
    caption: "Fireball does 8d6 damage. This time it deals " + "<div id='fire'>" + fireball + "</div>" + " damage!"
}

var questionArr = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight];

// ---------- Text and Timer Set-up


$("#question").text(questionArr[onQuestion - 1].question)




for (var i = 0; i < 4; i++) {
    $("#choices-container").append("<div class='choice' value=" + i + ">" + questionArr[onQuestion - 1].choices[i] + "</div>")
}

start();
onClick();



// ---------- Functions

function start() {
    timeRemaining = 3;
    $("#time-remaining").html(timeRemaining + " seconds");
    handle = setInterval(decrement, 1000);
}


function decrement() {
    if (isRunning = true) {
        timeRemaining--;
        $("#time-remaining").html(timeRemaining + " seconds");
    }
    if (timeRemaining === 0) {
        stop();
        outOfTime();
        setTimeout(next, 2000);
    }

}

function stop() {
    clearInterval(handle);
    isRunning = false;
    timeRemaining = 30;
}

function wrong() {
    wrongAnswers++
    $("#question").html("<h2>Nope!</h2>");
    $("#choices-container").html("<h3>The correct answer was: " + questionArr[onQuestion - 1].choices[questionArr[onQuestion - 1].answer])
    $("#choices-container").append(questionArr[onQuestion - 1].correctImage + "<div id='image-caption'>" + questionArr[onQuestion - 1].caption + "</div>");
}

function outOfTime() {
    unanswered++
    $("#question").html("<h2>Out of Time!</h2>");
    $("#choices-container").html("<h3>The correct answer was: " + questionArr[onQuestion - 1].choices[questionArr[onQuestion - 1].answer])
    $("#choices-container").append(questionArr[onQuestion - 1].correctImage + "<div id='image-caption'>" + questionArr[onQuestion - 1].caption + "</div>");
    console.log(unanswered)
}

function correct() {
    correctAnswers++
    $("#question").html("<h2>Correct!</h2>");
    $("#choices-container").html(questionArr[onQuestion - 1].correctImage + "<div id='image-caption'>" + questionArr[onQuestion - 1].caption + "</div>");
}

function next() {
    onQuestion++
    if (onQuestion < 9) {
        $("#time-remaining").html("30 seconds");
        $("#question").text(questionArr[onQuestion - 1].question)
        $("#choices-container").empty();
        for (var i = 0; i < 4; i++) {
            $("#choices-container").append("<div class='choice' value=" + i + ">" + questionArr[onQuestion - 1].choices[i] + "</div>")
        }
        start();
        onClick();
    }
    else {
        $("#question").html("<h2>All done, here's how you did!</h2>");
        $("#choices-container").html("<h3>Correct Answers: " + correctAnswers + "</h3>");
        $("#choices-container").append("<h3>Incorrect Answers: " + wrongAnswers + "</h3>");
        $("#choices-container").append("<h3>Incorrect Answers: " + unanswered + "</h3>");
        $("#choices-container").append("<div id='restart'>Start Over?</div>");

        $("#restart").on("click", function (e) {

            init();

        });

    }
}

function onClick() {
    $(".choice").on("click", function (e) {

        console.log(this);
        console.log($(this).attr("value"))

        if ($(this).attr("value") === questionArr[onQuestion - 1].answer.toString()) {
            console.log("Correct!")
            stop();
            correct();
            setTimeout(next, 500);
        }

        else if ($(this).attr("value") !== questionArr[onQuestion - 1].answer.toString()) {
            console.log("Wrong!")
            stop();
            wrong();
            setTimeout(next, 500);
        }


    });
}

function init() {

    var timeRemaining;
    isRunning = true;

    var handle;

    onQuestion = 1

    correctAnswers = 0
    wrongAnswers = 0
    unanswered = 0;

    fireball = 0;
    for (var i = 0; i < 8; i++) {
        var d6 = Math.floor((Math.random() * 6) + 1);
        fireball += d6;
    }

    $("#question").text(questionArr[onQuestion - 1].question);

    $("#choices-container").empty();


    for (var i = 0; i < 4; i++) {
        $("#choices-container").append("<div class='choice' value=" + i + ">" + questionArr[onQuestion - 1].choices[i] + "</div>")
    }

    start();
    onClick();


}