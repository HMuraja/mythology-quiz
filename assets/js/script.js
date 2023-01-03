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

/*Generate a list of random questions*/
function generateQuestionList(gameLevel){
  let questionOptions=selectList(gameLevel);
  let questionSelector=[];
  let selectedQuestions=[];
  for (let i=0; i < 3; i++){
    let number = Math.floor(Math.random() * 7);
    while (questionSelector.includes(number)){
      number = Math.floor(Math.random() * 7)
    }
    questionSelector.push(number);
  }
  for (let selection of questionSelector){
    selectedQuestions.push(questionOptions[selection]);
  }
  return selectedQuestions;
}
/*Retrieve the quiz array based on game level selected*/
function selectList(gameLevel){
  let list;
  if (gameLevel=='basic'){
    list=basicQuestions;
  }
  else if (gameLevel=='moderate'){
    list=moderateQuestions;
  }
  else if (gameLevel=='challenging'){
    list=challengingQuestions;
  }return list;
}

/*Game window references*/
const startWindow= document.getElementById("start-container");
const questionWindow = document.getElementById("question-container");
const startForm = document.getElementById("start-form");
const difficultyOptions = document.querySelectorAll("input[name='quiz-difficulty']");


/*Event listeners that initiates the game after game difficulty and username has been submitted*/
startForm.addEventListener('submit', startQuiz);

/*Game function*/
function startQuiz(event){
  event.preventDefault();
  loadQuiz(event);
  let playerInfo=savePlayerInfo();
  let questionList=generateQuestionList(playerInfo.difficulty);
}

/*Function hides start window and opens the quiz window*/
function loadQuiz(event){
  event.preventDefault();
  startWindow.style.display="none";
  questionWindow.style.display= "inline";
}

/*Function to save player information post submission*/
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
