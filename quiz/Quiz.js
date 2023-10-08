const questions = [
  {
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer:"3. alerts"    
  },
  {
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within _____ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
}];

const startButton = document.querySelector('.start-quiz-button-js');
const timer = document.querySelector('.timer-js');
const highScoresContainer = document.querySelector('.highscores-container-js');
const scoreContainer = document.querySelector('.final-score-container-js');


const questionContainer = document.querySelector('.questions-container-js');
const questionElem = document.querySelector('.question-js');
const answersButtonsContainer = document.querySelector('.answers-section');

const option1 = document.querySelector('.option1-js');
const option2 = document.querySelector('.option2-js');
const option3 = document.querySelector('.option3-js');
const option4 = document.querySelector('.option4-js');
let result = document.querySelector('.result-js');

let time = 59 ;
let currentQuestionIndex = 0 ;
let buttonState = false;
scoreContainer.style.display = 'none';
highScoresContainer.style.display = 'none';


function startQuiz(){
  
    currentQuestionIndex = 0 ; //Reset currentQuestionIndex
    time = 59;
    document.querySelector('.start-menu-js').style.display = 'none';
    questionContainer.style.display = 'block';
     // Remove any existing event listeners
     const answersButtons = document.querySelectorAll('.btn');
     answersButtons.forEach(button => {
         button.removeEventListener('click', handleAnswerClick);
     });
    countDown();
    showQuestions();
    checkAnswer();
    showScore();
}


let timerId;

function countDown() {
  timerId = setInterval(function () {
    if (time <= 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timerId);
      time = 0; // Set time to 0 when the quiz is finished or time is up
      timer.innerHTML = '0';
    } else {
      timer.innerHTML = time;
      time--;
    }
  }, 1000);
}

let currentQuestion = 0;
let questionNum = 0;

function showQuestions(){
  currentQuestion = questions[currentQuestionIndex];
   questionNum = currentQuestionIndex + 1 ;
   questionElem.innerHTML = questionNum + ' . ' + currentQuestion.questionText;
   
   option1.textContent = currentQuestion.options[0];
   option2.textContent = currentQuestion.options[1];
   option3.textContent = currentQuestion.options[2];
   option4.textContent = currentQuestion.options[3];
}


function showNextQuestion() {
  currentQuestionIndex += 1;
  console.log(currentQuestionIndex);
  
  if(currentQuestionIndex >= questions.length){
    console.log('time is up !!!!');
  }
  
  if (currentQuestionIndex < questions.length) {
    // Clear the existing question and options
    questionElem.innerHTML = '';
    option1.textContent = '';
    option2.textContent = '';
    option3.textContent = '';
    option4.textContent = '';
    
    showQuestions(); // Display the next question
    buttonState = false; // Reset the button state
    
  } else {
    console.log('Quiz is finished, loading your score...');
    showScore();
    currentQuestionIndex = 0; 
    questionContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    buttonState = false; // Reset the button state
    result.innerHTML = ''; // Clear the result message
  }
}

function checkAnswer(){
  const answersButtons = document.querySelectorAll('.btn');
  answersButtons.forEach(button => {
    button.addEventListener('click', handleAnswerClick);
  });
}

function handleAnswerClick(event) {
  buttonState = true;
  const selectedAnswer = event.target.textContent;
  if (selectedAnswer === currentQuestion.answer) {
    result.innerHTML = 'Correct !';
    result.classList.add('checked-answer');
    console.log(result.innerHTML);
  } else {
    result.innerHTML = 'Incorrect !';
    result.classList.add('checked-answer');
    console.log(result.innerHTML);
  }
  showNextQuestion();
}

let highscores = JSON.parse(localStorage.getItem('highscores')) ||  []; 
function showScore(){
  if(currentQuestionIndex >= questions.length ){
    console.log(`Final time: ${time}`);
    scoreContainer.innerHTML = `
        <p class="congrats-message">All done!</p>
        <div class="score-container">
            <p>Your final score is :
                <div class="time-scored-js">
                  ${time}
                </div>
            </p>
        </div>
        <label >Enter initials: <input class="initials-js" placeholder=" put your initials"type="text"></label>
        <button class="submit-button submit-button-js">Submit</button>`;
     document.querySelector('.submit-button-js').addEventListener('click' , () => {
      console.log('Displaying score in leaderboard...');
      
      const initialsBox = document.querySelector('.initials-js');
      const initials = initialsBox.value.trim();
      
      if (initials !== ''){
        const scoreInfo =  `${initials}-${time}`;
        highscores.push(scoreInfo);
       
        //updating the leaderboard 
        document.querySelector('.hightScores-history-js')
          .innerHTML = '';
        highscores.forEach( (scoreInfo,index) => {
            const scoreItem = document.createElement('p');
            scoreItem.textContent = `${index +1}.${scoreInfo}`;
            document.querySelector('.hightScores-history-js')
            .appendChild(scoreItem);
        //updating localStorage
        localStorage.setItem('highscores' , JSON.stringify(highscores));
        });
      }
  });
  // Clear the timer interval
  clearInterval(timerId);
  }
}

startButton.addEventListener('click' , () => {
  startQuiz();
  currentQuestionIndex = 0;
});

document.querySelector('.leaderBoard-js')
  .addEventListener('click', () => {
    document.querySelector('.start-menu-js').style.display = 'none';
    questionContainer.style.display = 'none';
    scoreContainer.style.display = 'none';
    highScoresContainer.style.display = 'block';
});

document.querySelector('.go-back-button-js')
  .addEventListener('click', () => {
    document.querySelector('.start-menu-js').style.display = 'block';
    highScoresContainer.style.display = 'none';
});

document.querySelector('.clear-highscores-button-js')
  .addEventListener('click', () => {
    document.querySelector('.hightScores-history-js')
      .innerHTML = '';
    localStorage.removeItem('highscores');
    alert('Highscores history has been cleared!')
});





