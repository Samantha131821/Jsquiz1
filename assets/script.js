var startButton = document.querySelector(".start-button");
var secondsLeft= 60;
var timeEl = document.querySelector(".time");

function startTimer() {
    startButton.addEventListener("click", startTimer);
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + "Seconds Left."

        if (secondsLeft === 0) {
            //Times Up! and goto next screen enter initals on score page.
            clearInterval(timerInterval);
            //recordScore();
        }
    },60000);    
}

//function recordScore() {
    //States final score
    //Enter Initals- submit 
    //See high scores
    }


//let userchoice = ""
//let score = 0

var displayQuestionOne = document.querySelector("question-one");
document.querySelector(".start-button").addEventListener("click", displayQuestionOne);

[{question-one: "What is JavaScript?", answers: "A. JavaScript is a scripting language used to make the website interactive.", "B. Javascript is an assembly language used to make the website interactive.", "C. JavaScript is a compiled language used to make the website interactive.", "D. None of the mentioned."}]