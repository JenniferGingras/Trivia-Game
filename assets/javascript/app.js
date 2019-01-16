$(document).ready(function () {


  // VARIABLES
  // -------------
  // holds the number of right and wrong answers to display at the end of the game
  var rightAnswer = 0;
  var wrongAnswer = 0;
  // stores url for retrieving trivia questions
  var queryURL = 'https://opentdb.com/api.php?amount=10&category=20&type=multiple';
  // will store the correct and incorrect answers so that they can be shuffled into new positions each time
  var answerArr = [];
  var btn = $(".btn");
  var selectedAnswer;
  var correct_answer;
  var questionCount = 0;


  // FUNCTION THAT SHUFFLES THE ELEMENTS IN THE ANSWER ARRAY
  // --------------------------------------------------------
  var shuffleAnswers = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  };

  // RETRIEVE A SET OF QUESTIONS FROM THE API
  // --------------------------------------------------------------
  var startGame = function (url) {
    $.ajax({
      url: url,
      method: "GET"
    }).then(function (response) {
      createBoxes(response)
    });
  }

  // DISPLAY THE QUESTION AND ANSWERS
  // -----------------------------------
  var letters = ["A", "B", "C", "D"]
  var createBoxes = function (res) {
    // put answers into one array
    let allAnswers = res.results[0].incorrect_answers
    allAnswers.push(res.results[0].correct_answer)
    console.log(allAnswers)
    // shuffle the array
    shuffleAnswers(allAnswers);
    // display question in html
    $("#quizQuestion").html(res.results[0].question);
    // loop through the array of answers to create a button for each
    for (var i = 0; i < allAnswers.length; i++) {
      $(".multiChoice").append(`<button type="button" class="btn btn-outline-light answerBtn">${letters[i]}</button><span id="answerA">${allAnswers[i]}</span><br></br>`)
      console.log(allAnswers[i]);
    };
  }

  // START THE QUIZ
  // -----------------
  $('#playButton').on('click', function () {
    startGame(queryURL);
    console.log('start');
  });

  // CHECK IF CHOSEN ANSWER IS CORRECT
  // ----------------------------------
  $("body").on("click", ".answerBtn", function () {
    selectedAnswer = $('this').text();
    if (selectedAnswer === correct_answer) {
      rightAnswer++
      console.log('Correct!')
      $('#messageLog').html("Yes! You're right!");
    } else {
      wrongAnswer++
      console.log('Nope!');
      $('#messageLog').html("Nope! The correct answer is " + correct_answer);
    };
  });


  // set a timer to countdown for each question
  // if time runs out dispaly message "Out of time! the answer is (correct answer)"
  // wait a few seconds and then display next question


  // next question
  var nextQuestion = function (event) {
    $('.dynamicText').empty();
    startGame(queryURL);
  }

  // END OF GAME

  // After 10 questions display the final results
  // dispaly number of correct answers and incorrect answers
  // Ask if user wants to play again







});