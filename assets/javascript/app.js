// QUESTION ARRAY
var questions = [{
  question: "In what year was Pixar founded?",
  answers: ["1979", "1986", "1995", "2000"],
  correctAnswer: "1986",
  image: "assets/images/1.gif"
},{
  question: "Which tech mogul provided funding and became a co-founder of Pixar?",
  answers: ["Steve Jobs", "Bill Gates", "Peter Thiel", "Mark Zuckerberg"],
  correctAnswer: "Steve Jobs",
  image: "assets/images/2.gif"
},{
  question: "What was Pixar's first feature-length film that was released in 1995?",
  answers: ["Toy Story", "A Bug's Life", "Monster's Inc", "Finding Nemo"],
  correctAnswer: "Toy Story",
  image: "assets/images/3.gif"
},{
  question: "Who was the first Pixar character added to the Disney Princess line-up?",
  answers: ["Jessie", "Repunzel", "Merida", "Elsa"],
  correctAnswer: "Merida",
  image: "assets/images/4.gif"
},{
  question: "Who voiced Remy in 'Ratatouille'?",
  answers: ["David Cross", "Louis C.K.", "Tim Allen", "Patton Oswalt"],
  correctAnswer: "Patton Oswalt",
  image: "assets/images/5.gif"
},{
  question: "What fraternity does Mike Wazowski join in 'Monsters University'?",
  answers: ["Roar Omega Roar", "Sigma Fear Omega", "Oozma Kappa", "Alpha Scarems"],
  correctAnswer: "Oozma Kappa",
  image: "assets/images/6.gif"
},{
  question: "Which film won Pixar's first Academy Award for Best Animated Feature?",
  answers: ["Toy Story", "Finding Nemo", "Up", "Wall-E"],
  correctAnswer: "Finding Nemo",
  image: "assets/images/7.gif"
},{
  question: "Who voiced Lightning McQueen in 'Cars'?",
  answers: ["Adrien Brody", "Jason Schwartzman", "Owen Wilson", "Ben Stiller"],
  correctAnswer: "Owen Wilson",
  image: "assets/images/8.gif"
},{
  question: "Who voiced Sadness in 'Inside Out'?",
  answers: ["Amy Poehler", "Phyllis Smith", "Mindy Kaling", "Phyllis Vance"],
  correctAnswer: "Phyllis Smith",
  image: "assets/images/9.gif"
},{
  question: "Billy Crystal voices Mike Wazowski in 'Monster, Inc.', but what role did he originally turn down from Pixar?",
  answers: ["Hopper", "Woody", "Marlin", "Buzz Lightyear"],
  correctAnswer: "Buzz Lightyear",
  image: "assets/images/10.gif"
},{
  question: "On what planet was Wall-E stranded at the beginning of 'Wall-E'?",
  answers: ["Wall-E World", "Earth", "Mars", "Jupiter"],
  correctAnswer: "Earth",
  image: "assets/images/11.gif"
},{
  question: "The letter-number combination 'A113' can be found semi-hidden in every Pixar feature film. What does it refer to?",
  answers: ["Steve Jobs' First Car", "The First Pixar Short", "A Classroom", "A Top-Secret Project"],
  correctAnswer: "A Classroom",
  image: "assets/images/12.jpg"
},{
  question: "Name this food critic whose opinion held sway in 'Ratatouille.'",
  answers: ["Anton Ego", "Nolan Argo", "Aron Ergo", "Tony Angelo"],
  correctAnswer: "Anton Ego",
  image: "assets/images/13.gif"
},{
  question: "In 'The Good Dinosaur' how do Arlo and Spot start communicating?",
  answers: ["Just Regular Talking", "Sign Language", "Drawing Pictures", "A Gorilla-Like Body Language"],
  correctAnswer: "Drawing Pictures",
  image: "assets/images/14.gif"
},{
  question: "How many balloons are lifting Mr. Fredrickson's house?",
  answers: ["20,622", "10,246", "25,873", "12,345"],
  correctAnswer: "20,622",
  image: "assets/images/15.gif"
}];


