/////////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////////////////////////////////////////////////////////

let selectedCell = null;
let solvedPuzzle = [];
let allCells = null;
let noteMode = false;
let puzzle = [];
let rowIndex = null;
let colIndex = null;
let goalCorrect = 0;
let modal = 0;
const dificulty = localStorage.getItem('dificulty');
const size = localStorage.getItem('size');
let container = document.getElementById("sudoku9x9");
// if (size == 4){
//     container = document.getElementById("sudoku4x4");
// }
// else if (size == 6){
//     container = document.getElementById("sudoku6x6");
// }
// else if (size == 9){
//     container = document.getElementById("sudoku9x9");
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////
// SUDOKU GENERATION FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Generate a random Sudoku puzzle
function Fun_Generate_Random_Sudoku() {
    let puzzle = [];
    if (size == 4){
        puzzle = [
            [1, 3, 0, 0],
            [2, 4, 0, 0],
            [3, 0, 0, 0],
            [4, 0, 0, 0],
        ];
    }
    else if (size == 6){
        puzzle = [
            [1, 3, 5, 0, 0, 0],
            [2, 4, 6, 0, 0, 0],
            [3, 0, 0, 0, 0, 0],
            [4, 0, 0, 0, 0, 0],
            [5, 0, 0, 0, 0, 0],
            [6, 0, 0, 0, 0, 0]
        ];
    }
    else if (size == 9){
        puzzle = [
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
    }
    return puzzle;
}

// Create the Sudoku puzzle board
function Fun_Create_Sudoku_Board(puzzle) {
    container.innerHTML = "";
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add(`row${size}`);
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add(`cell${size}`);
            cell.setAttribute("editableStatus", 0);
            cell.setAttribute("pos_i", i);
            cell.setAttribute("pos_j", j);
            cell.classList.add("backgroundColor"); // Add classes to alternate the colors of the quadrants
            if (puzzle[i][j] !== 0) { // Add the numbers to the cells
                cell.textContent = puzzle[i][j];
                cell.editableStatus = 0;
            } 
            else { // Add the empty cells
                cell.editableStatus = 1;
                cell.textContent = "";
            }
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

// Counts the number of cells that are different from the solved puzzle
function Fun_Goal_Correct(){
    for (let i = 0; i < size; i++) {
        for (let j = 0 ; j < size; j++) {
            if (puzzle[i][j] != solvedPuzzle[i][j]) {
                goalCorrect++;
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// SUDOKU SOLVING FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Find an empty cell in the Sudoku puzzle
function Fun_Find_Empty_Cell(board) {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

// Check if a move is valid
function Fun_Is_Valid_Move(board, row, col, num) {
    // Check row
    for (let i = 0; i < size; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }
    // Check column
    for (let i = 0; i < size; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }
    if (size == 4){a = 2; b = 2;}
    else if (size == 6){a = 2; b = 3;}
    else if (size == 9){a = 3; b = 3;}
    let startRow = Math.floor(row / a) * a;
    let startCol = Math.floor(col / b) * b;
    for (let i = startRow; i < startRow + a; i++) {
        for (let j = startCol; j < startCol + b; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }   
    return true; // Move is valid
}

// Solve the Sudoku puzzle
function Fun_Solve_Sudoku(board) {
    // Placeholder for solving Sudoku puzzle
    const solvedPuzzle = JSON.parse(JSON.stringify(board));
    Fun_Solve_Helper(solvedPuzzle);
    return solvedPuzzle;
}

// Helper function for solving Sudoku recursively
function Fun_Solve_Helper(board) {
    const emptyCell = Fun_Find_Empty_Cell(board);
    if (!emptyCell) {
        return true; // Puzzle solved
    }
    const [row, col] = emptyCell;
    for (let num = 1; num <= size; num++) {
        if (Fun_Is_Valid_Move(board, row, col, num)) {
            board[row][col] = num;
            if (Fun_Solve_Helper(board)) {
                return true;
            }
            board[row][col] = 0; // Backtrack
        }
    }
    return false; // No valid number found for this cell
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
// SUDOKU AUXILARY FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////

function Fun_Check_Game_Over(){
    if(goalCorrect == 0){
        selectedCell.classList.remove("incorrect");
        selectedCell.classList.add("correct");
        selectedCell.classList.add("selected");
        setTimeout(function(){ alert("Parabéns! Você resolveu o Sudoku!"); }, 200);
    }
}

function Fun_Enable_Disable_Buttons(status) {
    if (status == true) { // Enable the buttons
        document.querySelectorAll(".numberButton").forEach((button, index) => {
            if (index < size) {
                button.disabled = false; // Enable buttons within the board size range
            } else {
                button.disabled = true; // Disable buttons outside the board size range
            }
        });
        document.getElementById("eraseButton").disabled = false; // Enable the erase button
        document.getElementById("noteButton").disabled = false; // Enable the note button
    } else { // Disable the buttons
        document.querySelectorAll(".numberButton").forEach(button => {
            button.disabled = true;
        });
        document.getElementById("eraseButton").disabled = true; // Disable the erase button
        if (noteMode == true) { // Reset note mode if active
            noteMode = false;
            document.getElementById("noteButton").classList.remove('noteButtonClicked');
            document.getElementById("eraseButton").classList.remove('noteButtonClicked');
            document.querySelectorAll('.numberButton').forEach(function(button) {
                button.classList.remove('noteButtonClicked');
            });
            document.getElementById('noteMessage').style.display = 'none';
        }
        document.getElementById("noteButton").disabled = true; // Disable the note button
    }
}

// Highlight peer cells and cells with the same value
function Fun_Peers_And_Equals(selectedCell, rowIndex, colIndex){
    if (size == 4){
        allCells.forEach(c => {// Highlight peer cells
            cRowIndex = c.getAttribute("pos_i");
            cColIndex = c.getAttribute("pos_j");
            if ((cRowIndex === rowIndex || cColIndex === colIndex || (Math.floor(cRowIndex / 2) === Math.floor(rowIndex / 2) && Math.floor(cColIndex /2) === Math.floor(colIndex / 2))) && 
                (c !== selectedCell) && (c.classList.contains("incorrect") === false)) {
                c.classList.add("peerCells");
            }
        });
    }
    else if (size == 6){
        allCells.forEach(c => {// Highlight peer cells
            cRowIndex = c.getAttribute("pos_i");
            cColIndex = c.getAttribute("pos_j");
            if ((cRowIndex === rowIndex || cColIndex === colIndex || (Math.floor(cRowIndex / 2) === Math.floor(rowIndex / 2) && Math.floor(cColIndex / 3) === Math.floor(colIndex / 3))) && 
                (c !== selectedCell) && (c.classList.contains("incorrect") === false)) {
                c.classList.add("peerCells");
            }
        });
    }
    else if (size == 9){
        allCells.forEach(c => {// Highlight peer cells
            cRowIndex = c.getAttribute("pos_i");
            cColIndex = c.getAttribute("pos_j");
            if ((cRowIndex === rowIndex || cColIndex === colIndex || (Math.floor(cRowIndex / 3) === Math.floor(rowIndex / 3) && Math.floor(cColIndex / 3) === Math.floor(colIndex / 3))) && 
                (c !== selectedCell) && (c.classList.contains("incorrect") === false)) {
                c.classList.add("peerCells");
            }
        });
    }

    allCells.forEach(c => {// Highlight cells with the same value
        if ((c.textContent === selectedCell.textContent) && (c !== selectedCell) && (c.textContent !== "") && (c.classList.contains("incorrect") === false)) {
            c.classList.remove("peerCells");
            c.classList.add("cellsWithSameValue");
        }
    });
}            


/////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS
/////////////////////////////////////////////////////////////////////////////////////////////////////            

// Add event listeners to detect when the cells are clicked
document.addEventListener("click", function (event) { 
    if ((event.target.classList.contains("cell4")) || (event.target.classList.contains("cell6")) || (event.target.classList.contains("cell9"))) {
        selectedCell = event.target;
        let rowIndex = selectedCell.getAttribute("pos_i");
        let colIndex = selectedCell.getAttribute("pos_j");
        allCells.forEach(c => { // Remove the highlighting from all cells
            c.classList.remove("cellsWithSameValue", "selected", "peerCells");
        });
        if(selectedCell.classList.contains("incorrect") == false){ 
            selectedCell.classList.add("selected");}// Highlight the selected cell in dark blue
        Fun_Enable_Disable_Buttons(selectedCell.editableStatus != 0); //cells that cannot be edited
        Fun_Peers_And_Equals(selectedCell, rowIndex, colIndex); // Highlight peer cells and cells with the same value
    }
});

// Add event listener to detect when the numbered buttons are clicked
document.querySelectorAll(".numberButton").forEach(button => {button.addEventListener("click", function () {
    if (selectedCell) {
        if(noteMode){ // If note mode is enabled, the note is added to the cell
            Fun_Handle_Note_Mode(button.textContent);
        }
        else{ // If note mode is disabled, the number is added to the cell
                selectedCell.textContent = button.textContent;
                rowIndex = selectedCell.getAttribute("pos_i");
                colIndex = selectedCell.getAttribute("pos_j");
                puzzle[rowIndex][colIndex] = parseInt(button.textContent);
                allCells.forEach(c => {c.classList.remove("cellsWithSameValue", "selected", "peerCells");}); // Remove the highlighting from the wrong cells
                Fun_Peers_And_Equals(selectedCell, rowIndex, colIndex); // Highlight the correct peer cells and cells with the same value
                if ((solvedPuzzle[rowIndex][colIndex] != selectedCell.textContent) && (selectedCell.textContent != "")) {  //if the value in the cell is incorrect, the cell becomes red
                    selectedCell.classList.remove("selected");
                    selectedCell.classList.add("incorrect");
                }
                else {//if the value in the cell is correct, the cell becomes green and the selected cell is disabled
                    selectedCell.classList.remove("incorrect");
                    selectedCell.classList.add("correct");
                    selectedCell.classList.add("selected");
                    selectedCell.editableStatus = 0;
                    Fun_Enable_Disable_Buttons(false);
                    goalCorrect--;
                    Fun_Check_Game_Over(); // Check if the game is over
                }
            }
        } 
    });
});

// Add event listener to detect when the erase button is clicked
document.getElementById("eraseButton").addEventListener("click", function() { 
    if (selectedCell) {
        selectedCell.textContent = "";
        rowIndex = selectedCell.getAttribute("pos_i");
        colIndex = selectedCell.getAttribute("pos_j");
        puzzle[rowIndex][colIndex] = 0;
        allCells.forEach(c => {c.classList.remove("incorrect", "correct", "cellsWithSameValue", "selected", "peerCells");}); // Remove the highlighting from the wrong cells
        Fun_Peers_And_Equals(selectedCell, rowIndex, colIndex); // Highlight the correct peer cells and cells with the same value
        selectedCell.classList.add("selected");
        }
});

// Restart, Rules Home and Back Buttons Event Listeners
document.addEventListener("click", function (event) {
    const target = event.target;
    switch(target.id){
        case ('confirmNo'):{ // Detects when the user clicks on the "No" button in the restart window
            document.getElementById('restartModal').style.display = 'none';
            document.getElementById('backModal').style.display = 'none';
            document.getElementById('homeModal').style.display = 'none';
            break;
        }
        case ('confirmYes'): { // Detects when the user clicks on the "Yes" button in the restart window
            if (modal == 1){
                document.getElementById('restartModal').style.display = 'none';
                main();
            }
            else if (modal == 2){
                document.getElementById('homeModal').style.display = 'none';
                window.location.href = "logicamente.html";
            }
            else if (modal == 3){
                document.getElementById('backModal').style.display = 'none';
                window.location.href = "sudoku_menu.html";
            }           
            break;
        }
        case ('restartButton'): { // Detects when the user clicks on the "Restart" button
            document.getElementById('restartModal').style.display = 'block';
            modal = 1;
            break;
        }
        case('homeButton'):{ // Detects when the user clicks on the home button
            document.getElementById('homeModal').style.display = 'block';
            modal = 2;
            break;
        }
        case('backButton'):{ // Detects when the user clicks on the home button
            document.getElementById('backModal').style.display = 'block';
            modal = 3;
            break;
        }
        case ('rulesButton'):{ // Detects when the user clicks on the rules button
            document.getElementById('rulesModal').style.display = 'block';
            break;
        }
        default: // Detects when the close button in clicken in a opened window
        {
            if (target.classList.contains('close')) { // Detects when the user clicks on a close button
                document.getElementById('rulesModal').style.display = 'none';
                document.getElementById('restartModal').style.display = 'none';
                document.getElementById('homeModal').style.display = 'none';
                document.getElementById('backModal').style.display = 'none';
            }
            else if (target == document.getElementById('restartModal') || target == document.getElementById('rulesModal') || 
                    target == document.getElementById('homeModal') || target == document.getElementById('backModal')) {
                target.style.display = 'none';
            }
        }
    }
}); 


/////////////////////////////////////////////////////////////////////////////////////////////////////
// MAIN FUNCTION
/////////////////////////////////////////////////////////////////////////////////////////////////////

function main(){
    let initialPuzzle = Fun_Generate_Random_Sudoku();
    puzzle = JSON.parse(JSON.stringify(initialPuzzle));
    console.log(puzzle, size, dificulty);
    solvedPuzzle = Fun_Solve_Sudoku(puzzle);
    document.querySelectorAll(".numberButton").forEach((button, index) => { //Disables the number buttons according to the size of the board
        if (index < size) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });
    Fun_Create_Sudoku_Board(puzzle);
    allCells = document.querySelectorAll(`.cell${size}`);
    Fun_Goal_Correct();
}
main();