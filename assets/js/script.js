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

  /*event listener for radio selection*/
  function generateQuestionList(listItem){
    selectedDifficulty= listItem;
    questionSelector=[]
    for (let i=0; i < 3; i++){
      questionSelector.push = Math.floor(Math.random() * 8);
      console.log(questionSelector)
    }
  }