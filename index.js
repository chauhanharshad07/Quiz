let quistions = [
    {
        quistion: "What is a closure in JavaScript?",
        answers : [
            {text:"A function that can access variables outside its scope",correct:false},
            {text:"A way to create private variables",correct:false},
            {text:"A technique for creating reusable code",correct:false},
            {text:"All of the above",correct:true},
        ]
    },
    {
        quistion: "Which of the following is NOT a method for handling asynchronous operations in JavaScript?",
        answers : [
            {text:"Callbacks",correct:false},
            {text:"Promises",correct:false},
            {text:"Synchronous functions",correct:true},
            {text:"Async/await",correct:false},
        ]
    },
    {
        quistion: "How do you create a new object in JavaScript?",
        answers : [
            {text:"Using the new keyword with a constructor function",correct:false},
            {text:"By assigning properties to an empty object",correct:false},
            {text:" Both A and B",correct:true},
            {text:"Neither A nor B",correct:false},
        ]
    },
    {
        quistion: "Which method is used to select an element by its ID in JavaScript?",
        answers : [
            {text:"getElementById()",correct:true},
            {text:"querySelector()",correct:false},
            {text:"getElementsByClassName()",correct:false},
            {text:"getElementsByTagName()",correct:false},
        ]
    }
]

let quistionElement = document.getElementById("quistion");
let answerButtons = document.getElementById("answer-button");
let nextButton = document.getElementById("next-btn");

let quistionStartIndex = 0;
let score = 0

function startQuiz () {
    quistionStartIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuistion()
}

function showQuistion(){
    resetState();
    let currentQuistion = quistions[quistionStartIndex]
    let quistionNo = quistionStartIndex + 1
    quistionElement.innerHTML = quistionNo + " ) " + currentQuistion.quistion;

    currentQuistion.answers.forEach(answer=>{
        let button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct =answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }   
}
function selectAnswer (e){
    const selectBtn = e.target;
    const iscorrect = selectBtn.dataset.correct === "true"; 
    if(iscorrect){
        selectBtn.classList.add("correct")
        score++;
    }
    else{
        selectBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true" ){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    quistionElement.innerHTML =`You Scored ${score} out of ${quistions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    quistionStartIndex++;
    if(quistionStartIndex < quistions.length){
        showQuistion()
    }else{
        showScore()
    }
}

nextButton.addEventListener("click",()=>{
    if(quistionStartIndex < quistions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz()
