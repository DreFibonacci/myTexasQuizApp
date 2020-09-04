const texasQuestions = [
      {qNum: 1,
      question: 'Texas is larger than which European country?',
      answerChoices: ['France','Germany', 'Spain', 'All of the above'],
      correctAnswer: 'All of the above'          
    }, 
      {qNum: 2,
      question: 'What is the hottest temperature ever recorded in Texas? (Fahrenheit)',
      answerChoices: ['110 Degrees','113 Degrees','120 Degrees','126 Degrees'],
      correctAnswer: '120 Degrees'
    }, 
      {qNum: 3,
      question: 'Which renowned soda was invented in Texas?',
      answerChoices: ['Dr. Pepper', 'Coke','Sprite','Mountain Dew'],
      correctAnswer: 'Dr. Pepper'
    }, 
      {qNum: 4,
      question: 'Which professional sports team in Texas is considered to be "America`s Team"?',
      answerChoices: ['Houston Astros', 'Texas Rangers', 'San Antonio Spurs', 'Dallas Cowboys'],
      correctAnswer: 'Dallas Cowboys'
    }, 
      {qNum: 5,
      question: 'On average, how many tornadoes does Texas experience a year?',
      answerChoices: [52, 139, 208, 0],
      correctAnswer: 139
    }, 
  ];
  
let currentQ = 0;

function startQuizAtBeginning() {
  // begin quiz
  $('#start-page').on('click', '.button', event => {
    $('#start-page').addClass('hidden');
    $('#question-page').removeClass('hidden');
    $('#submit-answer').removeClass('hidden');
  });
}

function renderQuestions() {
  // populate questions and answers from array of Q&As
  const answer1 = `${texasQuestions[currentQ].answerChoices[0]}`;
  const answer2 = `${texasQuestions[currentQ].answerChoices[1]}`;
  const answer3 = `${texasQuestions[currentQ].answerChoices[2]}`;
  const answer4 = `${texasQuestions[currentQ].answerChoices[3]}`;
  const questionText = `<legend>${currentQ+1}/5: ${texasQuestions[currentQ].question}<legend>`;
  const answersText = 
  `<input type='radio' name='option' class='radio-buttons' id='answer1' value='${answer1}'><label for='answer1'>${answer1}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer2' value='${answer2}'><label for='answer2'>${answer2}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer3' value='${answer3}'><label for='answer3'>${answer3}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer4' value='${answer4}'><label for='answer4'>${answer4}</label><br>`;
  $('.texas-question').html(questionText);
  $('.texas-answers').html(answersText);
  enableSubmitButton();
}

function enableSubmitButton() {
  // get sumbit button back
  $('input[name=option]').on('click', function(event) {
    $('#submit-answer').removeClass('disabled').removeAttr('disabled');
  });
}
    
function submitQuizAnswer() {
  // select answer
  $('#submit-answer').click(function(event) {
    event.preventDefault();
    evaluateAnswers();
    $('#submit-answer').addClass('hidden');
    $('#next-question').removeClass('hidden');
    $('input[type=radio]').attr('disabled', true);
  });
}

let userScore = {
  correct: 0,
  incorrect: 0,
};

function evaluateAnswers() {
  //check if correct or display feedback 
  let radioValue = $('input[name=option]:checked').val();
  if (radioValue == texasQuestions[currentQ].correctAnswer) {
    userScore.correct++;
    $('#feedbackcorrect').removeClass('hidden');
  } else {
    userScore.incorrect++;
    getCorrectAnswer();
    $('#feedbackincorrect').removeClass('hidden');
    $('.sad-cowboy').removeClass('hidden');
  }
  $('.results-counter').html(`<p>Correct: ${userScore.correct} | Incorrect: ${userScore.incorrect}</p>`);
}  
  
function getCorrectAnswer() {
  //show wrong and right answer
  let popupAnswerText = `<h3>Dag Nabbit!<br>The correct answer is: ${texasQuestions[currentQ].correctAnswer}.</h3><br>`;
  $('#feedbackincorrect').html(popupAnswerText);
} 
      
function goToNextQuestion() {
  // go to next question or get final score
  $('#next-question').on('click', function(event) {
    if (currentQ < texasQuestions.length-1) {
      currentQ++;
      renderQuestions();
      resetQuestion();
    } else {
      showFinalScore();
    } 
  });
}

function resetQuestion() {
  // reset questions, remove and switch buttons
  $('input[type=radio]').attr('disabled', false);
  $('#next-question').addClass('hidden');
  $('#submit-answer').removeClass('hidden');
  $('#feedbackcorrect').addClass('hidden');
  $('#feedbackincorrect').addClass('hidden');
  $('.sad-cowboy').addClass('hidden');
  $('#submit-answer').addClass('disabled');
  $('#submit-answer').attr('disabled', 'disabled');
}

function showFinalScore() {
  // hide submit and show final score
      $('#submit-answer').addClass('hidden');
      $('#last-page').removeClass('hidden');
      $('#question-page').addClass('hidden');
      let finalScoreText = `<h3>You answered ${userScore.correct} out of 5 questions correctly!</h3>`;
      $('#final-correct').append(finalScoreText);
  }

function restartQuiz() {
  // restart quiz
  $('#retake').click(function() {
    location.reload();
  });
}

function handleQuizFunctions() {
  startQuizAtBeginning();
  renderQuestions();
  submitQuizAnswer();
  goToNextQuestion();
  restartQuiz();
  enableSubmitButton();
}

$(handleQuizFunctions);
