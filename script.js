const questions = [
  {
    question: "Quelle est la période du Hacktoberfest durant l'annee ?",
    label:'',
    options: ["Octobre", "Décembre", "Mai", "Août"],
    correctAnswer: [0],
  },
  {
    question: "Où pouvez-vous contribuer pour participer au Hacktoberfest ?",
    label:'',
    options: ["AWS", "Facebook", "GitHub", "DigitaOcean"],
    correctAnswer: [2],
  },
  {
    question:
      "Combien de contributions sont nécessaires pour valider le Hacktoberfest ?",
      label:'',

    options: ["10", "2", "6", "4"],
    correctAnswer: [3],
  },
  {
    question: "Est-ce ce que GitLab participe au Hacktoberfest ?",
    label:'',

    options: ["Oui", "Non"],
    correctAnswer: [0],
  }, 
  {
    question: "Quels sont les developpeurs sénégalais qui participent au Hacktoberfest ?",
    label:'Choix multiples',

    options: ["Daouda", "Malick","Moustapha","khadim"],
    correctAnswer: [0,3],
  },
];

let currentQuestion = 0;
let score = 0;
let response=new Set();

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const suivant=document.getElementById("suivant")

function loadQuestion() {
  const question = questions[currentQuestion];
  questionElement.innerHTML = `${question.question}`;
  if(question.label){
    questionElement.innerHTML+= `<p>${question.label}</p>`;
  }
  optionsElement.innerHTML = "";

  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.className="list-item";
    li.addEventListener("click", () =>{ 
      handleActive(li );
      checkAnswer(index);
    });
    optionsElement.appendChild(li);
  });

}
function handleActive(itemSelected){
  const question = questions[currentQuestion];
  if(!question.label)
    document.querySelectorAll(".list-item").forEach(item=>{
    item.classList.remove("active");
  });
  if(itemSelected.classList.contains("active")){
    itemSelected.classList.remove("active");

  }else
    itemSelected.classList.add("active");
}
function checkAnswer(selectedIndex) {
  response.add(selectedIndex);
  // handleEndQuestion();
  
}
function handleEndQuestion(){
  if (currentQuestion === questions.length) {
    //   loadQuestion();
    // } else {
      questionElement.textContent = "Quiz terminé ! Votre score :";
      optionsElement.innerHTML = "";
      scoreElement.textContent = score;
      suivant.hidden=true;
    }
    else
    loadQuestion()
}
suivant.addEventListener("click",(e)=>{
  const question = questions[currentQuestion];

  console.log(Array.from(response));
  console.log(question.correctAnswer)
  if (JSON.stringify(Array.from(response)) == JSON.stringify(question.correctAnswer))
    score++;
  response=new Set();
  currentQuestion++;
  console.log(score);
  handleEndQuestion();
  // loadQuestion();

})
loadQuestion();
