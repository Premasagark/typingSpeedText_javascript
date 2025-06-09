const quotes = [
  // Quotes
  "The best way to get started is to quit talking and begin doing.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "Doubt kills more dreams than failure ever will.",
  "The only limit to our realization of tomorrow is our doubts of today.",

  // Proverbs
  "A journey of a thousand miles begins with a single step.",
  "Actions speak louder than words.",
  "The early bird catches the worm.",
  "You can’t have your cake and eat it too.",
  "When in Rome, do as the Romans do.",

  // Idioms
  "Break the ice.",
  "Hit the nail on the head.",
  "Spill the beans.",
  "Bite the bullet.",
  "Let the cat out of the bag.",
];

let quote = "";
let startTime;
let timerInterval;


const textToType = document.getElementById("text-to-type");
const inputField = document.getElementById("floatingTextarea");
const time = document.getElementById("time");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");


function getRandomQuote() {
    const randomIndex = Math.floor(Math.random()*quotes.length);
    return quotes[randomIndex];
}


function startTest() {
    quote = getRandomQuote();
    textToType.textContent = quote;
    inputField.value = "";
    time.textContent = "0";
    wpm.textContent = "0";
    accuracy.textContent = "0";
    clearInterval(timerInterval);
    startTime = null;

    inputField.disabled = false;
    inputField.focus();
}

function startTimer(){
    startTime =  new Date();

    timerInterval = setInterval(() =>{
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        time.textContent = elapsed;
        updatestats();
    },1000);
}

function updatestats(){
    const inputText = inputField.value;
    const wordsTyped = inputText.trim().split(/\s+/).length;

    // Time
    const elapsed = Math.floor((new Date() - startTime) / 1000);

    // WPM
    const wpmvalue = elapsed > 0 ? Math.floor((wordsTyped / elapsed) * 60): 0;

    // Accuracy
    let correctChars = 0;
    for(let i = 0; i < inputText.length && i < quote.length; i++){
        if (inputText[i] === quote[i]) correctChars++;
    }
    const accuracyValue = quote.length > 0 ? Math.floor((correctChars / quote.length) * 100) : 0;

    wpm.textContent = wpmvalue;
    accuracy.textContent = accuracyValue;

}


inputField.addEventListener("input", () => {
    if (!startTime) startTimer();

    if (inputField.value === quote) {
        clearInterval(timerInterval);
        updatestats();
        inputField.disabled = true;
    }
});

window.onload = startTest;