const boardSize = 4;
let board = [];

function initBoard() {
    board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(0));
    addRandomTile();
    addRandomTile();
    updateBoard();
}

function addRandomTile() {
    let emptyCells = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }
    if (emptyCells.length > 0) {
        let { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    let gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            tile.textContent = board[r][c] !== 0 ? board[r][c] : "";
            gameBoard.appendChild(tile);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initBoard();
});
document.addEventListener("keydown", (event) => {
    let moved = false;
    if (event.key === "ArrowUp") moved = moveUp();
    if (event.key === "ArrowDown") moved = moveDown();
    if (event.key === "ArrowLeft") moved = moveLeft();
    if (event.key === "ArrowRight") moved = moveRight();

    if (moved) {
        addRandomTile();
        updateBoard();
    }
});
function moveLeft() {
    let moved = false;
    for (let r = 0; r < boardSize; r++) {
        let newRow = board[r].filter(num => num !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
            }
        }
        newRow = newRow.filter(num => num !== 0);
        while (newRow.length < boardSize) newRow.push(0);
        if (newRow.toString() !== board[r].toString()) moved = true;
        board[r] = newRow;
    }
    return moved;
}

function moveRight() {
    board.forEach(row => row.reverse());
    let moved = moveLeft();
    board.forEach(row => row.reverse());
    return moved;
}

function moveUp() {
    rotateBoard();
    let moved = moveLeft();
    rotateBoardBack();
    return moved;
}

function moveDown() {
    rotateBoard();
    let moved = moveRight();
    rotateBoardBack();
    return moved;
}

function rotateBoard() {
    board = board[0].map((_, i) => board.map(row => row[i])).reverse();
}

function rotateBoardBack() {
    board = board.reverse()[0].map((_, i) => board.map(row => row[i]));
}
