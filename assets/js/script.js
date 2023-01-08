// GLOBAL VARIABLES

//Get HTML
const startWindow= document.getElementById("start-window");
const questionWindow = document.getElementById("question-window");
const finishWindow= document.getElementById("finish-window");

const startForm = document.getElementById("start-form");
const difficultyOptions = document.querySelectorAll("input[name='quiz-difficulty']");

const questionNumberHtml = document.getElementById("question-number");
const optionsHtml = document.getElementById("display-text");
const answerBtns = document.getElementsByClassName("answers");
const nextQuestionBtn = document.getElementById("next-question");
const finishGameBtn = document.getElementById("finish-game");
const scoreHtml = document.getElementById("score");
const timeLeft = document.getElementById("time-left");

const totalScoreHtml = document.getElementById("score-feedback");
const returnToStart = document.getElementById("return-start");

//Global variables for the game
let questionNumber = 0;
let playerScore = 0;
let playerInfo;
let pickedQuestionArray;

//GAME INITIATING EVENT LISTENER
document.addEventListener("DOMContentLoaded", loadStartWindow);

//FUNCTION FOR DROPDOWN MENU
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu bar icon */
function dropMenu() {
  var headerLinks = document.getElementById("hidden-menu");
  var menuDrop= document.getElementById("menu-drop");
  var stack= document.getElementById("stack-icon")
  if (headerLinks.style.display === "block") {
    headerLinks.style.display = "none";
    stack.innerHTML = `<i class="fa-solid fa-bars grey-on-beige"></i>`;
  } else {
    headerLinks.style.display = "block";
    stack.innerHTML = `<i class="fa-solid fa-x grey-on-beige"></i>`;
      }
}

//GAME FUNCTIONS

//*Function ensure start window is displayed, submit-eventlistener trigger quiz-set-up
function loadStartWindow(){
  finishWindow.style.display="none"
  startWindow.style.display="inline"
  startForm.addEventListener('submit', setUpQuiz);
}

// Function gathers data for running the selected quiz before triggering quiz display
function setUpQuiz(event){
  event.preventDefault();
  playerInfo = savePlayerInfo();
  pickedQuestionArray = getThreeRandomQuestions();
  switchWindows(event);
  displayQuiz();
}

//Function gathers playerdata(name and difficulty) and store it in playerinfo object
function savePlayerInfo(){
  let playerObject={};
  let playerName = document.getElementById("player-name");
  for (let option of difficultyOptions) {
      if (option.checked) {
          selectedSize = option.value;
          break;
      }
    }
  playerObject.difficulty=selectedSize;
  playerObject.name = playerName.value;
  return playerObject;
  }

  //Function uses playerinfo object to check game difficulty

function getAllQuestionsOfDifficulty(){
  let selectedQuestions;
  if (playerInfo.difficulty=='basic'){
    selectedQuestions=basicQuestions;
  }
  else if (playerInfo.difficulty=='moderate'){
    selectedQuestions=moderateQuestions;
  }
  else if (playerInfo.difficulty=='challenging'){
    selectedQuestions=challengingQuestions;
  }return selectedQuestions;
}

//Function uses gets three random questions from the pool of selected questions
function getThreeRandomQuestions(){
  let allQuestions = getAllQuestionsOfDifficulty();
  let selectedIndexes = [];
  let selectedQuestions = [];
  for (let i=0; i < 3; i++){
    let number = Math.floor(Math.random() * 7);
    while (selectedIndexes.includes(number)){
      number = Math.floor(Math.random() * 7)
    }
    selectedIndexes.push(number);
  }
  for (let i of selectedIndexes){
    selectedQuestions.push(allQuestions[i]);
  }
  return selectedQuestions;
}

//Function switches from start window to quiz window
function switchWindows(event){
  event.preventDefault();
  startWindow.style.display="none";
  questionWindow.style.display= "inline";
}

