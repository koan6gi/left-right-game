const totalQuestions = 20;
let currentQuestion = 1;
let correctAnswers = 0;

const questionText = document.getElementById('question');
const progressText = document.getElementById('progress');
const scoreText = document.getElementById('score');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const restartButton = document.getElementById('restartButton');

// Генерация списка направлений
let directions = Array.from({ length: totalQuestions }, () => Math.random() > 0.5 ? 'НАПРАВО' : 'НАЛЕВО');

// Обновление текста вопросов и прогресса
function updateQuestion() {
    if (currentQuestion > totalQuestions) {
        questionText.textContent = 'Тест завершён!';
        progressText.textContent = '';
        scoreText.textContent = `Вы ответили правильно на ${correctAnswers} из ${totalQuestions} вопросов.`;
        leftButton.style.display = 'none';
        rightButton.style.display = 'none';
        restartButton.style.display = 'inline-block';
    } else {
        questionText.textContent = directions[currentQuestion - 1];
        progressText.textContent = `Вопрос ${currentQuestion} из ${totalQuestions}`;
    }
}

// Проверка ответа
function checkAnswer(answer) {
    const correctAnswer = directions[currentQuestion - 1];
    if (answer === correctAnswer) {
        correctAnswers++;
        questionText.className = 'correct';
    } else {
        questionText.className = 'incorrect';
    }
    setTimeout(() => {
        questionText.className = '';
        currentQuestion++;
        updateQuestion();
    }, 500);
}

// Обработчики кнопок
function handleLeft() {
    checkAnswer('НАЛЕВО');
}

function handleRight() {
    checkAnswer('НАПРАВО');
}

function restartTest() {
    currentQuestion = 1;
    correctAnswers = 0;
    directions = Array.from({ length: totalQuestions }, () => Math.random() > 0.5 ? 'НАПРАВО' : 'НАЛЕВО');
    leftButton.style.display = 'inline-block';
    rightButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
    updateQuestion();
}

// Привязка кнопок
leftButton.addEventListener('click', handleLeft);
rightButton.addEventListener('click', handleRight);
restartButton.addEventListener('click', restartTest);

// Привязка клавиш
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'f') {
        handleLeft();
    } else if (event.key.toLowerCase() === 'j') {
        handleRight();
    }
});

// Инициализация первого вопроса
updateQuestion();
