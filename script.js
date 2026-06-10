const questionPool = [
    {
        question: "What is CPU?",
        options: ["Brain", "Memory", "Storage", "None"],
        answer: "Brain"
    },
    {
        question: "What is RAM?",
        options: ["Temporary Memory", "Permanent", "CPU", "None"],
        answer: "Temporary Memory"
    },
    {
        question: "What is ROM?",
        options: ["Read Only Memory", "Random Memory", "Cache", "None"],
        answer: "Read Only Memory"
    },
    {
        question: "What is OS?",
        options: ["Operating System", "Output System", "Open Software", "None"],
        answer: "Operating System"
    },
    {
        question: "What is HDD?",
        options: ["Storage Device", "CPU", "RAM", "None"],
        answer: "Storage Device"
    }
];
questionPool.sort(() => Math.random() - 0.5);
let questions = questionPool.slice(0, 3);
let currentIndex = 0;
let score=0;
let testFinished = false;
let answered = false;

function loadQuestion() {
    answered = false;
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


function generateQuestions() {
    const content = document.getElementById("contentInput").value;

    console.log("RAW CONTENT:", content); // ✅ AFTER declaration

    const sentences = content
        .split(/[.\n]/)
        .map(s => s.trim())
        .filter(s => s.length > 5);

    console.log("Sentences:", sentences);

    const generated = [];

    sentences.slice(0, 5).forEach(sentence => {
    const words = sentence.split(" ");

    if (words.length >= 2) {
        let answer = words[words.length - 1];

        // clean answer safely
        answer = answer.replace(/[^a-zA-Z]/g, "");

        if (!answer) return; // skip empty

        const questionText = sentence.replace(answer, "_____");

        generated.push({
            question: questionText,
            options: generateOptions(answer),
            answer: answer
        });
    }
});

    console.log("Generated:", generated);

    if (generated.length === 0) {
        alert("No questions generated. Try different content.");
        return;
    }

    questions = generated;

    currentIndex = 0;
    score = 0;
    testFinished = false;

    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("result").innerText = "";

    loadQuestion();
}

function generateOptions(correct) {
    const options = [correct];

    const dummy = ["Network", "Device", "Protocol", "Data", "System"];

    while (options.length < 4) {
        const rand = dummy[Math.floor(Math.random() * dummy.length)];
        if (!options.includes(rand)) {
            options.push(rand);
        }
    }

    return options.sort(() => Math.random() - 0.5);
}

function checkAnswer(selected) {
    answered = true;

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
    document.getElementById("score").innerText = "Score: " + score;
}

function nextQuestion() {
    if (!answered) {
        alert("Please select an answer first!");
        return;
    }

    currentIndex++;

    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("question").innerText = "Test Finished!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("result").innerText =
            "Final Score: " + score + " / " + questions.length;

        testFinished = true; // 🔥 mark finished
    }
}
function resetTest() {
    testFinished = false; // 🔥 ADD HERE

    currentIndex = 0;
    score = 0;

    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("result").innerText = "";

    // reshuffle and pick new questions
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    questions.length = 0;
    questions.push(...shuffled.slice(0, 3));

    loadQuestion();
}
function handleNext() {
    if (testFinished) {
        resetTest();
    } else {
        nextQuestion();
    }
}

loadQuestion();