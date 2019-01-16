$(document).ready(function () {


  // VARIABLES
  // -------------
  // holds the number of right and wrong answers to display at the end of the game
  var rightAnswer = 0;
  var wrongAnswer = 0;
  // stores url for retrieving trivia questions
  var queryURL = 'https://opentdb.com/api.php?amount=10&category=20&type=multiple';
  var correct_answer;
  var playButton = $('#playButton');



  // SHUFFLE THE ELEMENTS IN THE ANSWER ARRAY
  // --------------------------------------------------------
  var shuffleAnswers = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  };

  // CREATE A TIMER 
  // ---------------
  var timeLeft = 20;
  var timeSet = setInterval(function () {
    // display the countdown
    $('#timeCountdown').html = --timeLeft;
    // if time runs out stop the timer and display message
    if (timeLeft <= 0) {
      clearInterval(timeSet);
      $('#messageLog').html("Out of time! The correct answer is " + correct_answer);
      // add next question button
      $("#nextButton").append(`<button type="button" class="btn btn-dark">${"next question"}</button><br></br>`)
    }
  }, 1000 * 2);

  // RETRIEVE A SET OF QUESTIONS FROM THE API
  // --------------------------------------------
  var startGame = function (url) {
    $.ajax({
      url: url,
      method: "GET"
    }).then(function (response) {
      createBoxes(response);
      console.log(response);
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
    // display question in html
    $("#quizQuestion").html(res.results[0].question);
    // set timer

    // shuffle the array
    shuffleAnswers(allAnswers);
    // loop through the array of answers to create a button for each
    for (var i = 0; i < allAnswers.length; i++) {
      $(".multiChoice").append(`<button type="button" class="btn btn-outline-light answerBtn">${letters[i]}</button><span id="answerA">${allAnswers[i]}</span><br></br>`)
      console.log(allAnswers[i]);
    };
  }

  // START THE QUIZ
  // -----------------
  playButton.on('click', function () {
    startGame(queryURL);
    playButton.hide();
    console.log('start');
  });

  // CHECK IF CHOSEN ANSWER IS CORRECT  (this doesn't work yet because I need to define the correct answer)
  // ----------------------------------
  $("body").on("click", ".answerBtn", function () {
    selectedAnswer = $('this').text();
    if (selectedAnswer === correct_answer) {
      rightAnswer++
      console.log('Correct!')
      $('#messageLog').html("Yes! You're right!");
      //add next question button
      $("#nextButton").append(`<button type="button" class="btn btn-dark">${"next question"}</button><br></br>`)
    } else {
      wrongAnswer++
      console.log('Nope!');
      $('#messageLog').html("Nope! The correct answer is " + correct_answer);
      //add next question button
      $("#nextButton").append(`<button type="button" class="btn btn-dark">${"next question"}</button><br></br>`)
    };
  });






  // NEXT QUESTION NEEDS TO RUN THROUGH ARRAY
  // var nextQuestion = function (array) {
  //   $('.changeText').empty();
  // move to next index in array of 10 questions
  // }

  // END OF GAME
  // After 10 questions display the final results
  // display number of correct answers and incorrect answers
  // $('.changeText').empty();

  // Ask if user wants to play again







});