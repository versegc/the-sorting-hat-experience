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
    question: "Apa sifatmu yang paling menonjol?",
    options: [
      { text: "Hadapi langsung", house: "Gryffindor" },
      { text: "Sabar & bantu orang lain", house: "Hufflepuff" },
      { text: "Analisis dulu", house: "Ravenclaw" },
      { text: "Gunakan strategi", house: "Slytherin" }
    ]
  },
  {
    question: "Kamu ingin dikenang sebagai...",
    options: [
      { text: "Berani", house: "Gryffindor" },
      { text: "Setia", house: "Hufflepuff" },
      { text: "Cerdas", house: "Ravenclaw" },
      { text: "Ambisius", house: "Slytherin" }
    ]
  }
];

let scores = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 };
let currentQuestion = 0;

function showQuestion() {
  const q = questions[currentQuestion];
  const container = document.querySelector('.container');
  container.innerHTML = `<h2>${q.question}</h2>` + 
    q.options.map(opt => `<button onclick="selectOption('${opt.house}')">${opt.text}</button>`).join('');
}

function selectOption(house) {
  scores[house]++;
  currentQuestion++;
  if(currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const sortedHouse = Object.keys(scores).reduce((a,b)=>scores[a]>=scores[b]?a:b);
  const container = document.querySelector('.container');
  container.innerHTML = `
    <h1>You belong to ${sortedHouse}!</h1>
    <img src="assets/houses/${sortedHouse.toLowerCase()}.png" alt="${sortedHouse}" class="house-icon">
  `;
}

// Start quiz
showQuestion();
