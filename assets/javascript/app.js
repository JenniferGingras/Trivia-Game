$(document).ready(function () {


  // Variables
  // API properties 'question' 'correct_answer' 'incorrect_answers'



  // holds the number of right and wrong answers to display at the end of the game
  var rightAnswer = 0;
  var wrongAnswer = 0;


  // FUNCTION THAT SHUFFLES THE ELEMENTS IN THE ANSWER ARRAY
  var shuffleAnswers = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  };

  // GETTING AND DISPLAYING THE QUESTION AND ANSWERS FROM THE API
  // --------------------------------------------------------------
  // stores url for retrieving trivia questions
  var pulledQuestions = 'https://opentdb.com/api.php?amount=1&category=20&type=multiple';
  // will store the correct and incorrect answers so that they can be shuffled into new positions each time
  var answerArr = [];
  // retrieve one question from the API
  $.ajax({
    url: pulledQuestions,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // STORE RETRIEVED DATA IN VARIABLES
    // the trivia question
    console.log(response.results[0].question);
    var triviaQuestion = response.results[0].question;
    // display the question
    $('#quizQuestion').html(triviaQuestion)
    // the correct answer
    console.log(response.results[0].correct_answer);
    var correctAnswer = response.results[0].correct_answer;
    // put correct answer into answerArr
    answerArr.push(correctAnswer)
    // the incorrect answers (are in an array of 3)
    // console.log(response.results[0].incorrect_answers);
    // store the data of each index in the inccorect answer array in its own variable
    var incorrectAnswer1 = response.results[0].incorrect_answers[0];
    var incorrectAnswer2 = response.results[0].incorrect_answers[1];
    var incorrectAnswer3 = response.results[0].incorrect_answers[2];
    console.log(response.results[0].incorrect_answers[0]);
    console.log(response.results[0].incorrect_answers[1]);
    console.log(response.results[0].incorrect_answers[2]);
    // put incorrect answers into answerArr
    answerArr.push(incorrectAnswer1, incorrectAnswer2, incorrectAnswer3);
    // call the function to shuffle the elements in the array
    shuffleAnswers(answerArr);
    console.log(answerArr);
    // display answers in list
    $('#answerA').html(answerArr[0]);
    $('#answerB').html(answerArr[1]);
    $('#answerC').html(answerArr[2]);
    $('#answerD').html(answerArr[3]);
  });

  // make answers clickable 
  // set a timer

  // QUESTION PROCESS
  // The question process will loop 10 times
  // display one question
  // display one set of multiple choice answers
  // Set timer to countdown from 10 seconds
  // if correct answer is chosen display message "You're right! the answer is (correct answer)"
  // if inccorent answer is chosen display message "Good try, but the answer is (correct answer)"
  // if time runs out dispaly message "Out of time! the answer is (correct answer)"
  // wait a few seconds and then display next question

  // END OF GAME
  // After 10 questions display the final results
  // dispaly number of correct answers and incorrect answers
  // Ask if user wants to play again







});