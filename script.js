let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("reset");

// Проверяем, что элементы существуют
if (!display || !startButton || !resetButton) {
    console.error("Не удалось найти один или несколько элементов. Проверьте HTML.");
} else {
    function formatTimer(ms) {
        const date = new Date(ms);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    function updateDisplay() {
        display.textContent = formatTimer(elapsedTime);
    }

    function startStop() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            startButton.textContent = "Stop";
            isRunning = true;
        } else {
            clearInterval(timerInterval);
            startButton.textContent = "Start";
            isRunning = false;
        }
    }

    function reset() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateDisplay();
        startButton.textContent = "Start";
        isRunning = false;
    }

    startButton.addEventListener("click", startStop);
    resetButton.addEventListener("click", reset);

    // Инициализация отображения
    updateDisplay();
}