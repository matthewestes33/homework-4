//an array of questions, choices and answers for page access
var questionsArray = [
    {
        question: "JavaScript often works in conjunction with CSS. What does CSS stand for?",
        choices: ["California Short Stack", "College Short Stop", "Cascading Style Sheets", "Cannot Stop Speeding"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What year was JavaScript invented?",
        choices: ["1995", "1999", "2000", "2021"],
        answer: "1995"
    },
    {
        question: "jQuery is a library for what programming language?",
        choices: ["alpha numeric", "Dewey Decimal", "JavaScript", "all of the above"],
        answer: "JavaScript"
    },
    {
        question: "Bootstrap was built with what users in mind?",
        choices: ["desktop", "mobile", "radio", "extra-terrestrial"],
        answer: "mobile"
    },
];

// various variables placed outside of functions for proper scoping
var buttonQuiz = document.querySelector("#button-start");
var containerQuiz = document.querySelector("#container-quiz");
var timeLeftEl = document.querySelector("#time-left");
var endScreen = document.querySelector("#end-screen");
var quizBox = document.querySelector("#quiz-box");
var initialsSubmit = document.querySelector("#initials-button");
var countdownClock = questionsArray.length * 10;
var clockInterval;
var currentQuizQuestion = 0;
var listScoreInitials;
var finalScoreDisplay = document.querySelector("#final-score");

// function ends the game
function gameOver() {
    endScreen.classList.remove("hide")
    quizBox.textContent = "";
    containerQuiz.innerHTML = "The game has concluded. Thank you for playing! Save your initials below to record your score.";
    clearInterval(clockInterval);
}

//main function to produce questions and responses throughout quiz play
function produceQuestion() {
    //ends the game if the current quiz question (5, but 4 in array math) equals the # of questions, which is 4
    if(currentQuizQuestion === questionsArray.length) {
        console.log("game over was called")
        gameOver();
        return
    }
    //produce a question from the array and place it on the page
    var newQuestion = document.createElement("p");
    newQuestion.textContent = questionsArray[currentQuizQuestion].question;
    //pull the appropriate choices for the questions, and place those on the page
    var fourAnswers = document.createElement("ol");

    for (var i = 0; i < questionsArray[currentQuizQuestion].choices.length; i++) {
        var userChoice = document.createElement("li");
        userChoice.textContent = questionsArray[currentQuizQuestion].choices[i];
        fourAnswers.append(userChoice);
    }

    //append textContent of the quiz container on the page
    containerQuiz.append(newQuestion);
    containerQuiz.append(fourAnswers);
}

//function that verifies the answer given by user, generates a response whether correct or incorrect, and continues game play
function verifyAnswer(event) {
    var currentAnswer = event.target.textContent;
    var correctAnswer = document.createElement("p");
    if(currentQuizQuestion === questionsArray.length) {
        return
    }
    else if(currentAnswer === questionsArray[currentQuizQuestion].answer) {
        quizBox.textContent = "";
        correctAnswer.textContent = "Correct!";
        quizBox.append(correctAnswer);
    } else{
        quizBox.textContent = "";
        correctAnswer.textContent = "Incorrect! You have lost four seconds.";
        // penalty for wrong answer ??
        countdownClock -= 4;
        quizBox.append(correctAnswer);
    }
    //clears out the question container after answer given and response generated
    //gets page ready to move to next question upon specific action
    containerQuiz.innerHTML = "";
    currentQuizQuestion++;
    produceQuestion();
}

// function to print and decrement the clock at regular intervals
function runClock() {
    // check to see if value is less than 1
    if(countdownClock < 1) {
        gameOver()
    }
    // print the time left on the timer
    timeLeftEl.textContent = countdownClock;
    countdownClock--

}

// function that starts the quiz
function beginQuiz() {
    produceQuestion();
    // runs the timer
    clockInterval = setInterval(runClock, 1000);
}

// function to process end of game action
function scoreKeeper (){
    // grabs scores and initials to be held in local storage
    var finalScore = JSON.parse(localStorage.getItem("final-score"));
    var userInitials = document.querySelector("#initials").value;
    var nextScore = {
        initials:userInitials,
        score:countdownClock
    }
    if(finalScore == null) {
        finalScore = [nextScore]
    } else {
        finalScore.push(nextScore)
    }

    localStorage.setItem("final-score", JSON.stringify(finalScore));
    console.log(finalScore)

    //displays scores and initials
    var finalResult = document.createElement("ol");

    for (var i = 0; i < finalScore.length; i++) {
        var userScore = document.createElement("li");
        userScore.textContent = finalScore[i].initials + " score: " + finalScore[i].score;
        finalResult.append(userScore);}

    finalScoreDisplay.append(finalResult);
    endScreen.classList.add("hide")
}

//event listener to trigger the function when the user clicks the button
buttonQuiz.addEventListener("click", beginQuiz);

//event listener to verify of the answer
containerQuiz.addEventListener("click", verifyAnswer);

// event listener to get initials and display scores
initialsSubmit.addEventListener("click", scoreKeeper);
