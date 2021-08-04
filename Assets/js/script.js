
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");

var feedbackEl = document.getElementById("feedback");



function startQuiz() {
  
  var startScreenEl = document.getElementById("main-screen");
  startScreenEl.setAttribute("class", "hide");

 
  questionsEl.removeAttribute("class");

 
  timerId = setInterval(clockTick, 1000);

  
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  
  var currentQuestion = questions[currentQuestionIndex];

  
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  
  choicesEl.innerHTML = "";

  
  currentQuestion.choices.forEach(function(choice, i) {

    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    
    choiceNode.onclick = questionClick;

    
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  
  if (this.value !== questions[currentQuestionIndex].answer) {
   
    time -= 15;

    if (time < 0) {
      time = 0;
    }

   
    timerEl.textContent = time;

  

    feedbackEl.textContent = "Wrong";
  } else {
   
    feedbackEl.textContent = "Correct";
  }


  
  currentQuestionIndex++;

  
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  
  clearInterval(timerId);

 
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  
  time--;
  timerEl.textContent = time;

  
  if (time <= 0) {
    quizEnd();
  }
}


 


startBtn.onclick = startQuiz;