const themes = {
    animals: ["🐶", "🐱", "🦋", "🦆", "🐟", "🦄", "🐢", "🐸", "🐍", "🦜"],
    fruits: ["🍎", "🍌", "🍓", "🍇", "🍉", "🍒", "🥝", "🍍", "🍑", "🍋"]
};

let currentPlayer = 1;
let scores = [0, 0];

function startGame() {
    const difficulty = document.getElementById('difficulty').value;
    const theme = document.getElementById('theme').value;
    const gameBoard = document.querySelector('.game');

    gameBoard.innerHTML = '';
    gameBoard.className = `game grid-${difficulty}`;
    const size = parseInt(difficulty);
    const emojis = themes[theme].slice(0, (size * size) / 2);
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

    for (let i = 0; i < cards.length; i++) {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = cards[i];

        box.onclick = function() {
            this.classList.add('boxOpen');
            setTimeout(() => {
                const openBoxes = document.querySelectorAll('.boxOpen');
                if (openBoxes.length > 1) {
                    if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                        openBoxes.forEach(box => box.classList.add('boxMatch'));
                        openBoxes.forEach(box => box.classList.remove('boxOpen'));
                        scores[currentPlayer - 1]++;
                        updateScores();
                        if (document.querySelectorAll('.boxMatch').length === cards.length) {
                            alert(`Gagné par Joueur ${currentPlayer}!`);
                        }
                    } else {
                        openBoxes.forEach(box => box.classList.remove('boxOpen'));
                        currentPlayer = currentPlayer === 1 ? 2 : 1;
                        document.getElementById('player-turn').innerText = `Tour du joueur ${currentPlayer}`;
                    }
                }
            }, 500);
        };

        gameBoard.appendChild(box);
    }
}

function updateScores() {
    document.getElementById('player1-score').innerText = scores[0];
    document.getElementById('player2-score').innerText = scores[1];
}
