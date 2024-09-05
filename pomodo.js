let pomodoroMinutes = 25;
let breakMinutes = 5; // Default break minutes
let seconds = 0;
let isBreakTime = false;
let interval;
let points = 0;
let sessionsCompleted = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const breakMinutesDisplay = document.getElementById('break-minutes');
const pointsDisplay = document.getElementById('points');
const sessionsDisplay = document.getElementById('sessions');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const incrementBreakButton = document.getElementById('increment-break');
const buyButtons = document.querySelectorAll('.buy-button');

function startTimer() {
    if (interval) return; // Prevent multiple intervals
    
    interval = setInterval(() => {
        if (seconds === 0) {
            if (pomodoroMinutes === 0) {
                if (isBreakTime) {
                    clearInterval(interval);
                    interval = null;
                    resetTimer();
                    alert('Break over! Back to work!');
                } else {
                    points += 10;
                    sessionsCompleted += 1;
                    isBreakTime = true;
                    pomodoroMinutes = breakMinutes;
                    alert('Pomodoro session completed! Time for a break.');
                    updateRewards();
                }
            } else {
                pomodoroMinutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    pomodoroMinutes = 25;
    seconds = 0;
    isBreakTime = false;
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = String(pomodoroMinutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    breakMinutesDisplay.textContent = breakMinutes;
}

function updateRewards() {
    pointsDisplay.textContent = points;
    sessionsDisplay.textContent = sessionsCompleted;
}

// Increment Break Time
incrementBreakButton.addEventListener('click', () => {
    breakMinutes++;
    updateDisplay();
});

// Shop functionality
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemPrice = parseInt(button.parentElement.getAttribute('data-price'));
        if (points >= itemPrice) {
            points -= itemPrice;
            alert('You bought the item!');
            updateRewards();
        } else {
            alert('Not enough points to buy this item!');
        }
    });
});

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
