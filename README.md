Users can play, solve, and verify Sudoku puzzles interactively in their browser with this "Sudoku Solver 
Web Application". Every time, it creates a new random Sudoku puzzle and, in the event that a mistake is 
made, automatically shows the correct solution next to the user's board.
----------------------------------------------------

FEATURES:
1)Generator of Random Sudoku Puzzles
The [Dosuku Sudoku API] is used to retrieve a fresh Sudoku 
puzzle each time the "Get New Puzzle" button is clicked. 
It operates online and switches to a sample puzzle in case the network isn't available.
2)Interactive Sudoku Grid
A 9x9 grid that is dynamically constructed using JavaScript, HTML, and CSS To solve the puzzle, users 
can input their own numbers.
3)Validation of Input 
Each cell can only contain the numbers 1–9. 
- Prevents multiple numbers, letters, and symbols from appearing in the same box.
4)Automatic Verification 
To verify your responses, click "Submit." 
Inaccurate numbers turn red, while correct numbers turn green. 
The full correct Sudoku solution is displayed next to the user's grid if any mistakes are detected.
5)Offline Fallback: In the event that the API cannot be accessed, an integrated sample Sudoku puzzle 
loads automatically.
---------------------------------------------------------
TECH STACK:
 HTML5-Structure of the web interface 
 CSS3-Styling and layout for Sudoku grids
JavaScript(ES6)-Logic for puzzle generation, solving, and validation 
Dosuku-Sudoku API Source of random puzzles
-----------------------------------------------------------
HOW TO RUN THE PROJECT
1.Download or clone this project folder. 
2. Make sure all files (`index.html`, `style.css`, `script.js`, `README.md`) are in the same directory. 
3. Open `index.html` in your web browser (Chrome, Edge, Firefox, etc.).
4.Click on "Get New puzzle" to generate sudoko.
5. Type your answers (only numbers 1–9).
6. Click “Submit” to check your solution: -
   ✅ Correct cells turn green. 
   ❌Incorrect cells turn red and the correct Sudoku appears beside it.
