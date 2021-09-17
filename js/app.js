const questionNumber = document.querySelector('.current-question');
const textQuestion = document.querySelector('.text-question');
const optionsQuestion = document.querySelector('.options-question');
const answersQuestions = document.querySelector('.answers-questions');
const homeScreen = document.querySelector('.home-screen');
const quizScreen = document.querySelector('.quiz-screen');
const resultScreen = document.querySelector('.result-screen');
const infoQuestion = document.querySelector('.info-quesion');

let questionCount = 0;
let correctAnswers = 0;
let attempt = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

const setAvailableQuestions = () => {
    quiz.forEach(it => {
        availableQuestions.push(it);
    })
}

const getNewQuestion = () => {
    infoQuestion.innerHTML = '';
    optionsQuestion.innerHTML = '';
    questionNumber.innerHTML = `Questão ${questionCount + 1} de ${quiz.length}`;
    const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = question;
    textQuestion.innerHTML = currentQuestion.imgUrl != null ? `<img class="img" src="${currentQuestion.imgUrl}" alt="A">` : ''
    textQuestion.innerHTML += currentQuestion.q
    infoQuestion.innerHTML = `<h2 class="test-question" style="margin-top: 50px; display: block;">
            <span style="color: blueviolet;">Prova: </span>
            ${currentQuestion.tests}
    </h2>`
    questionCount++;
    const indexQuestion = availableQuestions.indexOf(question);
    availableQuestions.splice(indexQuestion, 1);
    availableOptions = [...Array(question.options.length).keys()];
    let animationDelay = 200;
    question.options.forEach(() => {
        const randomOptionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const optionIndex = availableOptions.indexOf(randomOptionIndex);
        availableOptions.splice(optionIndex, 1)
        const option = document.createElement('div');
        option.innerHTML = question.options[randomOptionIndex];
        option.id = randomOptionIndex;
        option.className = 'option';
        option.style.animationDelay = animationDelay + 'ms';
        animationDelay += 200;
        option.addEventListener("click", getResult);
        optionsQuestion.append(option)
    })
}

const getResult = (data) => {
    optionsQuestion.childNodes.forEach(it => it.removeEventListener("click", getResult));
    if (Number(data.srcElement.id) === currentQuestion.answer) {
        setAnswersIndicator('correct');
        correctAnswers++;
        data.srcElement.classList.add('correct');
    } else {
        setAnswersIndicator('wrong');
        data.srcElement.classList.add('wrong');
    }
    attempt++;
}

const nextQuestion = () => {
    if (questionCount === quiz.length) {
        finishQuiz();
        return;
    }
    getNewQuestion();
}

const setAnswersIndicator = (data) => {
    answersQuestions.children[questionCount - 1].className = data;
}

const createAnswersIndicator = () => {
    answersQuestions.innerHTML = '';
    quiz.forEach(() => {
        const indicatorAnswers = document.createElement("div");
        answersQuestions.appendChild(indicatorAnswers);
    })
}

const showResult = () => {
    console.log(resultScreen.querySelector('.total-correct'))
    resultScreen.querySelector('.total-questions').innerHTML = quiz.length;
    resultScreen.querySelector('.total-correct').innerHTML = correctAnswers;
    resultScreen.querySelector('.total-attempt').innerHTML = attempt;
    resultScreen.querySelector('.total-wrong').innerHTML = attempt - correctAnswers;
    resultScreen.querySelector('.total-empty').innerHTML = quiz.length - attempt;
    resultScreen.querySelector('.correct-percent').innerHTML = ((correctAnswers / quiz.length) * 100).toFixed(2) + '%'
    resultScreen.querySelector('.total-score').innerHTML = `${correctAnswers} / ${quiz.length}`
}

const finishQuiz = () => {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    showResult();
}

const startQuiz = () => {
    homeScreen.classList.toggle('hide');
    quizScreen.classList.toggle('hide');
    setAvailableQuestions();
    getNewQuestion();
    createAnswersIndicator();
}

const tryAgain = () => {
    resetQuiz();
    quizScreen.classList.toggle('hide');
    resultScreen.classList.toggle('hide');
    setAvailableQuestions();
    getNewQuestion();
    createAnswersIndicator();
}

const goToHome = () => {
    resetQuiz();
    homeScreen.classList.toggle('hide');
    resultScreen.classList.toggle('hide');
}

const resetQuiz = () => {
    questionCount = 0;
    correctAnswers = 0;
    attempt = 0;
    currentQuestion;
    availableQuestions = [];
    availableOptions = [];
}

window.onload = () => {
    document.querySelector('.start-btn').addEventListener('click', startQuiz);
    document.querySelector('.try-again-btn').addEventListener('click', tryAgain);
    document.querySelector('.home-btn').addEventListener('click', goToHome);
    document.querySelector('.total-questions').innerHTML = quiz.length;
}