//Function displays question from the array generated based on the questionNumber variable
//click eventlistener activates check answer once player has chosen their selection
function displayQuiz(){
  nextQuestionBtn.style.display= 'hidden';
  questionNumberHtml.innerHTML= updateQuestionNumberHtml();
  let quizQuestionText = pickedQuestionArray[questionNumber].question;
  let answerOptionsText = pickedQuestionArray[questionNumber].options;
  optionsHtml.innerHTML= 
    `<p id="quiz-question" class="raised-box grey-on-beige">${quizQuestionText}</p>
    <button class="answers raised-box o-hover beige-on-grey">${answerOptionsText[0]}</button>
    <button class="answers raised-box o-hover beige-on-grey">${answerOptionsText[1]}</button>
    <button class="answers raised-box o-hover beige-on-grey">${answerOptionsText[2]}</button>`;
  
  for (i of answerBtns) {
    i.addEventListener('click', tagPlayersAnswer);
      function tagPlayersAnswer(event){//Tags player answer with ID="player-answer"
        this.setAttribute('id', 'player-answer');
        checkAnswer();}
  } 
}

//Function updates question number
function updateQuestionNumberHtml(){
  let currentQuestionNumber = parseInt(questionNumberHtml.textContent);
  let nextQuestionNumber = currentQuestionNumber += 1;
  questionNumberHtml.innerHTML= nextQuestionNumber;
  return nextQuestionNumber;
}

//Function checks players answer and provides feed back for the player
//Points are increased if correct answer is selected
//Questionnumber variable is incresed and checked incase array is finished, if finised finish flag is diplayed
// Listens for next question click to display next question

function checkAnswer(){
  let selectedAnswer = document.getElementById("player-answer");
  let correctAnswer = pickedQuestionArray[questionNumber].correctAnswer;
  let correctAnswerHtml;

  for (option of answerBtns){
    if (option.textContent.includes(correctAnswer)){
      correctAnswerHtml=option;
    }}

  selectedAnswer.style.color="black";

  if (selectedAnswer.textContent == correctAnswer){
    correctAnswerHtml.innerHTML = `${correctAnswer} <i class="fa-solid fa-check"></i>`;
    addPoints();
    scoreHtml.innerHTML= playerScore;
    if (questionNumber == pickedQuestionArray.length){
      finishGameBtn.style.display= 'inline';
      finishGameBtn.addEventListener('click', displayFinalWindow);} 
    else{
      nextQuestionBtn.style.display= 'inline';
      nextQuestionBtn.addEventListener('click', displayQuiz);}
  } 
  
  else {
    correctAnswerHtml.innerHTML = `${correctAnswer} <i class="fa-solid fa-check"></i>`;
    selectedAnswer.innerHTML = `${selectedAnswer.textContent} <i class="fa-solid fa-x"></i>`;
    nextQuestionBtn.addEventListener('click', displayQuiz);
    if (questionNumber == pickedQuestionArray.length){
      finishGameBtn.style.display= 'inline';
      finishGameBtn.addEventListener('click', displayFinalWindow);} 
    else{
      nextQuestionBtn.style.display= 'inline';
      nextQuestionBtn.addEventListener('click', displayQuiz);}
  }
}

//Function increases score according to the selected difficulty
  function addPoints(){
    if (playerInfo.difficulty == 'basic'){
      playerScore += 5;
    } else if (playerInfo.difficulty == 'moderate'){
      playerScore += 10;
    } else {
      playerScore += 15;
    };
    return;
  }


// Function displays final window, providing player their total score, runs function to refresh game variables and loads start window after player clicks the icon
function displayFinalWindow(){
  questionWindow.style.display= "none";
  finishWindow.style.display = "inline";
  totalScoreHtml.innerHTML = `Your total score is ${playerScore} points!`;
  setValuesForNewGame();
  returnToStart.addEventListener('click', loadStartWindow);
}

// Functiion sets values for the new game
function setValuesForNewGame(){
  questionNumber = 0;
  playerScore = 0;
  playerInfo = undefined;
  pickedQuestionArray = undefined;
  finishGameBtn.style.display = 'none';
  startForm.reset(); //https://www.w3schools.com/jsref/met_form_submit.asp
}