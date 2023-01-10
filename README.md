# **Greek Mythology Quiz - Project Portfolio 2 - JavaScript**

"Greek Mythology Quiz" is and online quiz for anyone curious to test their knowledge or learn more about Greek Mythology. Player can choose the question difficulty from three cathegories: basic, moderate and chanllenging. 

Once the player has entered a name and chosen a question cathegory, they can click the play button and the game will start. Quiz consists of 5 questions that are generated randomly from the chosen difficulty pool. Each question will be given 3 answer options. Each right answer will increase the points. More difficult the question, more point it generates.

Once the quiz is over the player will be given the final score and a choice to play again. Game can be played multiple times as questions are always generated randomly.

Link to the quiz is [here.](https://hmuraja.github.io/mythology-quiz/)

![Am I responsive Image](assets/readme-media/am-i-responsive.png)

# Features

## Header
Contains the title of the game, this also acts as a "homing" button. This title is always visible and can be clicked at any point and it will return the user to the beginning of the game.
![Header Image](assets/readme-media/header.png)
## Start Window
Start window is visible first thing when page is loaded. Start window has a title "start" and 3 buttons presenting the three difficulty levels to choose from. Player is requested to enter their name in the field stating "Enter name" andthe play button on the bottom of the window starts the game. Game can only be started after name and difficulty levels have been chosen.

![Header Image](assets/readme-media/start-window.png)
## Question Window
Once play button is pressed th efirst questioin is displayed on the question window.This window has three sections: top, middle and bottom. Top section indicates the question number that the player is currently on. 

Middle part has the question and three clickable answer buttons.Once an answer has been selected, a green tick will appear next to the correct answer button. If player has chosen wrong answer a red "x" icon will display next to the selection.  

Bottom section displays the score player has accumulated and a "move-on" button. Move on button displays only after one of the answer options has been selected. Move-on button is an arrow button that displays the next question once clicked, once all 5 questions have been exhausted, button will change into a checkered flag. This button will display the finish window once clicked.

![Question Start Window](assets/readme-media/question-window.png) ![Correct Answer](assets/readme-media/correct-answer.png) ![Wrong Answer](assets/readme-media/Screenshot%202023-01-10%20064745.png)


## Finish Window
This is the last wndow of the game and states "Finish!" at the top, the score in the middle and and return arrow at the bottom. Score displayes is a sum of all the points gotten from the quiz. Once the return button, which is a circling arrow, is clicked it will return the the start window to the view. A new game is started just like explained in the beginning.

![Finish Window](assets/readme-media/finish-window.png)
## Footer

Footer has two links: one to this projects GitHub page and to the authors Linkedin profile.

![Footer](assets/readme-media/socialmedia-links.png)

# Testing

## HTML Validator
HTML validator was ran twice. On the initial run, 7 misuses of Aria-labels where flagged. Aria-labels were removed or replaced more appropriate attribute. On the second run no errors occurred.

## CSS Validator
HTML validator was ran twice. On the initial run, 7 misuses of Aria-labels where flagged. Aria-labels were removed or replaced more appropriate attribute. On the second run no errors occurred.

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your project’s features and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

Validator Testing
HTML
No errors were returned when passing through the official W3C validator
CSS
No errors were found when passing through the official (Jigsaw) validator
JavaScript
No errors were found when passing through the official Jshint validator
The following metrics were returned:
There are 11 functions in this file.
Function with the largest signature takes 2 arguments, while the median is 0.
Largest function has 10 statements in it, while the median is 3.
The most complex function has a cyclomatic complexity value of 4 while the median is 2.

## Bugs
## Validator Testing
## Unfixed Bugs

## Deployement History

## Credits
---
### Content 
- Questions for this quiz where taken from [trivialbliss.](https://triviabliss.com/categories/greek-mythology/)
- Icons where taken from [fontawesome.](www.fontawesome.com)
- All images have been taken from [pexels.](https://www.pexels.com/)
- Fonts are from [Google Fonts.](https://fonts.google.com/)
- Radio buttons circles were removed and replaced with the label text by using the code found from [markheat.net](https://markheath.net/post/customize-radio-button-css) website.
- Changed start game pages submit button to icon button using the code with alteration from stack [overflow](https://stackoverflow.com/questions/30837216/replacing-submit-buttons-with-icon-basics).
### Media 