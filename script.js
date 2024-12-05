/**
 * Haal een willekeurig woord op van de API
 * @returns - Het willekeurige woord
 */
async function getWord() {
    const response = await fetch("https://random-word-bit.vercel.app/word");
    const word = await response.json();
    return word[0].word.toLowerCase();
}

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const timerElement = document.getElementById("timer");
const currentWordElement = document.getElementById("current-word");
const inputElement = document.getElementById("input-word");
const gameContainer = document.getElementById("game-container");
const resultContainer = document.getElementById("result-container");
const finalWordCount = document.getElementById("final-word-count");
const finalCharCount = document.getElementById("final-char-count");

let timer = 60;
let wordCount = 0;
let charCount = 0;
let currentWord = "";
let gameInterval;

const startGame = async () => {
    startButton.style.display = "none";
    resultContainer.style.display = "none";
    gameContainer.style.display = "block";
    inputElement.disabled = false;
    inputElement.focus();
    timer = 60;
    wordCount = 0;
    charCount = 0;

    const updateTimer = () => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    };
    timerElement.textContent = timer;
    gameInterval = setInterval(updateTimer, 1000);

    await showNewWord();
};

const showNewWord = async () => {
    currentWord = await getWord();
    currentWordElement.textContent = currentWord;
    inputElement.value = "";
};

inputElement.addEventListener("input", () => {
    if (inputElement.value === currentWord) {
        wordCount++;
        charCount += currentWord.length;
        showNewWord();
    }
});

const endGame = () => {
    inputElement.disabled = true;
    gameContainer.style.display = "none";
    resultContainer.style.display = "block";
    finalWordCount.textContent = wordCount;
    finalCharCount.textContent = charCount;
};

startButton.addEventListener("click", startGame);
