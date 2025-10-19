// Sudoku Solver — Final Stable Version with Random Puzzles + Input Restriction

let arr = [[], [], [], [], [], [], [], [], []];
let solutionArr = [[], [], [], [], [], [], [], [], []];
let board = [[], [], [], [], [], [], [], [], []];
let solvedBoard = [[], [], [], [], [], [], [], [], []];

// ✅ Build both Sudoku grids dynamically after page load
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const solutionBoard = document.getElementById("solution-board");

  // Build 9x9 Sudoku grids
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("div");
      cell.contentEditable = true;
      cell.id = i * 9 + j;
      container.appendChild(cell);
      arr[i][j] = cell;

      // Restrict input to digits 1–9 only
      cell.addEventListener("input", (e) => {
        let val = e.target.innerText.replace(/[^1-9]/g, ""); // allow only digits
        if (val.length > 1) val = val.charAt(0); // only one digit allowed
        e.target.innerText = val;
      });

      const sCell = document.createElement("div");
      solutionBoard.appendChild(sCell);
      solutionArr[i][j] = sCell;
    }
  }

  // Buttons
  document.getElementById("generate-sudoku").addEventListener("click", generatePuzzle);
  document.getElementById("check").addEventListener("click", checkAnswers);
});

// ✅ Generate Sudoku puzzle (New API + Random each time)
function generatePuzzle() {
  document.getElementById("solution-container").style.display = "none";

  fetch("https://sudoku-api.vercel.app/api/dosuku")
    .then((res) => res.json())
    .then((data) => {
      board = data.newboard.grids[0].value; // get new random puzzle
      renderBoard(board);
      solvedBoard = JSON.parse(JSON.stringify(board));
      solveSudoku(solvedBoard);
    })
    .catch(() => {
      console.warn("⚠️ API failed, using fallback puzzle.");
      // Fallback puzzle if API fails
      board = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ];
      renderBoard(board);
      solvedBoard = JSON.parse(JSON.stringify(board));
      solveSudoku(solvedBoard);
    });
}

// ✅ Render Sudoku board
function renderBoard(b) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      arr[i][j].innerText = b[i][j] === 0 ? "" : b[i][j];
      arr[i][j].style.color = b[i][j] === 0 ? "green" : "#DC3545";
      arr[i][j].style.background = "white";
    }
  }
}

// ✅ Read user entries
function readUserBoard() {
  let user = Array.from({ length: 9 }, () => Array(9).fill(0));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = arr[i][j].innerText.trim();
      user[i][j] = val ? Number(val) : 0;
    }
  }
  return user;
}

// ✅ Sudoku Solver (Backtracking)
function isPossible(board, sr, sc, val) {
  for (let i = 0; i < 9; i++)
    if (board[sr][i] === val || board[i][sc] === val) return false;

  const r = sr - (sr % 3), c = sc - (sc % 3);
  for (let i = r; i < r + 3; i++)
    for (let j = c; j < c + 3; j++)
      if (board[i][j] === val) return false;

  return true;
}

function solveSudokuHelper(board, sr, sc) {
  if (sr === 9) return true;
  if (sc === 9) return solveSudokuHelper(board, sr + 1, 0);
  if (board[sr][sc] !== 0) return solveSudokuHelper(board, sr, sc + 1);

  for (let val = 1; val <= 9; val++) {
    if (isPossible(board, sr, sc, val)) {
      board[sr][sc] = val;
      if (solveSudokuHelper(board, sr, sc + 1)) return true;
      board[sr][sc] = 0;
    }
  }
  return false;
}

function solveSudoku(board) {
  solveSudokuHelper(board, 0, 0);
}

// ✅ Check user's answers
function checkAnswers() {
  const user = readUserBoard();
  let correct = true;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (user[i][j] === solvedBoard[i][j]) {
        arr[i][j].classList.add("correct");
        arr[i][j].classList.remove("incorrect");
      } else {
        arr[i][j].classList.add("incorrect");
        arr[i][j].classList.remove("correct");
        correct = false;
      }
    }
  }

  if (correct) {
    alert("🎉 You solved it perfectly!");
  } else {
    alert("❌ Some answers are incorrect. The correct solution is shown beside your board.");
    showSolutionBoard(solvedBoard);
  }
}

// ✅ Display the correct Sudoku beside user’s board
function showSolutionBoard(board) {
  document.getElementById("solution-container").style.display = "block";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      solutionArr[i][j].innerText = board[i][j];
    }
  }
}
