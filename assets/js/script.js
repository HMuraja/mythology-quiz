// GLOBAL DEFINITIONS
const startWindow= document.getElementById("start-container");
const questionWindow = document.getElementById("question-container");
const finishWindow= document.getElementById("finish-container");
const startForm = document.getElementById("start-form");
const difficultyOptions = document.querySelectorAll("input[name='quiz-difficulty']");
const nextQuestionBtn = document.getElementById("next-quiz");
const answerFeedback = document.getElementById("answer-feedback");
const scoreHtml = document.getElementById("score");
const questionNumberHtml = document.getElementById("question-number");
const timeLeft = document.getElementById("time-left");
const questionHtml = document.getElementById("question");
const optionsHtml = document.getElementById("answers");
const answerBtns = document.getElementsByClassName("options");
const feedbackHtml = document.getElementById("answer-feedback");
const totalScoreHtml = document.getElementById("score-feedback");
const returnToStart = document.getElementById("return-start");

/*Event listeners that initiates the game after game difficulty and username has been submitted*/
let questionNumber = 0;
let playerScore = 0;
let playerInfo;
let pickedQuestionArray;


document.addEventListener("DOMContentLoaded", loadStartWindow);

function loadStartWindow(){
  finishWindow.style.display="none"
  startWindow.style.display="inline"
  startForm.addEventListener('submit', setUpQuiz);
}

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

//////////////////////// FUNCTION THAT RETRIEVES THE QUIZ ARRAY FOR THE DIFFICULTY

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


//////////////////////// DOWLOAD QUESTIONS

function setUpQuiz(event){
  event.preventDefault();
  playerInfo = savePlayerInfo();
  pickedQuestionArray = getThreeRandomQuestions();
  switchWindows(event);
  displayQuiz();
}

function displayQuiz(){

  updateQuestionNumberHtml();
  
  feedbackHtml.innerHTML= ``;//clear the feed-back section after previous question
  
  questionHtml.innerHTML = pickedQuestionArray[questionNumber].question;

  let answerOptions = pickedQuestionArray[questionNumber].options;
  optionsHtml.innerHTML= 
    `<button class="options">${answerOptions[0]}</button>
    <button class="options">${answerOptions[1]}</button>
    <button class="options">${answerOptions[2]}</button>`;
  
  for (i of answerBtns) {
      
    
    i.addEventListener('click', tagPlayersAnswer);
      function tagPlayersAnswer(event){//Tags player answer with ID="player-answer"
        this.setAttribute('id', 'player-answer');
        checkAnswer();}
  } 
}

//////////////////////// FUNCTION THAT CHECK PLAYER'S ANSWER
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
    feedbackHtml.innerHTML= `Bravo '${correctAnswer}' is the correct answer!`;
    addPoints();
    scoreHtml.innerHTML= playerScore;
    questionNumber++;
    if (questionNumber == pickedQuestionArray.length){
      nextQuestionBtn.addEventListener('click', displayFinalWindow);} 
    else{
    nextQuestionBtn.addEventListener('click', displayQuiz);}
  } 
  
  else {
    correctAnswerHtml.innerHTML = `${correctAnswer} <i class="fa-solid fa-check"></i>`;
    selectedAnswer.innerHTML = `${selectedAnswer.textContent} <i class="fa-solid fa-x"></i>`;
    feedbackHtml.innerHTML= `Sorry '${correctAnswer}' is the correct answer!`;
    nextQuestionBtn.addEventListener('click', displayQuiz);
    questionNumber++;
    if (questionNumber == pickedQuestionArray.length){
      nextQuestionBtn.addEventListener('click', displayFinalWindow);} 
    else{
    nextQuestionBtn.addEventListener('click', displayQuiz);}
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

//////////////////////// QUESTION NUMBER INCREMENTING FUNCTION
function updateQuestionNumberHtml(){
  let currentQuestionNumber = parseInt(questionNumberHtml.textContent);
  let nextQuestionNumber = currentQuestionNumber += 1;
  questionNumberHtml.innerHTML= nextQuestionNumber;
  return nextQuestionNumber;
}

///////////////////////// DISPLAY FINISH WINDOW

function displayFinalWindow(){
  questionWindow.style.display= "none";
  finishWindow.style.display = "inline";
  totalScoreHtml.innerHTML = `Your total score is ${playerScore} points!`;
  zeroScoreAndQuestionNo();
  returnToStart.addEventListener('click', loadStartWindow);
}

function zeroScoreAndQuestionNo(){
  questionNumber = 0;
  playerScore = 0;
  playerInfo= undefined;
  return;}