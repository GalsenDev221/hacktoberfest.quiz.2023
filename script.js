const questions = [
  {
    question: "Quelle est la période du Hacktoberfest durant l'annee ?",
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
    question: "Combien de temps dure l'evenement Hacktoberfest ?",
    options: ["1 ans", "1 mois", "1 week-end"],
    correctAnswer: 1,
  },
   {
    question: "Combien de temps dure l'evenement Hacktoberfest ?",
    options: ["1 ans", "1 mois", "1 week-end"],
    correctAnswer: 1,
  },
  {
    question: "Hacktoberfest est ii necessaire ?",
    options: ["Oui", "Non"],
    correctAnswer: 0,
  },
  {
    question: "Hacktoberfest ne peut-il pas avoir  lieu chaque 3 mois?",
    options: ["Possible", "Non"],
    correctAnswer: 0,
  },
  {
    question: "How to Periodically Backup Your Databases to Git?",
    options: ["Create an archive of our application","Create an SQL configuration file"],
    correctAnswer: 0,
  },
  {
    question: "How to Put a Legacy Application in Git ?",
    options:["Create an SQL configuration file","Upload the source code to a GitLab repository"]
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
