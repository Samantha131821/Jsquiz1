

var questionContent = [
    question1 = {
        question: "What is JavaScript?", 
        answersArray: [
            "JavaScript is a scripting language used to make the website interactive.", 
            "Javascript is an assembly language used to make the website interactive.", 
            "JavaScript is a compiled language used to make the website interactive.", 
            "None of the mentioned."
        ],
        correctAnswer:"JavaScript is a scripting language used to make the website interactive."

    },
    question2 = {
        question: "JavaScript code can be written in ___.", 
        answersArray: [
            "Javascript file (.js file)",
            "HTML document directly", 
            "JavaScript and in HTML document directly",
            "In style sheets (.css file)"
        ],
        correctAnswer:"JavaScript and in HTML document directly"
    

    },
    question3 = {
        question: "Which JavaScript method is used to access HTML elements by id?", 
        answersArray: [
            "getElementByID()",
            "getElement(id)",
            "getElementByID(id)",
            "elementById(id)"
        ],
        correctAnswer:"getElementByID(id)"

    },
]

var submitButton = document.getElementById('initialsButton')

var timeEl = document.querySelector("#time");

var startButton = document.querySelector(".start-button");

var startPage = document.getElementById('startPage')
var questionPage = document.getElementById('questionPage')
var initialPage = document.getElementById('initialPage')

var questions = document.getElementById('questions')
var answers = document.getElementById('answers')

var displayScore = document.getElementById('finalScore')
var displayPreviouScore = document.getElementById('previousScore')
var initialsInput = document.getElementById('initialsInput')

var isQuiz = false;
var finalScore = 0;
var secondsLeft= 30;
var numberCorrect;
var numberIncorrect;
var questionIndex;
var questionArrayOrder;

var pageArray = [startPage, questionPage, initialPage]

function hidePages(){
    for (let i = 0; i < pageArray.length; i++) {
        if(!pageArray[i].classList.contains('hide')){
            pageArray[i].classList.add('hide')
        }
        
    }
}

function questionOrder(arr){
    let arrIndex=[]
    for (let i = 0; i < arr.length; i++) {
     arrIndex.push(i)    
    }

    return shuffleArray(arrIndex)
}


function shuffleArray(arr){
    return arr.sort(() => Math.random() - .5)
}

startButton.addEventListener("click", (startTimer));

function startTimer(event) {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " Seconds Left";
        
        if(secondsLeft <= 0) {
            timeEl.textContent = ""
            clearInterval(timerInterval);
            finalPage();
        }
    }, 1000);    
    hidePages()
    questionPage.classList.remove('hide')

    numberCorrect = 0
    numberIncorrect = 0;
    questionIndex = 0
    isQuiz = true

    questionArrayOrder = questionOrder(questionContent)

    questionUpdater(questionContent, questionArrayOrder[questionIndex])
}

function questionUpdater(array, index){

    questions.textContent = array[index].question;
    let currentAnswerArray = shuffleArray(array[index].answersArray)
    let ans;
    let but;
    
    for (let i = 0; i < currentAnswerArray.length; i++) {
        ans = document.createElement('LI')
        but = document.createElement('button')
       
        ans.appendChild(but)
        but.textContent = currentAnswerArray[i]

        ans.addEventListener('click', questionController)
        answers.appendChild(ans)
    }



}


function questionController(event){
    console.log(event.target.textContent);
    console.log(questionContent[questionArrayOrder[questionIndex]].correctAnswer);
    if(event.target.textContent === questionContent[questionArrayOrder[questionIndex]].correctAnswer){
        secondsLeft+=5;
        numberCorrect++
    } else{
        secondsLeft-=5;
        numberIncorrect++
    }
    clearQuestion()
    questionIndex++

    if(questionIndex < questionContent.length){
        questionUpdater(questionContent, questionArrayOrder[questionIndex])
    } else{
        finalScore = secondsLeft;
        secondsLeft = 0
    }

}


function clearQuestion(){
    questions.textContent = ''
    while(answers.hasChildNodes()){
        answers.removeChild(answers.childNodes[0])
    }

}


function finalPage(){
    if(finalScore < 1){
        finalScore = 0
    }
    var previousScore = localStorage.getItem('highScore')
    displayPreviouScore.textContent = previousScore

//to do:load and display previous initials


    displayScore.textContent = finalScore
    hidePages() 
    initialPage.classList.remove('hide')
    isQuiz = false
}
console.log(submitButton)
submitButton.addEventListener('click', (sendMessage));


function sendMessage() {
    //to do: check for initials
    //to do: save initials if saving highscore
    var previousScore = localStorage.getItem('highScore')
    var userInitials = localStorage.getItem('initialsInput')
    if (finalScore > previousScore) {
        localStorage.setItem('highScore', finalScore)
        localStorage.setItem('initialsinput', userInitials)
        }

    window.confirm("Score Submitted!")
}