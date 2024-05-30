const randomNumber = Math.floor(Math.random() * 100) + 1;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton'); 
const resultDisplay = document.getElementById('result');

function checkGuess() {
    const userGuess = Number(guessInput.value);

    if (userGuess === randomNumber) {
        resultDisplay.textContent = 'Félicitations! Vous avez trouvé le bon nombre!';
    } else if (userGuess < randomNumber) {
        resultDisplay.textContent = 'Trop bas! Essayez un nombre plus élevé.';
    } else if (userGuess > randomNumber) {
        resultDisplay.textContent = 'Trop haut! Essayez un nombre plus bas.';
    }

    guessInput.value = '';
}
 
guessButton.addEventListener('click', checkGuess);