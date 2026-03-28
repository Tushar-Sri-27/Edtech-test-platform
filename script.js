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

let currentIndex = 0;
let score=0;

function loadQuestion() {
    const q = questions[currentIndex];

    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;

        btn.onclick = () => checkAnswer(option);

        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === questions[currentIndex].answer) {
        score++;
        alert("Correct!");
    } else {
        alert("Wrong!");
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