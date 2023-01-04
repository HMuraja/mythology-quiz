// GLOBAL DEFINITIONS
const startWindow= document.getElementById("start-container");
const questionWindow = document.getElementById("question-container");
const startForm = document.getElementById("start-form");
const difficultyOptions = document.querySelectorAll("input[name='quiz-difficulty']");
const nextQuizBtn = document.getElementById("next-quiz");
const answerFeedback = document.getElementById("answer-feedback");
const scoreHtml = document.getElementById("score");
const questionNumberHtml = document.getElementById("question-number");
const timeLeft = document.getElementById("time-left");

/*Event listeners that initiates the game after game difficulty and username has been submitted*/
startForm.addEventListener('submit', displayQuiz);
let currentQuizToDisplay = 0;

//////////////////////// FUNCTION FOR DROPDOWN MENU
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function dropMenu() {
    var headerLinks = document.getElementById("hidden-menu");
    var menuContainer= document.getElementById("menu-container");
    var stack= document.getElementById("stack-icon")
    if (headerLinks.style.display === "block") {
      headerLinks.style.display = "none";
      menuContainer.style.backgroundColor = "beige";
      stack.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    } else {
      headerLinks.style.display = "block";
      menuContainer.style.backgroundColor = "whitesmoke";
      stack.innerHTML = `<i class="fa-solid fa-x"></i>`;
        }
  }

//////////////////////// FUNCTION THAT SELECTS THREE QUESTIONS OF QUIZ ARRAY

function getThreeRandomQuizzes(playerInfo){
  let allQuizzes = getAllQuizzesOfDifficulty(playerInfo);
  let selectedIndexes = [];
  let selectedQuizzes = [];
  for (let i=0; i < 3; i++){
    let number = Math.floor(Math.random() * 7);
    while (selectedIndexes.includes(number)){
      number = Math.floor(Math.random() * 7)
    }
    selectedIndexes.push(number);
  }
  for (let i of selectedIndexes){
    selectedQuizzes.push(allQuizzes[i]);
  }
  return selectedQuizzes;
}

//////////////////////// FUNCTION THAT RETRIEVES THE QUIZ ARRAY FOR THE DIFFICULTY

function getAllQuizzesOfDifficulty(playerInfo){
  let selectedQuizzes;
  if (playerInfo.difficulty=='basic'){
    selectedQuizzes=basicQuizzes;
  }
  else if (playerInfo.difficulty=='moderate'){
    selectedQuizzes=moderateQuizzes;
  }
  else if (playerInfo.difficulty=='challenging'){
    selectedQuizzes=challengingQuizzes;
  }return selectedQuizzes;
}


//////////////////////// FUNCTION THAT DISPLAYS QUESTIONS

function displayQuiz(event){
 
  event.preventDefault();
  let feedbackHtml = document.getElementById("answer-feedback");//clear the feed-back section after previous question
  feedbackHtml.innerHTML= ``;
  updateQuestionNumber();
  switchWindows(event);
  let playerInfo = savePlayerInfo();
  let pickedQuizzes = getThreeRandomQuizzes(playerInfo);
  let question = document.getElementById("question");
  question.innerHTML = `${pickedQuizzes[currentQuizToDisplay].question}`;

  let optionsHtml = document.getElementById("answers");
  let options = pickedQuizzes[currentQuizToDisplay].options;
  optionsHtml.innerHTML= 
  `<button class="options">${options[0]}</button>
  <button class="options">${options[1]}</button>
  <button class="options">${options[2]}</button>`;            
  let answerBtns = document.getElementsByClassName("options");
  for (i of answerBtns) {
    i.addEventListener('click', tagPlayersAnswer);

    function tagPlayersAnswer(event){//Tags player answer with ID="player-answer"
      this.setAttribute('id', 'player-answer');
      checkAnswer(pickedQuizzes, answerBtns, playerInfo);
      }
    }
}

//////////////////////// FUNCTION THAT CHECK PLAYER'S ANSWER

function checkAnswer(pickedQuizzes, answerBtns, playerInfo){
  let feedbackHtml = document.getElementById("answer-feedback");
  let selectedAnswer = document.getElementById('player-answer');
  let correctAnswer = pickedQuizzes[currentQuizToDisplay].correctAnswer;
  let correctAnswerHtml;
  for (option of answerBtns){
    if (option.textContent.includes(correctAnswer)){
      correctAnswerHtml=option;
    }
  }
  selectedAnswer.style.color="black";
  if (selectedAnswer.textContent == correctAnswer){
    correctAnswerHtml.innerHTML = `${correctAnswer} <i class="fa-solid fa-check"></i>`;
    feedbackHtml.innerHTML= `Bravo '${correctAnswer}' is the correct answer!`;
    scoreHtml.innerHTML= `${addPoints(playerInfo)}`;
    nextQuizBtn.addEventListener('click', displayQuiz); 

  } else {
    correctAnswerHtml.innerHTML = `${correctAnswer} <i class="fa-solid fa-check"></i>`;
    selectedAnswer.innerHTML = `${selectedAnswer.textContent} <i class="fa-solid fa-x"></i>`;

    feedbackHtml.innerHTML= `Sorry '${correctAnswer}' is the correct answer!`;
    nextQuizBtn.addEventListener('click', displayQuiz); 
  }
}
//////////////////////// FUNCTION THAT SWITCHES BETWEEN START AND GAME WINDOW

function switchWindows(event){
  event.preventDefault();
  startWindow.style.display="none";
  questionWindow.style.display= "inline";
}

//////////////////////// FUNCTION THAT SAVES PLAYER INFORMATION

function savePlayerInfo(){
  let playerObject={};
  let playerName = document.getElementById("player-name");
  for (const option of difficultyOptions) {
      if (option.checked) {
          selectedSize = option.value;
          break;
      }
    }
  playerObject.difficulty=selectedSize;
  playerObject.name = playerName.value;
  return playerObject;
  }

 //////////////////////// SCORE BUILDING FUNCTION

  function addPoints(playerInfo){
    let currentScore = parseInt(scoreHtml.textContent);
    if (playerInfo.difficulty == 'basic'){
      currentScore += 5;
    } else if (playerInfo.difficulty == 'moderate'){
      currentScore += 10;
    } else {
      currentScore += 15;
    };
    return currentScore;
  }

//////////////////////// QUESTION NUMBER INCREMENTING FUNCTION
function updateQuestionNumber(){
  let currentQuestionNumber = parseInt(questionNumberHtml.textContent);
  questionNumberHtml.innerHTML=  `${currentQuestionNumber += 1}`;
}