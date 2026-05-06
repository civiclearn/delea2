// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

// ----------------------------
// FULL QUESTION POOL — DELE A2 (Castilian Spanish, A2 level)
// Ser vs estar, por vs para, preterite vs imperfect, gustar construction,
// direct/indirect object pronouns, basic subjunctive (querer que + subj.),
// Spanish culture (DNI, siesta, CCSE), common idioms (tener sed/hambre),
// false friends, everyday communication scenarios.
// ----------------------------
const INLINE_TEST_QUESTIONS = [
  {
    q: "«Mi madre _____ profesora.» ¿Qué opción completa correctamente la frase?",
    a: [
      "es",
      "está",
      "tiene"
    ],
    correct: 0
  },
  {
    q: "«¿Por qué bebes tanta agua?» «Porque _____ mucha sed.» ¿Cuál es la forma correcta?",
    a: [
      "tengo",
      "soy",
      "estoy"
    ],
    correct: 0
  },
  {
    q: "«¿Te _____ las películas españolas?» Completa correctamente.",
    a: [
      "gustan",
      "gustas",
      "gusta"
    ],
    correct: 0
  },
  {
    q: "«Este regalo es _____ mi madre.» ¿Qué preposición usamos?",
    a: [
      "para",
      "por",
      "a"
    ],
    correct: 0
  },
  {
    q: "«Ayer _____ a la playa con mis amigos.» Completa con la forma correcta del verbo.",
    a: [
      "fui",
      "iba",
      "voy"
    ],
    correct: 0
  },
  {
    q: "«¿Has visto a Juan?» «Sí, _____ vi ayer en el parque.» ¿Qué pronombre completa la frase?",
    a: [
      "lo",
      "le",
      "la"
    ],
    correct: 0
  },
  {
    q: "«_____ agua está muy fría.» ¿Qué artículo es el correcto?",
    a: [
      "El",
      "La",
      "Lo"
    ],
    correct: 0
  },
  {
    q: "«Cuando era niño, _____ todos los días en el parque.» ¿Qué forma verbal es correcta?",
    a: [
      "jugaba",
      "jugué",
      "juego"
    ],
    correct: 0
  },
  {
    q: "Estás en una tienda y quieres saber el precio de algo. Preguntas:",
    a: [
      "¿Cuánto cuesta?",
      "¿Qué hora es?",
      "¿De dónde eres?"
    ],
    correct: 0
  },
  {
    q: "En España, ¿qué es la siesta?",
    a: [
      "Una pausa para descansar después de comer",
      "Una comida típica de Andalucía",
      "Un baile tradicional"
    ],
    correct: 0
  },
  {
    q: "«Mi madre quiere que yo _____ más ordenado.» Completa con la forma correcta.",
    a: [
      "sea",
      "soy",
      "estoy"
    ],
    correct: 0
  },
  {
    q: "«Por la mañana, yo _____ a las siete.» ¿Qué forma verbal es la correcta?",
    a: [
      "me levanto",
      "levanto",
      "me levantar"
    ],
    correct: 0
  },
  {
    q: "«_____ tres años que vivo en Madrid.» ¿Qué palabra completa la frase?",
    a: [
      "Hace",
      "Desde",
      "Por"
    ],
    correct: 0
  },
  {
    q: "«Son _____ tres y media de la tarde.» ¿Qué artículo es el correcto?",
    a: [
      "las",
      "los",
      "la"
    ],
    correct: 0
  },
  {
    q: "«Cuando llegué a casa, mi hermano _____ la televisión.» Completa correctamente.",
    a: [
      "veía",
      "vio",
      "ve"
    ],
    correct: 0
  },
  {
    q: "En España, ¿qué es el DNI?",
    a: [
      "El documento nacional de identidad",
      "Un permiso de conducir",
      "Una tarjeta de transporte público"
    ],
    correct: 0
  },
  {
    q: "En un restaurante, al terminar de comer le pides al camarero:",
    a: [
      "La cuenta, por favor",
      "El menú, por favor",
      "La carta, por favor"
    ],
    correct: 0
  },
  {
    q: "«Estoy embarazada» significa:",
    a: [
      "Estoy esperando un bebé",
      "Tengo vergüenza",
      "Estoy enfadada"
    ],
    correct: 0
  },
  {
    q: "En España, la fecha «12/03/2026» se lee como:",
    a: [
      "12 de marzo de 2026",
      "3 de diciembre de 2026",
      "12 de diciembre de 2003"
    ],
    correct: 0
  },
  {
    q: "Para obtener la nacionalidad española, además del DELE A2, también debes aprobar:",
    a: [
      "La prueba CCSE (conocimientos constitucionales y socioculturales)",
      "Un examen oral en el consulado",
      "Un test de cultura general libre"
    ],
    correct: 0
  }
];

// ----------------------------
// STATE
// ----------------------------
let correctCount = 0;
let wrongCount = 0;
let answeredCount = 0;
let totalQuestions = INLINE_TEST_QUESTIONS.length;

let currentRow = 0;

