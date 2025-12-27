const questions = [
    { q: "Apa yang paling kau banggakan?", a: [{t:"Keberanian", h:"G"}, {t:"Ambisi", h:"S"}, {t:"Kecerdasan", h:"R"}, {t:"Kesetiaan", h:"H"}] },
    { q: "Jika melihat ketidakadilan, kau akan...", a: [{t:"Menerjang langsung", h:"G"}, {t:"Mencari rencana cerdik", h:"S"}, {t:"Menganalisis situasinya", h:"R"}, {t:"Membantu yang lemah", h:"H"}] },
    { q: "Pilih artefak sihirmu:", a: [{t:"Pedang Kuno", h:"G"}, {t:"Cincin Perak", h:"S"}, {t:"Buku Rahasia", h:"R"}, {t:"Piala Emas", h:"H"}] },
    { q: "Apa yang kau inginkan dari orang lain?", a: [{t:"Rasa Hormat", h:"S"}, {t:"Kepercayaan", h:"H"}, {t:"Kekaguman", h:"R"}, {t:"Kebergantungan", h:"G"}] }
];

const houses = {
    G: { name: "Gryffindor", color: "#ae0001", img: "https://www.pngall.com/wp-content/uploads/11/Gryffindor-Logo-PNG-Image.png", desc: "Tempat bagi mereka yang berani dan ksatria.", attrs: [{n:"Berani", i:"shield"}, {n:"Ksatria", i:"swords"}] },
    S: { name: "Slytherin", color: "#2a623d", img: "https://www.pngall.com/wp-content/uploads/11/Slytherin-Logo-PNG-Image.png", desc: "Bagi mereka yang ambisius dan cerdik.", attrs: [{n:"Ambisi", i:"crown"}, {n:"Cerdik", i:"zap"}] },
    R: { name: "Ravenclaw", color: "#222f5b", img: "https://www.pngall.com/wp-content/uploads/11/Ravenclaw-Logo-PNG-Image.png", desc: "Penyihir bijak dengan kecerdasan tinggi.", attrs: [{n:"Bijak", i:"book-open"}, {n:"Cerdas", i:"brain"}] },
    H: { name: "Hufflepuff", color: "#ecb939", img: "https://www.pngall.com/wp-content/uploads/11/Hufflepuff-Logo-PNG-Image.png", desc: "Rumah bagi yang setia dan jujur.", attrs: [{n:"Setia", i:"heart"}, {n:"Jujur", i:"check-circle"}] }
};

let current = 0;
let scores = { G:0, S:0, R:0, H:0 };

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQ();
}

function showQ() {
    const q = questions[current];
    document.getElementById('question-text').innerText = q.q;
    const opt = document.getElementById('options-container');
    opt.innerHTML = '';
    q.a.forEach(a => {
        const b = document.createElement('button');
        b.className = 'btn-option';
        b.innerText = a.t;
        b.onclick = () => { scores[a.h]++; current++; if(current < questions.length) showQ(); else showResult(); };
        opt.appendChild(b);
    });
}

function showResult() {
    document.getElementById('quiz-screen').classList.add('hidden');
    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const h = houses[winner];

    const nameTag = document.getElementById('house-name');
    nameTag.innerText = h.name.toUpperCase();
    nameTag.style.color = h.color;
    nameTag.style.textShadow = `0 0 30px ${h.color}`;

    document.getElementById('house-img').src = h.img;
    document.getElementById('house-desc').innerText = h.desc;

    const list = document.getElementById('attr-list');
    list.innerHTML = '';
    h.attrs.forEach(at => {
        list.innerHTML += `<div class="attr-pill"><i data-lucide="${at.i}"></i><span>${at.n}</span></div>`;
    });

    lucide.createIcons();
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('fade-in');
}

// Background Bintang (Fixed & Estetik)
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    stars = [];
    for(let i=0; i<200; i++) {
        stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*1.5, speed: Math.random()*0.4+0.1, alpha: Math.random() });
    }
}
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill();
        s.y += s.speed; if(s.y > canvas.height) s.y = 0;
    });
    requestAnimationFrame(drawStars);
}
window.addEventListener('resize', initStars);
initStars(); drawStars();
