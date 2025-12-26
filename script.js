const startButton = document.getElementById("startButton");
const startScreen = document.querySelector(".start-screen");
const quizScreen = document.querySelector(".quiz-screen");
const resultScreen = document.querySelector(".result-screen");
const houseResult = document.getElementById("houseResult");
const houseIcon = document.getElementById("houseIcon");

const questions = [
  {
    question: "Saat menghadapi masalah kamu akan...",
    options: [
      { text: "Menghadapi langsung", house: "Gryffindor" },
      { text: "Meminta bantuan orang lain", house: "Hufflepuff" },
      { text: "Menganalisis terlebih dahulu", house: "Ravenclaw" },
      { text: "Mencari cara paling menguntungkan", house: "Slytherin" }
    ]
  },
  {
    question: "Apa sifatmu yang paling dominan?",
    options: [
      { text: "Berani", house: "Gryffindor" },
      { text: "Setia", house: "Hufflepuff" },
      { text: "Cerdas", house: "Ravenclaw" },
      { text: "Ambisius", house: "Slytherin" }
    ]
  },
  {
    question: "Kamu ingin dikenang sebagai...",
    options: [
      { text: "Pahlawan", house: "Gryffindor" },
      { text: "Teman Setia", house: "Hufflepuff" },
      { text: "Orang Pintar", house: "Ravenclaw" },
      { text: "Penguasa", house: "Slytherin" }
    ]
  }
];

const colors = {
  "Gryffindor": "#D3A625",
  "Hufflepuff": "#FFDB00",
  "Ravenclaw": "#946B2D",
  "Slytherin": "#AAAAAA"
};

const icons = {
  "Gryffindor": "assets/houses/gryffindor.png",
  "Hufflepuff": "assets/houses/hufflepuff.png",
  "Ravenclaw": "assets/houses/ravenclaw.png",
  "Slytherin": "assets/houses/slytherin.png"
};

let scores = { Gryffindor:0, Hufflepuff:0, Ravenclaw:0, Slytherin:0 };
let currentQuestion = 0;

// Start Quiz
startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  showQuestion();
});

// Show question
function showQuestion() {
  const q = questions[currentQuestion];
  quizScreen.innerHTML = `<h2>${q.question}</h2>` +
    q.options.map(opt => `<button onclick="selectOption('${opt.house}')">${opt.text}</button>`).join('');
}

// Handle selection
function selectOption(house) {
  scores[house]++;
  currentQuestion++;
  if(currentQuestion < questions.length){
    showQuestion();
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  const sortedHouse = Object.keys(scores).reduce((a,b)=>scores[a]>=scores[b]?a:b);
  houseResult.textContent = `You belong to ${sortedHouse}!`;
  houseResult.style.color = colors[sortedHouse];
  houseIcon.src = icons[sortedHouse];
  houseIcon.alt = sortedHouse;
}
