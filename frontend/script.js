const API_BASE = "http://localhost:8080/OnlineExam";

let questions = [];
let userAnswers = [];
let currentIndex = 0;
let timerInterval = null;
let timeLeft = 10;
let selectedOption = null;
const QUESTION_TIME = 10;
const CIRCUMFERENCE = 163.4; // 2π × 26

/* ─── Start Exam ─── */
async function startExam() {
    try {
        const res = await fetch(`${API_BASE}/questions`);
        questions = await res.json();
    } catch (e) {
        alert("Could not connect to the backend.\nMake sure Spring Boot is running on port 8080.");
        return;
    }

    userAnswers = new Array(questions.length).fill(null);
    currentIndex = 0;

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("examScreen").classList.remove("hidden");

    loadQuestion(currentIndex);
}

/* ─── Load Question ─── */
function loadQuestion(index) {
    clearInterval(timerInterval);
    selectedOption = null;

    const q = questions[index];
    const total = questions.length;

    // UI updates
    document.getElementById("qIndex").textContent = `Q${index + 1}`;
    document.getElementById("qText").textContent = q.question;
    document.getElementById("questionCounter").textContent = `Question ${index + 1} of ${total}`;
    document.getElementById("progressBar").style.width = `${((index) / total) * 100}%`;
    document.getElementById("nextBtn").disabled = true;

    // Render options
    const grid = document.getElementById("optionsGrid");
    grid.innerHTML = "";
    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => selectOption(btn, opt);
        grid.appendChild(btn);
    });

    // Start timer
    startTimer(index);
}

/* ─── Timer ─── */
function startTimer(index) {
    timeLeft = QUESTION_TIME;
    updateTimerUI(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoAdvance(index);
        }
    }, 1000);
}

function updateTimerUI(t) {
    const num = document.getElementById("timerNum");
    const ring = document.getElementById("timerRing");

    num.textContent = t;
    const offset = CIRCUMFERENCE * (1 - t / QUESTION_TIME);
    ring.style.strokeDashoffset = offset;

    ring.classList.remove("warning", "danger");
    if (t <= 3) ring.classList.add("danger");
    else if (t <= 5) ring.classList.add("warning");
}

/* ─── Option Selection ─── */
function selectOption(btn, value) {
    // Deselect all
    document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedOption = value;

    document.getElementById("nextBtn").disabled = false;
}

/* ─── Auto-advance on timeout ─── */
function autoAdvance(index) {
    // Lock all options
    lockOptions(index, null);
    userAnswers[index] = null; // null = not answered

    setTimeout(() => advance(), 800);
}

/* ─── Skip ─── */
function skipQuestion() {
    clearInterval(timerInterval);
    userAnswers[currentIndex] = null;
    lockOptions(currentIndex, null);
    setTimeout(() => advance(), 300);
}

/* ─── Next ─── */
function nextQuestion() {
    clearInterval(timerInterval);
    userAnswers[currentIndex] = selectedOption;
    lockOptions(currentIndex, selectedOption);
    setTimeout(() => advance(), 600);
}

function advance() {
    currentIndex++;
    if (currentIndex >= questions.length) {
        submitExam();
    } else {
        loadQuestion(currentIndex);
    }
}

/* ─── Lock options & show feedback ─── */
function lockOptions(index, chosen) {
    const correct = questions[index].answer; // Not available from DTO, handled server-side
    // We only visually mark selected as "selected" — correct answer shown post-submit
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.disabled = true;
        if (chosen && btn.textContent === chosen) {
            btn.classList.add("selected");
        }
    });
}

/* ─── Submit to Backend ─── */
async function submitExam() {
    document.getElementById("examScreen").classList.add("hidden");

    const payload = userAnswers.map(a => a ?? "Not Answered");

    let data;
    try {
        const res = await fetch(`${API_BASE}/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: payload })
        });
        data = await res.json();
    } catch (e) {
        alert("Could not reach the backend. Check your connection.");
        return;
    }

    showResults(data);
}

/* ─── Show Results ─── */
function showResults(data) {
    document.getElementById("resultScreen").classList.remove("hidden");

    const { score, total, review } = data;
    const pct = score / total;

    // Score ring
    const circumference = 376.99;
    const offset = circumference * (1 - pct);
    document.getElementById("scoreNum").textContent = score;
    document.getElementById("scoreTotal").textContent = `/${total}`;

    setTimeout(() => {
        document.getElementById("scoreRing").style.strokeDashoffset = offset;
    }, 100);

    // Progress bar completion
    document.getElementById("progressBar").style.width = "100%";

    // Heading & message
    let heading, msg;
    if (pct === 1)       { heading = "Perfect Score! 🎉"; msg = "Outstanding! You answered every question correctly."; }
    else if (pct >= 0.8) { heading = "Excellent Work! 🌟"; msg = `You scored ${score} out of ${total}. Keep it up!`; }
    else if (pct >= 0.6) { heading = "Good Job! 👍"; msg = `You scored ${score} out of ${total}. Room to improve!`; }
    else if (pct >= 0.4) { heading = "Keep Practicing 📚"; msg = `You scored ${score} out of ${total}. Review your answers below.`; }
    else                 { heading = "Try Again 💪"; msg = `You scored ${score} out of ${total}. Don't give up!`; }

    document.getElementById("resultHeading").textContent = heading;
    document.getElementById("resultMsg").textContent = msg;

    // Review
    const list = document.getElementById("reviewList");
    list.innerHTML = "";
    review.forEach((r, i) => {
        const isCorrect = r.user === r.correct;
        const isSkipped = r.user === "Not Answered";
        const statusClass = isSkipped ? "skipped" : isCorrect ? "correct" : "wrong";
        const statusLabel = isSkipped ? "Skipped" : isCorrect ? "✔ Correct" : "✘ Wrong";

        const item = document.createElement("div");
        item.className = "review-item";
        item.innerHTML = `
            <span class="review-num">Q${i + 1}</span>
            <div class="review-body">
                <div class="review-q">${questions[i].question}</div>
                <div class="review-ans">
                    Your answer: <strong>${r.user}</strong>
                    ${!isCorrect ? ` · Correct: <strong>${r.correct}</strong>` : ""}
                </div>
            </div>
            <span class="review-status ${statusClass}">${statusLabel}</span>
        `;
        list.appendChild(item);
    });
}

/* ─── Restart ─── */
function restartExam() {
    document.getElementById("resultScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");
    document.getElementById("scoreRing").style.strokeDashoffset = "376.99";
    document.getElementById("progressBar").style.width = "5%";
}
