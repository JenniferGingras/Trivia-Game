$(document).ready(function () {

  // VARIABLES
  // =============
  var timeSet;
  var indexQ = 0;
  // holds the number of right and wrong answers to display at the end of the game
  var rightAnswer = 0;
  var wrongAnswer = 0;
  // stores url for retrieving trivia questions
  var queryURL = 'https://opentdb.com/api.php?amount=10&category=20&type=multiple';
  // links to html elements
  var playButton = $('#playButton');
  var nextButton = $("#nextButton");
  var message = $('#messageLog');
  var multiChoice = $('.multiChoice');
  var quizQuestion = $('#quizQuestion');
  // holds the data being pulled from API
  var correct_answer;
  var triviaArr = [];

  // FUNCTIONS
  // =================

  // STOP THE TIMER
  // ----------------------
  function stopTimer() {
    clearInterval(timeSet);
  }

  // CREATE A TIMER 
  // ---------------
  function countDown() {
    var timeLeft = 20;
    timeSet = setInterval(function () {
      // display the countdown
      $('#timeCountdown').text('Time Left: ' + --timeLeft);
      // if time runs out stop the timer and display message
      if (timeLeft <= 0) {
        stopTimer();
        message.html("Out of time! The correct answer is " + correct_answer);
        // show next question button
        nextButton.show();
      };
    }, 1000 * 2);
  };

  // SHUFFLE THE ELEMENTS IN THE ANSWER ARRAY
  // --------------------------------------------------------
  var shuffleAnswers = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  };

  // DISPLAY THE QUESTION AND ANSWERS
  // -----------------------------------
  var letters = ["A", "B", "C", "D"]
  var createBoxes = function (triviaArr) {
    correct_answer = triviaArr.results[indexQ].correct_answer;
    // put answers into one array
    let allAnswers = triviaArr.results[indexQ].incorrect_answers
    allAnswers.push(triviaArr.results[indexQ].correct_answer)
    console.log(allAnswers);
    // display question in html
    quizQuestion.html(triviaArr.results[indexQ].question);
    // set timer
    countDown();
    // shuffle the array
    shuffleAnswers(allAnswers);
    // loop through the array of answers to create a button for each
    for (var i = 0; i < allAnswers.length; i++) {
      multiChoice.append(`<button type="button" class="btn btn-outline-light answerBtn" data-answer=${allAnswers[i]}>${letters[i]}</button><span id="answerA">${allAnswers[i]}</span><br></br>`)
      console.log(allAnswers[i]);
    };
  }

  // CLEAR THE ANSWER BUTTONS
  // -------------------------
  var clearAnswers = function () {
    multiChoice.empty();
    message.empty();
    quizQuestion.empty();
  }

  // RETRIEVE A SET OF QUESTIONS FROM THE API
  // --------------------------------------------
  var startGame = function (url) {
    $.ajax({
      url: url,
      method: "GET"
    }).then(function (response) {
      createBoxes(response);
      triviaArr = response;
      console.log(response);
    });
  }

  // CHECK IF CHOSEN ANSWER IS CORRECT 
  // ----------------------------------
  $("body").on("click", ".answerBtn", function () {
    stopTimer();
    nextButton.show();
    selectedAnswer = $(this).attr("data-answer");
    console.log(selectedAnswer);
    if (selectedAnswer === correct_answer) {
      rightAnswer++
      console.log(rightAnswer)
      message.html("Yes! You're right!");
    } else {
      wrongAnswer++
      console.log(wrongAnswer);
      message.html("Nope! The correct answer is " + correct_answer);
    };
  });

  // END OF GAME
  // --------------
  var gameEnd = function () {
    nextButton.hide();
    $('#finalResults').text("You're done! How did you do?");
    // display number of correct answers and incorrect answers
    $('#correctResults').html(rightAnswer + " Correct");
    $('#incorrectResults').html(wrongAnswer + " Incorrect");
    // Ask if user wants to play again
    message.html('Want to try again?');
    playButton.show();
  }


  // THE GAME PLAY 
  // ===============

  // START THE QUIZ
  // -----------------
  playButton.on('click', function () {
    startGame(queryURL);
    playButton.hide();
    console.log('start');
  });

  // NEXT QUESTION
  // ------------------------------------------
  $("body").on("click", ".nextButton", function () {
    clearAnswers();
    // move to next index in array of 10 questions
    indexQ++;
    if (indexQ <= 9) {
      createBoxes(triviaArr);
    } else {
      gameEnd();
    }
  });

});

// NEED TO FIX
// --------------
// Does not display # of correct and incorrect answers at the end - they display in console
// correct_answer compares only first word of answer - so answers with more than one word come up as incorrect