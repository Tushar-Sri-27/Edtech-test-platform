const questions = [
    {
        question: "What is CPU?",
        options: ["Brain", "Memory", "Storage", "None"],
        answer: "Brain"
    },
    {
        question: "What is RAM?",
        options: ["Temporary Memory", "Permanent", "CPU", "None"],
        answer: "Temporary Memory"
    }
];
questions.sort(() => Math.random() - 0.5);

let currentIndex = 0;
let score=0;

function loadQuestion() {
    const q = questions[currentIndex];

    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;

        btn.onclick = () => checkAnswer(option);

        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const buttons = document.querySelectorAll("#options button");

    buttons.forEach(btn => {
        btn.disabled = true;

        if (btn.innerText === questions[currentIndex].answer) {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
        }

        if (btn.innerText === selected && selected !== questions[currentIndex].answer) {
            btn.style.backgroundColor = "red";
            btn.style.color = "white";
        }
    });

    if (selected === questions[currentIndex].answer) {
        score++;
    }
}

function nextQuestion() {
    currentIndex++;

    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Test Finished! Your score: " + score);
    }
}

loadQuestion();