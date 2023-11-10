const status = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            highlightWinnerCells(combo);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

function highlightWinnerCells(cells) {
    cells.forEach(index => {
        const cell = board.children[index];
        cell.style.backgroundColor = 'lightgreen';
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Current Player: X';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
}

createBoard();