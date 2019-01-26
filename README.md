# Trivia Game

This is a game in which the player will take a quiz of 10 timed questions.

## The game will include:

* A start button
* A next question button
* Gameplay instructions
* Dynamically created questions and answer buttons that appear at game start and when the next question button is clicked
* A countdown timer
* A final page which displays correct and incorrect results

## Functionality:

* Clickable buttons that cause events to happen on the DOM
* Questions pulled from a trivia API and displayed on the page
* Dynamically created multiple choice buttons created from the answers pulled from the API
* A message if the user's answer is correct or incorrect after they choose one of the multiple choice buttons
* Correct and incorrect answers are counted during gameplay
* The timer counts down and resets for each question
* Final tally of correct and incorrect answers is displayed at the end of the quiz

## How the game works

When the player clicks 'start', 10 questions will be pulled from a trivia API. 
* The first question will be displayed.
* Four buttons will be displayed with the four multiple choice answers.
* A timer will start counting down the time the user has left to answer.

When the player clicks one of the answer buttons, their choice will be matched against the correct answer.
* If the choice is correct - a message displays telling the user that they are correct.
* If the choice is incorrect - a message displays telling the user that they are incorrect and giving them the correct answer.
* The 'next question' button appears

If the player doesn't answer before the timer runs out, a message displays that they have run out of time and the 'next question' button appears.

After ten questions are answered the final results of the correct and incorrect answers are displayed.

A 'play again' button will allow the user to access 10 more questions and take another quiz.

#### current code issues

correct_answer compares only first word of answer - so answers with more than one word come up as incorrect


Find my version here:
https://jennifergingras.github.io/Trivia-Game/
