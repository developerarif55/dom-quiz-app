const questions = [
    {
      question: 'console.log(1 + 1 + "2")',
      answers: [
        { text: '22', correct: true },
        { text: '4', correct: false },
        { text: 'none of them', correct: false },
      ]
    },

    
    {
      question: 'console.log("2" + 1 + 1)',
      answers: [
        { text: '4', correct: false },
        { text: '211', correct: true },
        { text: '22', correct: false },
      ]
    },
    {
      question: 'What is the purpose of the JSON.parse method in JavaScript?',
      answers: [
        { text: 'JSON.parse is used to parse a JSON string ', correct: false },
        { text: 'JSON.parse is used to parse a JSON string and convert it into a JavaScript array.', correct: false },
        { text: 'JSON.parse is used to parse a JSON string and convert it into a JavaScript object.', correct: true },
      ]
    },
  ];
  
  const form = document.querySelector('#quiz-form');
  const questionElement = document.querySelector('#question');
  const answersElement = document.querySelector('#answers');
  const scoreElement = document.querySelector('#score');
  const congratulationsElement = document.querySelector("#congrations")
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answersElement.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = answer.text;
      label.appendChild(input);
      label.append(answer.text);
      li.appendChild(label);
      answersElement.appendChild(li);
    });
  }
  
  function getSelectedAnswer() {
    const answerElements = document.getElementsByName('answer');
    let selectedAnswer = null;
    answerElements.forEach(answerElement => {
      if (answerElement.checked) {
        selectedAnswer = answerElement.value;
      }
    });
    return selectedAnswer;
  }
  
  function checkAnswer() {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer) {
      const currentQuestion = questions[currentQuestionIndex];
      if (selectedAnswer === currentQuestion.answers.find(answer => answer.correct).text) {
        score++;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        form.style.display = 'none';
        congratulationsElement.innerText = `Congratulations!`
        scoreElement.innerText = `You scored ${score} out of ${questions.length}`;
        scoreElement.style.display = 'block';
      }
    }
  }
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    checkAnswer();
  });
  
  showQuestion();
  