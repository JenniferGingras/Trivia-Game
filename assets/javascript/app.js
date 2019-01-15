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
  var triviaQuestion;
  // var triviaArr = response.results;

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


  startGame(queryURL);

  var letters = ["A", "B", "C", "D"]
  var createBoxes = function (res) {
    let allAnswers = [];
    allAnswers.push(res.results[0].correct_answer)
    allAnswers.push(res.results[0].incorrect_answers);
    console.log(`Here are the answers: ${allAnswers[0]}`);
    $("#quizQuestion").text(res.results[0].question);
    for (var i = 0; i < allAnswers.length; i++) {
      $(".multiChoice").append(`<button type="button" class="btn btn-outline-light answerBtn">${letters[i]}</button><span id="answerA">${allAnswers[i]}</span><br></br>`)
      console.log(allAnswers[i]);
    }


    var array = ["Answer", "ANswer", "answer", "ans"]
  }

  $("body").on("click", ".answerBtn", function () {
    console.log("Heeeeeyyy")
  })

  var i = 0;
  // STORE RETRIEVED DATA IN VARIABLES
  // // the trivia question
  // console.log(response.results[i].question);
  // triviaQuestion = response.results[i].question;

  // // the correct answer NEEDS TO BE OUTSIDE FUNCTION 
  // console.log(response.results[i].correct_answer);
  // correctAnswer = response.results[i].correct_answer;
  // // put correct answer into answerArr
  // answerArr.push(correctAnswer)
  // // the incorrect answers (are in an array of 3)
  // console.log(response.results[i].incorrect_answers);
  // // store the data of each index in the inccorect answer array in its own variable
  // var incorrectAnswer1 = response.results[i].incorrect_answers[0];
  // var incorrectAnswer2 = response.results[i].incorrect_answers[1];
  // var incorrectAnswer3 = response.results[i].incorrect_answers[2];
  // // put incorrect answers into answerArr
  // answerArr.push(incorrectAnswer1, incorrectAnswer2, incorrectAnswer3);
  // //  call the function to shuffle the elements in the array
  // shuffleAnswers(answerArr);
  // console.log(answerArr);


  //  display answers in list
  $('#quizQuestion').html(triviaQuestion)
  $('#answerA').html(answerArr[0]);
  $('#answerB').html(answerArr[1]);
  $('#answerC').html(answerArr[2]);
  $('#answerD').html(answerArr[3]);


  // check if chosen answer is correct
  answerBtn.on('click', function (event) {
    console.log(event);
    selectedAnswer = $('this').text();
    if (selectedAnswer === correct_answer) {
      rightAnswer++
      console.log('Correct!')
    } else {
      wrongAnswer++
      console.log('Nope!');
      $('#messageLog').html("Good try! The correct answer is " + correct_answer);
    };
  });



  // set a timer to countdown for each question
  // if time runs out dispaly message "Out of time! the answer is (correct answer)"
  // wait a few seconds and then display next question


  // next question
  // $('#nextQuestion').on('click', function (event) {

  // })

  // END OF GAME
  // After 10 questions display the final results
  // dispaly number of correct answers and incorrect answers
  // Ask if user wants to play again







});