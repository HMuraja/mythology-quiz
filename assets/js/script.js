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