class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cellElements = document.querySelectorAll('.cell');
        this.statusDisplay = document.getElementById('status');
        this.resetButton = document.getElementById('reset-btn');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.cellElements.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
    }
    
    handleCellClick(cell) {
        const index = cell.getAttribute('data-index');
        
        if (!this.gameActive || this.board[index] !== null) return;
        
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWinner()) {
            this.statusDisplay.textContent = `Player ${this.currentPlayer} Wins!`;
            this.gameActive = false;
            return;
        }
        
        if (this.checkDraw()) {
            this.statusDisplay.textContent = "It's a Draw!";
            this.gameActive = false;
            return;
        }
        
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s Turn`;
    }
    
    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];
        
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return this.board[a] &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== null);
    }
    
    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cellElements.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        
        this.statusDisplay.textContent = "Player X's Turn";
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

document.getElementById("changeColor").addEventListener("click", changeColor);

let colorIndex = 0;

function changeColor() {
    const colors = ['#c8c8c8', '#522f8b', '#4c4c4c'];
    colorIndex = (colorIndex + 1) % colors.length;

    document.documentElement.style.setProperty('--backgroundcolor', colors[colorIndex]);
}