// REUSABLE OBJECTS AND FUNCTIONS
var game = {
  questions: questions,
  currentQuestion: 0,
  counter: 30,
  correct: 0,
  incorrect: 0,
  unanswered: 0,

  countDown: function(){
    game.counter--;
    var coverted = game.timeConverter(game.counter);
    $('#counter').html(coverted);

    if(game.counter <= 0) {
      console.log("Time Up!");
      game.timeUp();
    }
  },

  loadQuestion: function() {
    timer = setInterval(game.countDown, 1000);
    var coverted = game.timeConverter(game.counter);
    $('#counter').html(coverted);

    // Load quesiton
    $('#wrapper').html('<h2>' + questions[game.currentQuestion].question + '</h2>');

    // Load answers
    for(var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
      $('#wrapper').append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
    }
  },

  nextQuestion: function(){
    game.counter = 30;
    var coverted = game.timeConverter(game.counter);
    $('#counter').html(coverted);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {
    clearInterval(timer);
    game.unanswered++;
    $('#wrapper').html("<h2>Out of time!</h2>");
    $('#wrapper').append('<h3>The answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    $('#wrapper').append('<img class="gif" src="'+questions[game.currentQuestion].image+'">');

    if(game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3*1000);
    } else {
      setTimeout(game.nextQuestion, 3*1000);
    }
  },

  results: function() {
    clearInterval(timer);
    $('#wrapper').html("<h2>All Done!</h2>");
    $('#wrapper').append('<h3>Correct: ' + game.correct + '</h3>');
    $('#wrapper').append('<h3>Incorrect: ' + game.incorrect + '</h3>');
    $('#wrapper').append('<h3>Unanswered: ' + game.unanswered + '</h3>');
    $('#wrapper').append('<button id="reset">RESET</button>')
  },

  clicked: function(e) {
    clearInterval(timer);
    if($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
      game.answerCorrectly();
    } else {
      game.answerIncorrectly();
    }
  },

  answerCorrectly: function() {
    console.log("You got it!");
    clearInterval(timer);
    game.correct++;

    $('#wrapper').html("<h2>Correct!</h2>");
    $('#wrapper').append('<img class="gif" src="'+questions[game.currentQuestion].image+'">');

    if(game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3*1000);
    } else {
      setTimeout(game.nextQuestion, 3*1000);
    }
  }, 

  answerIncorrectly: function() {
    console.log("Noooooooooo!");
    clearInterval(timer);
    game.incorrect++;
    $('#wrapper').html("<h2>Wrong!</h2>");
    $('#wrapper').append('<h3>The answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    $('#wrapper').append('<img class="gif" src="'+questions[game.currentQuestion].image+'">');

    if(game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3*1000);
    } else {
      setTimeout(game.nextQuestion, 3*1000);
    }
  },

  reset: function() {
    game.currentQuestion = 0;
    game.counter = 0;
    game.correct = 0;
    game.incorrect = 0;
    game.unanswered = 0;
    game.loadQuestion();
  },

  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  },
};


// MAIN PROCESS
$(document).ready(function() {

  $('#startBtn').click(function() {
      $(this).hide();
      $("#front-page-h1").hide();

      game.loadQuestion();
  });

  $(document).on('click', '.answer-button', function(e) {
      game.clicked(e);
  });

  $(document).on('click', '#reset', function(e) {
      game.reset();
  });
});



















// $(document).ready(function(){

//   $('#startBtn').click(function(){
    
//     $(this).hide();
//     $("#trivia").hide();

//     // Set Timer
//     var time = 31;
//     var timer;
    
//     timer = setInterval(count, 1000);

//     function count(){
//       time--;
//       $('#time-remain').html('Time Remaining: ' + time + ' seconds');
      
//       if(time == 0){
//         $('#content').html("<h2>Out of time!</h2><h3>The correct answer was: " + questionOne.options[2] + "</h3>");
//         var resultImg = $('<div>');
//         resultImg.html('<img src="assets/images/result-1.gif">');
//         resultImg.addClass('result-image');
//         $('#content').append(resultImg);

//         clearInterval(timer);
//       }
//     };

//     //Display questions and options
//     var questionOne = {
//       question : 'Which character mouths the words to the song in the opening credits?',
//       options : ['Ross', 'Phoebe', 'Rachel', 'Joey'],
//     };
    

//     var questionTwo = {
//       question : 'What is the name of Phoebe\'s most played song?',
//       options : ['Smelly Cat', 'Ode to a Pubic Hair', 'Two of Them Kissed Last Night', 'I\'ll Be There for You'],
//     };

//     var questionThree = {
//       question : 'Which of the following is not the name of an ex-boyfriend?',
//       options : ['Barry', 'Gunther', 'Fun Bobby', 'David'],
//     };

//     var questionArray = [questionOne, questionTwo, questionThree];
//     var questionArrayIndex = 0;
    

//     function displayQuestion(){
      
//       $('#question').html(questionArray[questionArrayIndex].question);

//         for (var i = 0; i < questionArray[questionArrayIndex].options.length; i++) {
//           var optionBtn = $('<button>');
//           optionBtn.val(questionArray[questionArrayIndex].options[i]);
//           optionBtn.addClass('option btn btn-default btn-lg btn-block');
//           optionBtn.text(questionArray[questionArrayIndex].options[i]);
//           $('#option-container').append(optionBtn);
//         }
//     }

//     function nextQuestion(){
//       questionArrayIndex++;
//       setTimeout(displayQuestion, 30000);

//       $('#options-container').empty();
      
//       optionBtn.val(questionArray[questionArrayIndex].options[i]);
//       optionBtn.addClass('option btn btn-default btn-lg btn-block');
//       optionBtn.text(questionArray[questionArrayIndex].options[i]);
//       $('#option-container').html(optionBtn);
//     }



//     function checkAnswer(){
//       $('.option').click(function(){

//         if ($(this).val() === questionOne.options[2]){
//           $('#content').html("<h2>You are right!</h2><h3>The correct answer was: " + questionOne.options[2] + "</h3>");
//           var resultImg = $('<div>');
//           resultImg.html('<img src="assets/images/result-1.gif">');
//           resultImg.addClass('result-image');
//           $('#content').append(resultImg);
//           clearInterval(timer);

//         } else {

//           $('#content').html("<h2>Wrong!</h2><h3>The correct answer was: " + questionOne.options[2] + "</h3>");
//           var resultImg = $('<div>');
//           resultImg.html('<img src="assets/images/result-1.gif">');
//           resultImg.addClass('result-image');
//           $('#content').append(resultImg);
//           clearInterval(timer);
//         }
//       });
//     }


    
//     displayQuestion();
//     checkAnswer();
    
   
//   });
// });