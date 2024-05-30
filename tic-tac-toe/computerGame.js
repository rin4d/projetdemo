const O_TEXT = "O";
const X_TEXT = "X";
const HUMAN_PLAYER = X_TEXT;
const AI_PLAYER = O_TEXT;
const DEPTH = 3; // Profondeur de recherche pour l'algorithme Alpha-Beta

let currentPlayer = HUMAN_PLAYER;
let spaces = Array(9).fill(null);
let scores = { X: 0, O: 0 };
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let boxes = Array.from(document.getElementsByClassName('box'));
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let resetScoreBtn = document.getElementById('resetScoreBtn');
let scoreXElement = document.getElementById('scoreX');
let scoreOElement = document.getElementById('scoreO');

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    if (currentPlayer === HUMAN_PLAYER) {
        const id = e.target.id;

        if (!spaces[id]) {
            spaces[id] = currentPlayer;
            e.target.innerText = currentPlayer;

            if (playerHasWon(HUMAN_PLAYER)) {
                playerText.innerHTML = `${HUMAN_PLAYER} has won!`;
                let winning_blocks = getWinningBlocks(HUMAN_PLAYER);
                winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
                updateScore(HUMAN_PLAYER);
                return;
            } else if (spaces.every(space => space !== null)) {
                playerText.innerHTML = "It's a draw!";
                return;
            }

            currentPlayer = AI_PLAYER;
            setTimeout(alphaBetaMove, 500); // Ajouter un délai de 500 ms avant que l'ordinateur ne joue
        }
    }
}

function alphaBetaMove() {
    let bestMove = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < spaces.length; i++) {
        if (spaces[i] === null) {
            spaces[i] = AI_PLAYER;
            let score = alphaBetaPruning(spaces, DEPTH, -Infinity, Infinity, false);
            spaces[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    spaces[bestMove] = AI_PLAYER;
    boxes[bestMove].innerText = AI_PLAYER;

    if (playerHasWon(AI_PLAYER)) {
        playerText.innerHTML = `${AI_PLAYER} has won!`;
        let winning_blocks = getWinningBlocks(AI_PLAYER);
        winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
        updateScore(AI_PLAYER);
        return;
    } else if (spaces.every(space => space !== null)) {
        playerText.innerHTML = "It's a draw!";
        return;
    }

    currentPlayer = HUMAN_PLAYER;
}

function alphaBetaPruning(board, depth, alpha, beta, isMaximizingPlayer) {
    let result = evaluate(board);

    if (result !== null || depth === 0) {
        return result;
    }

    if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = AI_PLAYER;
                let eval = alphaBetaPruning(board, depth - 1, alpha, beta, false);
                maxEval = Math.max(maxEval, eval);
                alpha = Math.max(alpha, eval);
                board[i] = null;
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = HUMAN_PLAYER;
                let eval = alphaBetaPruning(board, depth - 1, alpha, beta, true);
                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                board[i] = null;
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return minEval;
    }
}

function evaluate(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let humanScore = 0;
    let aiScore = 0;

    // Évalue les lignes, colonnes et diagonales
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const line = [board[a], board[b], board[c]];
        const humanCount = line.filter(cell => cell === HUMAN_PLAYER).length;
        const aiCount = line.filter(cell => cell === AI_PLAYER).length;

        // Évalue en fonction du nombre de jetons alignés
        if (humanCount === 3) humanScore += 100;
        if (aiCount === 3) aiScore += 100;
        if (humanCount === 2 && line.includes(null)) humanScore += 10;
        if (aiCount === 2 && line.includes(null)) aiScore += 10;
        if (humanCount === 1 && line.includes(null)) humanScore += 1;
        if (aiCount === 1 && line.includes(null)) aiScore += 1;
    }

    // Évalue le contrôle du centre du plateau
    const centerControl = (board[4] === HUMAN_PLAYER) ? 1 : ((board[4] === AI_PLAYER) ? -1 : 0);
    humanScore += centerControl;
    aiScore -= centerControl;

    // Évalue

    
        // Évalue le contrôle des coins
        const corners = [board[0], board[2], board[6], board[8]];
        const humanCornerCount = corners.filter(cell => cell === HUMAN_PLAYER).length;
        const aiCornerCount = corners.filter(cell => cell === AI_PLAYER).length;
        humanScore += humanCornerCount * 0.5;
        aiScore -= aiCornerCount * 0.5;
    
        // Évalue la mobilité
        const humanMoves = board.filter(cell => cell === null).length;
        const aiMoves = 9 - humanMoves;
        humanScore += humanMoves * 0.1;
        aiScore -= aiMoves * 0.1;
    
        // Retourne la différence entre les scores
        return aiScore - humanScore;
    }
    
    function playerHasWon(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (spaces[a] === player && spaces[b] === player && spaces[c] === player) {
                return true;
            }
        }
        return false;
    }
    
    function getWinningBlocks(player) {
        const winningBlocks = [];
    
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (spaces[a] === player && spaces[b] === player && spaces[c] === player) {
                winningBlocks.push(a, b, c);
            }
        }
    
        return winningBlocks;
    }
    
    function updateScore(winner) {
        scores[winner]++;
        scoreXElement.innerText = scores.X;
        scoreOElement.innerText = scores.O;
    }
    
    function restart() {
        spaces.fill(null);
    
        boxes.forEach(box => {
            box.innerText = '';
            box.style.backgroundColor = '';
        });
    
        playerText.innerHTML = 'Tic Tac Toe';
        currentPlayer = HUMAN_PLAYER;
    }
    
    function resetScores() {
        scores = { X: 0, O: 0 };
        scoreXElement.innerText = scores.X;
        scoreOElement.innerText = scores.O;
        restart();
    }
    
    startGame();
    