// ----------------------------
// UI TARGETS
// ----------------------------
const container = document.getElementById("inline-test-questions");

// ----------------------------
// PROGRESS DISPLAY
// ----------------------------
function updateProgressDisplay() {
  const el = document.getElementById("inline-progress-text");
  if (el) el.textContent = `Progreso: ${answeredCount} / ${totalQuestions} preguntas`;
}

function updateProgressBar() {
  const pct = (answeredCount / totalQuestions) * 100;
  document.getElementById("inline-progressbar").style.width = pct + "%";
}

// ----------------------------
// UTILITIES
// ----------------------------
function shuffleAnswers(question) {
  const combined = question.a.map((opt, index) => ({
    text: opt,
    isCorrect: index === question.correct
  }));

  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  question.a = combined.map(i => i.text);
  question.correct = combined.findIndex(i => i.isCorrect);
}

function createDonutChart() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const C = 2 * Math.PI * 40;

  return `
    <div class="donut-wrapper">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#fde8e8" stroke-width="12" fill="none"></circle>
        <circle cx="50" cy="50" r="40" stroke="#c41e3a" stroke-width="12" fill="none"
          stroke-dasharray="${(pct / 100) * C} ${(1 - pct / 100) * C}"
          transform="rotate(-90 50 50)" stroke-linecap="round"></circle>
      </svg>
      <div class="donut-center">${pct}%</div>
    </div>
  `;
}

function createEndCard() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const card = document.createElement("div");
  card.className = "inline-question-card end-card";

  const title =
    pct >= 80 ? "¡Excelente trabajo!" :
    pct >= 50 ? "¡Muy bien!" :
    pct >= 25 ? "¡Buen comienzo!" :
    "¡Sigue practicando!";

  card.innerHTML = `
    <h3>${title}</h3>
    ${createDonutChart()}
    <p>Has completado las preguntas de ejemplo gratuitas.
    Obtén acceso a <strong>todas las simulaciones y tareas</strong>, con evaluación detallada por IA.</p>
    <a href="https://civiclearn.com/dele/checkout" class="hero-primary-btn">Acceso completo</a>
  `;

  return card;
}

// ----------------------------
// BUILD ROWS
// ----------------------------
const rows = [];
for (let i = 0; i < totalQuestions; i += QUESTIONS_PER_ROW) {
  rows.push(INLINE_TEST_QUESTIONS.slice(i, i + QUESTIONS_PER_ROW));
}

INLINE_TEST_QUESTIONS.forEach(q => shuffleAnswers(q));

// ----------------------------
// RENDERING
// ----------------------------
function renderRow(rowIndex) {
  if (!rows[rowIndex]) return;

  rows[rowIndex].forEach((q, offset) => {
    const absoluteIndex = rowIndex * QUESTIONS_PER_ROW + offset;
    container.appendChild(createQuestionCard(q, absoluteIndex));
  });
}

function createQuestionCard(questionObj, absoluteIndex) {
  const card = document.createElement("div");
  card.className = "inline-question-card";

  const title = document.createElement("h3");
  title.textContent = questionObj.q;

  const feedback = document.createElement("div");
  feedback.className = "inline-feedback";

  card.append(title);

  questionObj.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "inline-option-btn";
    btn.textContent = opt;

    btn.onclick = () => {
      answeredCount++;
      updateProgressDisplay();
      updateProgressBar();

      card.querySelectorAll("button").forEach(b => (b.disabled = true));

      if (i === questionObj.correct) {
        correctCount++;
        btn.style.background = "rgba(24, 160, 110, 0.15)";
        btn.style.borderColor = "#18a06e";
        btn.style.color = "#14805a";
        feedback.textContent = "¡Correcto!";
        feedback.classList.add("inline-correct");
      } else {
        wrongCount++;
        btn.style.background = "rgba(230, 57, 70, 0.12)";
        btn.style.borderColor = "#e63946";
        btn.style.color = "#c5303b";
        const allBtns = card.querySelectorAll("button");
        allBtns[questionObj.correct].style.background = "rgba(24, 160, 110, 0.15)";
        allBtns[questionObj.correct].style.borderColor = "#18a06e";
        allBtns[questionObj.correct].style.color = "#14805a";
        feedback.textContent =
          "Respuesta correcta: " + questionObj.a[questionObj.correct];
        feedback.classList.add("inline-wrong");
      }

      card.appendChild(feedback);

      const isLastQuestion = absoluteIndex === totalQuestions - 1;

      if (isLastQuestion) {
        setTimeout(() => container.appendChild(createEndCard()), 300);
      }

      const isLastInRow =
        (absoluteIndex + 1) % QUESTIONS_PER_ROW === 0 &&
        absoluteIndex !== totalQuestions - 1;

      if (isLastInRow) {
        currentRow++;
        renderRow(currentRow);
      }
    };

    card.appendChild(btn);
  });

  return card;
}

// ----------------------------
// INITIAL RENDER
// ----------------------------
renderRow(0);
updateProgressDisplay();
updateProgressBar();
