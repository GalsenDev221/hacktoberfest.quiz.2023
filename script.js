const questions = [
  {
    question: "Quelle est la période du Hacktoberfest durant l'année ?",
    options: ["Octobre", "Décembre", "Mai", "Août"],
    correctAnswer: 0,
  },
  {
    question: "Où pouvez-vous contribuer pour participer au Hacktoberfest ?",
    options: ["AWS", "Facebook", "GitHub", "DigitalOcean"],
    correctAnswer: 2,
  },
  {
    question:
      "Combien de contributions sont nécessaires pour valider le Hacktoberfest ?",
    options: ["10", "2", "6", "4"],
    correctAnswer: 3,
  },
  {
    question: "Est-ce ce que GitLab participe au Hacktoberfest ?",
    options: ["Oui", "Non"],
    correctAnswer: 0,
  },
  {
    question: "Quelle est la durée du Hacktoberfest ?",
    options: ["1 mois", "2 mois", "15 jours", "Ca depend"],
    correctAnswer: 0,
  },
  {
    question:
      "Quelle est la principale motivation des contributeurs pendant le Hacktoberfest ?",
    options: [
      "Gagner de l'argent",
      "Acquérir de l'expérience",
      "Trouver un emploi",
      "Se détendre",
    ],
    correctAnswer: 1,
  },
  {
    question: "Combien de fois par an se déroule le Hacktoberfest ?",
    options: ["Une fois", "Deux fois", "Quatre fois", "Tous les mois"],
    correctAnswer: 0,
  },
  {
    question: "Quel est l'objectif principal du Hacktoberfest ?",
    options: [
      "Célébrer Halloween",
      "Promouvoir GitHub et GitLab",
      "Encourager la contribution à des projets open source",
      "Faire de événements",
    ],
    correctAnswer: 2,
  },
  {
    question: "En qu'elle année le Hacktoberfest a commencé ?",
    options: ["2010", "2013", "2018", "2021"],
    correctAnswer: 1,
  },
  {
    question: "Est ce que tout le monde peut participer au Hacktoberfest ?",
    options: ["Oui", "Non"],
    correctAnswer: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let userHasAnswered = false;
let quizStarted = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const nextQuestionButton = document.getElementById("next-question");
const learnMoreButton = document.getElementById("learn-more");
const modal = document.getElementById("modal");
const closeButton = document.getElementsByClassName("close")[0];
const replayButton = document.getElementById("replay");

const welcomePage = document.getElementById("welcome-page");
const startQuizButton = document.getElementById("start-quiz");
const congratulationMessage =
  "Félicitations ! Vous avez réussi le quiz avec plus de 70% de bonnes réponses.";

startQuizButton.addEventListener("click", function () {
  welcomePage.style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  quizStarted = true;
  loadQuestion();
});

nextQuestionButton.addEventListener("click", function () {
  if (quizStarted) {
    if (currentQuestion < questions.length) {
      if (userHasAnswered) {
        loadNextQuestion();
      } else {
        currentQuestion++;
        loadNextQuestion();
      }
      userHasAnswered = false;
    } else {
      restartQuiz();
    }
  }
});

function loadQuestion() {
  if (quizStarted) {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";

    question.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => checkAnswer(index));
      optionsElement.appendChild(li);
    });
  }
}

function checkAnswer(selectedIndex) {
  if (quizStarted) {
    // Vérifier que le quiz a commencé
    const question = questions[currentQuestion];

    if (selectedIndex === question.correctAnswer) {
      score++;
    }

    currentQuestion++;
    updateScore();
    userHasAnswered = true;

    if (currentQuestion < questions.length) {
      loadNextQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  if (score / questions.length >= 0.7) {
    // Vérifiez si le score est supérieur ou égal à 70%
    questionElement.textContent = "Quiz terminé ! Votre score :";
    optionsElement.innerHTML = congratulationMessage;
  } else {
    questionElement.textContent = "Quiz terminé ! Votre score :";
    optionsElement.innerHTML =
      "Désolé, vous n'avez pas réussi le quiz. Vous avez obtenu moins de 70% de bonnes réponses.";
  }
  nextQuestionButton.textContent = "Rejouer";
  replayButton.style.display = "block";
}

function loadNextQuestion() {
  loadQuestion();
}

learnMoreButton.addEventListener("click", function () {
  openModal();
});

closeButton.addEventListener("click", function () {
  closeModal();
});

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  updateScore();
  loadQuestion();
  nextQuestionButton.textContent = "Passer";
  replayButton.style.display = "none";
}

function updateScore() {
  scoreElement.textContent = `${score}`;
}

loadQuestion();