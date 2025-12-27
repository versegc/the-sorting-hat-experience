const questions = [
    { q: "Apa yang paling kamu hargai dalam dirimu?", a: [{t:"Keberanian", h:"G"}, {t:"Ambisi", h:"S"}, {t:"Kecerdasan", h:"R"}, {t:"Kesetiaan", h:"H"}] },
    { q: "Jika melihat kawan dalam kesulitan, kamu akan...", a: [{t:"Menerjang bahaya demi mereka", h:"G"}, {t:"Memberikan saran yang logis", h:"R"}, {t:"Tetap di sisinya apa pun yang terjadi", h:"H"}, {t:"Menimbang risiko terbaik bagi dirimu", h:"S"}] },
    { q: "Artefak mana yang paling ingin kamu sentuh?", a: [{t:"Pedang Kuno yang Berkilau", h:"G"}, {t:"Cincin Perak yang Berbisik", h:"S"}, {t:"Buku Tua yang Bercahaya", h:"R"}, {t:"Piala Emas yang Hangat", h:"H"}] },
    { q: "Pilih suasana yang paling menenangkan:", a: [{t:"Suara badai di puncak gunung", h:"G"}, {t:"Keheningan di bawah air", h:"S"}, {t:"Perpustakaan tua tengah malam", h:"R"}, {t:"Taman bunga di pagi hari", h:"H"}] },
    { q: "Bagaimana dunia akan mengingatmu?", a: [{t:"Sebagai Pahlawan Legendaris", h:"G"}, {t:"Sebagai Pemimpin yang Kuat", h:"S"}, {t:"Sebagai Orang yang Paling Bijak", h:"R"}, {t:"Sebagai Sahabat yang Paling Setia", h:"H"}] }
];

const houses = {
    G: { name: "Gryffindor", color: "#ae0001", img: "https://www.pngall.com/wp-content/uploads/11/Gryffindor-Logo-PNG-Image.png", desc: "Keberanianmu melampaui rasa takut. Kamu adalah sosok yang akan berdiri paling depan untuk membela keadilan.", attrs: [{n:"Berani", i:"shield"}, {n:"Ksatria", i:"swords"}] },
    S: { name: "Slytherin", color: "#2a623d", img: "https://www.pngall.com/wp-content/uploads/11/Slytherin-Logo-PNG-Image.png", desc: "Kamu memiliki visi yang tajam dan keinginan kuat untuk mencapai puncak. Ambisimu adalah kekuatanmu.", attrs: [{n:"Ambisi", i:"crown"}, {n:"Cerdik", i:"zap"}] },
    R: { name: "Ravenclaw", color: "#222f5b", img: "https://www.pngall.com/wp-content/uploads/11/Ravenclaw-Logo-PNG-Image.png", desc: "Kecerdasanmu tak terbatas. Kamu menghargai pengetahuan di atas segalanya. Selamat datang, cendekiawan.", attrs: [{n:"Bijak", i:"book-open"}, {n:"Cerdas", i:"brain"}] },
    H: { name: "Hufflepuff", color: "#ecb939", img: "https://www.pngall.com/wp-content/uploads/11/Hufflepuff-Logo-PNG-Image.png", desc: "Ketulusan hatimu adalah sihir yang langka. Kesetiaanmu adalah cahaya bagi orang-orang di sekitarmu.", attrs: [{n:"Setia", i:"heart"}, {n:"Jujur", i:"smile"}] }
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
        b.onclick = () => { 
            scores[a.h]++; 
            current++; 
            if(current < 5) showQ(); 
            else showResult(); 
        };
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
    document.getElementById('house-img').style.color = h.color;
    document.getElementById('house-desc').innerText = h.desc;

    const list = document.getElementById('attr-list');
    list.innerHTML = '';
    h.attrs.forEach(at => {
        list.innerHTML += `
            <div class="attr-pill">
                <i data-lucide="${at.i}"></i>
                <span>${at.n}</span>
            </div>`;
    });

    lucide.createIcons();
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('fade-in');
}

// --- LOGIKA BINTANG BERGERAK ---
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for(let i=0; i<250; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.3 + 0.1,
            alpha: Math.random()
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.speed;
        if(s.y > canvas.height) s.y = 0;
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initStars);
initStars();
drawStars();
