const questions = [
  {
    question: "Quelle est la période du Hacktoberfest durant l'annee ?",
    options: ["Octobre", "Décembre", "Mai", "Août"],
    correctAnswer: 0,
  },
  {
    question: "Où pouvez-vous contribuer pour participer au Hacktoberfest ?",
    options: ["AWS", "Facebook", "GitHub", "DigitaOcean"],
    correctAnswer: 2,
  },
  {
    question:
      "Combien de contributions sont nécessaires pour valider le Hacktoberfest ?",
    options: ["10", "2", "6", "4"],
    correctAnswer: 3,
  },
  {
    question: "Quelles sont les deux langues officielles du Canada ? (choix multiple)",
    options: ["Français", "Anglais", "Espagnol", "Allemand"],
    correctAnswer: [0, 1],
  },
  {
    question: "Est-ce ce que GitLab participe au Hacktoberfest ?",
    options: ["Oui", "Non"],
    correctAnswer: 0,
  },
  {
    question: "Quel est l'objectif principal du Hacktoberfest ?",
    options: ["Célébrer Halloween", "Promouvoir la consommation de citrouilles", "Encourager la contribution à des projets open source"],
    correctAnswer: 2,
   },
   {
    question: "Quelle societe a cree le hacktoberfest ?",
    options: ["DigitalOcean", "Microsoft", "galsenDev", "xarala"],
    correctAnswer: 0,
  },
  {
    question: "Quel type de projets peut être éligible pour le Hacktoberfest ?",
    options: ["Seuls les projets en Python.", "Les projets en Python et JavaScript.", "Tout projet open source qui accepte des contributions."],
    correctAnswer: 2,
  },
  {
    question: "Combien de temps dure l'evenement Hacktoberfest ?",
    options: ["1 ans", "1 mois", "1 week-end"],
    correctAnswer: 1,
  },
  {
    question: "Où pouvez-vous trouver des projets open source éligibles pour le Hacktoberfest ?",
    options: ["Uniquement sur GitHub.", "Sur GitHub, GitLab, et Bitbucket.", "Nulle part, ils sont tenus secrets."],
    correctAnswer: 1,
  },
  {
    question: "Qu'est-ce qu'une Pull Request (demande de fusion) ?",
    options: ["Un ensemble de modifications suggérées pour un projet open source.", "Une demande de fusion de branches dans Git.", "Une demande pour fusionner deux projets open source."],
    correctAnswer: 0,
  },
  {
    question: "Comment puis-je célébrer la réussite du Hacktoberfest ?",
    options: ["En publiant un tweet sur votre expérience.", "En organisant une grande fête.", "En partageant vos réalisations sur les médias sociaux, en rejoignant des événements communautaires, ou en obtenant un t-shirt Hacktoberfest."],
    correctAnswer: 2,
  },
];

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0
let numberOfClick = 0

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");

function loadQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";

  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", function () { return checkAnswer(index, this) });
    optionsElement.appendChild(li);
  });
}

function checkAnswer(selectedIndex, currentList) {
  const question = questions[currentQuestion];


  if (Array.isArray(question.correctAnswer)) {
    numberOfClick++
    currentList.classList.add("active");

    if (question.correctAnswer.includes(selectedIndex)) {
      correctAnswers++
    }
    if (numberOfClick === question.correctAnswer.length) {
      if (correctAnswers === question.correctAnswer.length) {
        score++
        scoreElement.innerText = score
      }
      numberOfClick = 0
      correctAnswers = 0
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        questionElement.textContent = "Quiz terminé ! Votre score :";
        optionsElement.innerHTML = "";
        scoreElement.textContent = score;
      }
    }
    return
  }

  if (selectedIndex === question.correctAnswer) {
    score++;
    scoreElement.innerText = score
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionElement.textContent = "Quiz terminé ! Votre score :";
    optionsElement.innerHTML = "";
    scoreElement.textContent = score;
  }
}

loadQuestion();
