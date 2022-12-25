/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var headerLinks = document.getElementById("hidden-menu");
    var menuContainer= document.getElementById("menu-container");
    if (headerLinks.style.display === "block") {
      headerLinks.style.display = "none";
      menuContainer.style.backgroundColor = "beige";
    } else {
      headerLinks.style.display = "block";
      menuContainer.style.backgroundColor = "whitesmoke";    }
  }