$(document).ready(function() {

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

	// ---------- Wall of Questions

	var questionOne = {
		question: "Which class is a D&D character class?",
		choices: ["Wizard", "Warrior", "Priest", "Shaman"],
		answer: 0,
		correctImage: "<img src='assets/images/wizard.png'>",
		caption: "An official depiction of a Wizard."
	}

	var questionTwo = {
		question: "Which die is NOT commonly used in D&D?",
		choices: ["30 sided die (D30)", "6 sided die (D6)", "10 sided die (D10)", "8 sided die (D8)"],
		answer: 0,
		correctImage: "<img src='assets/images/die.png'>",
		caption: "A 30 sided die... who even uses these?"
	}

	var questionThree = {
		question: "Movement is measured in increments of how many feet?",
		choices: ["1 foot", "3 feet", "5 feet", "10 feet"],
		answer: 2,
		correctImage: "<img src='assets/images/foot.jpg'>",
		caption: "Each square is 5x5 feet. If you're using hex grids instead, well... you're on your own then!"
	}

	var questionFour = {
		question: "Which Ability Score do Elves naturally get a +2 bonus in?",
		choices: ["Intelligence", "Strength", "Dexterity", "Charisma"],
		answer: 2,
		correctImage: "<img src='assets/images/elf.png'>",
		caption: "An Elf. Did you know that elves can see in complete darkness? Darkvision!"
	}

	var questionFive = {
		question: "Who was the original designer of D&D?",
		choices: ["Sandy Petersen", "J. R. R. Tolkien", "Rick Priestley", "Gary Gygax"],
		answer: 3,
		correctImage: "<img src='assets/images/gygax.jpg'>",
		caption: "Gary Gygax (1938 - 2008)"
	}

	var questionSix = {
		question: 'Which is a necessary spell component to cast the spell "Fireball"?',
		choices: ["A bit of fleece", "Bat guano", "A pinch of sand", "300 gold pieces worth of diamond dust"],
		answer: 1,
		correctImage: "<img src='assets/images/fireball.jpg'>",
		caption: "Fireball does 8d6 damage. This time it deals " + "<div id='fire'>" + fireball + "</div>" + " damage!"
	}

	var questionSeven = {
		question: "Which is NOT one of the three core rulebooks?",
		choices: ["Dungeon Master's Guide", "Player's Handbook", "Monster Manual", "Rules Compendium"],
		answer: 3,
		correctImage: "<img src='assets/images/rules.jpg'>",
		caption: "The Rules Compendium for 3.5 Edition, while not a core rulebook, is a supplement that takes all of the game's most important rules and presents them in a single comprehensive, easy-to-reference volume."
	}

	var questionEight = {
		question: 'What does "D&D" (or "DnD") stand for?',
		choices: ["Damage & Destroy", "Dungeons & Dragons", "Detection & Direction", "Deities & Demigods"],
		answer: 1,
		correctImage: "<img src='assets/images/dnd.svg'>",
		caption: "The Dungeons & Dragons logo used for the 5th Edition of the game."
	}

	var questionArr = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight];

	// ---------- Functions

	function start() {
		timeRemaining = 30;
		$("#time-remaining").html("Time Remaining: " + timeRemaining + " seconds");
		handle = setInterval(decrement, 1000);
	}

	function decrement() {
		if (isRunning = true) {
			timeRemaining--;
			$("#time-remaining").html("Time Remaining: " + timeRemaining + " seconds");
		}
		if (timeRemaining === 0) {
			stop();
			outOfTime();
			setTimeout(next, 3000);
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

	}

	function correct() {
		correctAnswers++
		$("#question").html("<h2>Correct!</h2>");
		$("#choices-container").html(questionArr[onQuestion - 1].correctImage + "<div id='image-caption'>" + questionArr[onQuestion - 1].caption + "</div>");
	}

	function next() {
		onQuestion++
		if (onQuestion < 9) {
			$("#time-remaining").html("Time Remaining: 30 seconds");
			$("#question").text(questionArr[onQuestion - 1].question)
			$("#choices-container").empty();
			for (var i = 0; i < 4; i++) {
				$("#choices-container").append("<div class='choice' value=" + i + ">" + questionArr[onQuestion - 1].choices[i] + "</div>")
			}
			start();
			onClick();
		} else {
			$("#question").html("<h2>All done, here's how you did!</h2>");
			$("#choices-container").html("<h3>Correct Answers: " + correctAnswers + "</h3>");
			$("#choices-container").append("<h3>Incorrect Answers: " + wrongAnswers + "</h3>");
			$("#choices-container").append("<h3>Unanswered: " + unanswered + "</h3>");
			$("#choices-container").append("<div id='restart'>Start Over?</div>");

			$("#restart").on("click", function(e) {

				init();

			});

		}
	}

	function onClick() {
		$(".choice").on("click", function(e) {

			if ($(this).attr("value") === questionArr[onQuestion - 1].answer.toString()) {

				stop();
				correct();
				setTimeout(next, 5000);
			} else if ($(this).attr("value") !== questionArr[onQuestion - 1].answer.toString()) {

				stop();
				wrong();
				setTimeout(next, 5000);
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

		$("#start").css("display", "block");

		$("#time-remaining").empty();
		$("#question").empty();
		$("#choices-container").empty();

		$("#start").html("Start");

		$("#start").off().on("click", function(e) {
			$("#start").css("display", "none");
			$("#question").text(questionArr[onQuestion - 1].question);

			for (var i = 0; i < 4; i++) {

				$("#choices-container").append("<div class='choice' value=" + i + ">" + questionArr[onQuestion - 1].choices[i] + "</div>")
			}

			start();

			onClick();

		});

	}

	//---------- Initialize

	init();

});