// Global Variables
const type = localStorage.getItem("type");
let container = document.getElementById("boardContainer");
let matrix = null;

let first_selected = false;
let first_position = [];
let first_piece = null;

let modal = 0;
let valid_moves = [];
let is_diagonal = false;
let diagonals = ["star_matrix", "piramid_matrix", "trapezoid_matrix", "rhombus_matrix", "snow_matrix", "hexagonal_matrix", "triangle_matrix"];

// Function to get the matrix shape based on its type
function Matrix_Shape() {
    let matrix = null;
    const matrices = {
        standard_matrix: [
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0]
        ],
        square_matrix: [
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1]
        ],
        european_matrix: [
            [0, 0, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 2, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 0, 0]
        ],
        asymmetric_matrix: [
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0]
        ],
        german_matrix: [
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 2, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0]
        ],
        diamond_matrix: [
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 2, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0]
        ],
        star_matrix: [
            [3, 3, 3, 2, 3, 3, 3],
            [1, 3, 1, 3, 1, 3, 1],
            [3, 1, 3, 1, 3, 1, 3], 
            [1, 3, 1, 3, 1, 3, 1],
            [3, 3, 3, 1, 3, 3, 3]
        ],
        piramid_matrix: [
            [3, 3, 3, 3, 2, 3, 3, 3, 3],
            [3, 3, 3, 1, 3, 1, 3, 3, 3],
            [3, 3, 1, 3, 1, 3, 1, 3, 3],
            [3, 1, 3, 1, 3, 1, 3, 1, 3],
            [1, 3, 1, 3, 1, 3, 1, 3, 1]
        ],
        trapezoid_matrix: [
            [3, 3, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3],
            [3, 3, 2, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3],  
            [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1]
        ],
        rhombus_matrix: [
            [0, 3, 0, 3, 2, 3, 1, 3, 1, 3, 1, 3, 1],
            [3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0],  
            [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3],
            [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0]
        ],
        snow_matrix: [
            [0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0],
            [3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3],
            [0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0],
            [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [1, 3, 1, 3, 1, 3, 1, 3, 2, 3, 1, 3, 1, 3, 1, 3, 1],
            [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0],
            [3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3],
            [0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0]
        ],
        hexagonal_matrix: [
            [0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0],
            [3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3],
            [0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0],
            [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [1, 3, 1, 3, 1, 3, 1, 3, 2, 3, 1, 3, 1, 3, 1, 3, 1],
            [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0],
            [3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3],
            [0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0]
        ],
        triangle_matrix: [
            [3, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 3, 3, 3], 
            [3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3], 
            [3, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 3, 3, 3], 
            [3, 3, 3, 3, 3, 1, 3, 2, 3, 1, 3, 3, 3, 3, 3], 
            [3, 3, 3, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 3], 
            [3, 3, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3], 
            [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1], 
            [3, 1, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 1, 3]
        ]
    }
    matrix = matrices[type] || null;
    return matrix;
}

// Function to create the board
function Create_Board() {
    if (diagonals.includes(type)) {
        is_diagonal = true;
    }
    let numRows = matrix.length;
    let numCols = Math.max(...matrix.map(r => r.length));
    boardContainer.innerHTML = "";
    let boardSize = boardContainer.clientWidth; // Get the size of the container
    
    let cellSize = null;
    if (!is_diagonal){
        cellSize = Math.floor(boardSize / Math.max(numRows, numCols)) - 10; // Calculate the size of the cells
    }
    else{
        switch(type){
            case "star_matrix":
                cellSize = Math.floor(boardSize / Math.max(numRows, numCols)) * 1.3;
                break;
            case "piramid_matrix":
                cellSize = Math.floor(boardSize / Math.max(numRows, numCols)) * 1.7;
                break;
            case "trapezoid_matrix":
                cellSize = Math.floor(boardSize / Math.max(numRows, numCols)) * 1.7;
                break;
            case "rhombus_matrix":
                cellSize = Math.floor(boardSize / Math.max(numRows, numCols)) * 1.7;
                break;
            case "snow_matrix":
                cellSize = Math.floor(boardSize / Math.max(numRows, numCols)) * 1.7;
                break;
            case "hexagonal_matrix":
                cellSize = Math.floor(boardSize / Math.max(numRows, numCols)) * 1.7;
                break;
            case "triangle_matrix":
                cellSize = Math.floor(boardSize / Math.max(numRows, numCols)) * 1.7;
                break;
        }
    }

    for (let i = 0; i < numRows; i++) {
        let row = document.createElement("div"); // Create a row
        row.classList.add(`board-row`);

        for (let j = 0; j < numCols; j++) {
            const value = matrix[i][j];            
            let cell = document.createElement("div");
            cell.classList.add(`cell`);
            cell.setAttribute("pos_i", i);
            cell.setAttribute("pos_j", j);
            cell.setAttribute("value", value);
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.style.lineHeight = `${cellSize}px`;
            cell.style.fontSize = `${cellSize * 0.4}px`;
            if (value == 0) { // Check if the position is disabled
                cell.classList.add("square", "disabled");
            } 
            else if (value == 2) { // Check if the position is the empty one
                cell.classList.add("square", "empty");
            } 
            else if (value == 1){ //If the position is a pin, the turns on the click event listener
                cell.classList.add("square", "active");
            }
            if (value != 3){
                row.appendChild(cell);
            }
        }
        boardContainer.appendChild(row); // Adds the row to the board
        row++;
    }
}

// Function to check if the vertical or horizontal move is valid
function Valid_Normal_Moves(rowIndex, colIndex) {
    let adjacent = [];
    
    // Right
    if (rowIndex < matrix[0].length - 2 && matrix[colIndex][rowIndex + 1] == 1 && matrix[colIndex][rowIndex + 2] == 2) {
        adjacent.push([colIndex, rowIndex + 2, "right"]);
    } 

    // Left
    if (rowIndex - 2 >= 0 && matrix[colIndex][rowIndex - 1] == 1 && matrix[colIndex][rowIndex - 2] == 2) {
        adjacent.push([colIndex, rowIndex - 2, "left"]); 
    } 

    // Up
    if (colIndex - 2 >= 0 && matrix[colIndex - 1][rowIndex] == 1 && matrix[colIndex - 2][rowIndex] == 2) {
        adjacent.push([colIndex - 2, rowIndex, "up"]);
    }
    
    // Down
    if (colIndex < matrix.length - 2 && matrix[colIndex + 1][rowIndex] == 1 && matrix[colIndex + 2][rowIndex] == 2) {
        adjacent.push([colIndex + 2, rowIndex, "down"]);
    }
    return adjacent;
}

// Function to check if the horizontal or diagonal move is valid
function Valid_Diagonal_Moves(rowIndex, colIndex) {
    let adjacent = [];
    
    // Right
    if (rowIndex < matrix[0].length - 4 && matrix[colIndex][rowIndex + 2] == 1 && matrix[colIndex][rowIndex + 4] == 2) {
        adjacent.push([colIndex, rowIndex + 4, "right"]);
    } 

    // Left
    if (rowIndex - 4 >= 0 && matrix[colIndex][rowIndex - 2] == 1 && matrix[colIndex][rowIndex - 4] == 2) {
        adjacent.push([colIndex, rowIndex - 4, "left"]); 
    } 

    // Up Right
    if (colIndex - 2 >= 0 && rowIndex < matrix[0].length - 2 && matrix[colIndex - 1][rowIndex + 1] == 1 && matrix[colIndex - 2][rowIndex + 2] == 2) {
        adjacent.push([colIndex - 2, rowIndex + 2, "upRight"]);
    }

    // Up Left
    if (colIndex - 2 >= 0 && rowIndex - 2 >= 0 && matrix[colIndex - 1][rowIndex - 1] == 1 && matrix[colIndex - 2][rowIndex - 2] == 2) {
        adjacent.push([colIndex - 2, rowIndex - 2, "upLeft"]);
    }

    // Down Right
    if (colIndex < matrix.length - 2 && rowIndex < matrix[0].length - 2 && matrix[colIndex + 1][rowIndex + 1] == 1 && matrix[colIndex + 2][rowIndex + 2] == 2) {
        adjacent.push([colIndex + 2, rowIndex + 2, "downRight"]);
    }

    // Down Left
    if (colIndex < matrix.length - 2 && rowIndex - 2 >= 0 && matrix[colIndex + 1][rowIndex - 1] == 1 && matrix[colIndex + 2][rowIndex - 2] == 2) {
        adjacent.push([colIndex + 2, rowIndex - 2, "downLeft"]);
    }
    return adjacent;
}

// Add event listener to detect when a piece is clicked
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("square") && event.target.classList.contains("active")) {
        if (first_piece){
            first_piece.classList.remove("selected");
            first_selected = false
            first_piece = null;
            first_position = [];
            valid_moves = [];
        }
        first_piece = event.target;
        let colIndex = parseInt(first_piece.getAttribute("pos_i"));
        let rowIndex = parseInt(first_piece.getAttribute("pos_j"));
        if (!is_diagonal) {
                valid_moves = Valid_Normal_Moves(rowIndex, colIndex);
        }
        else{
            valid_moves = Valid_Diagonal_Moves(rowIndex, colIndex);
        }
        first_piece.classList.add("selected");
        first_position = [colIndex, rowIndex];
        first_selected = true;
    }
    else if (first_selected && event.target.classList.contains("square") && event.target.classList.contains("empty")){
        let second_piece = event.target;
        let colIndex = parseInt(second_piece.getAttribute("pos_i"));
        let rowIndex = parseInt(second_piece.getAttribute("pos_j"));
        for (let i = 0; i < valid_moves.length; i++){
            if (valid_moves[i][0] == colIndex && valid_moves[i][1] == rowIndex){
                
                first_piece.classList.remove("active");
                first_piece.classList.remove("selected");
                first_piece.classList.add("empty");
                first_piece.setAttribute("value", 2);

                second_piece.classList.remove("empty");
                second_piece.classList.add("active");
                second_piece.setAttribute("value", 1);

                let midRow = (Math.floor(first_position[0] + colIndex)) / 2;
                let midCol = (Math.floor(first_position[1] + rowIndex)) / 2;
                let midlle_piece = document.querySelector(`.cell[pos_i="${midRow}"][pos_j="${midCol}"]`);
                midlle_piece.classList.remove("active");
                midlle_piece.classList.add("empty");
                midlle_piece.setAttribute("value", 2);

                matrix[first_position[0]][first_position[1]] = 2; 
                matrix[colIndex][rowIndex] = 1; 
                matrix[midRow][midCol] = 2;
                
                first_selected = false;
                first_position = [];
                first_piece = null;
                valid_moves = [];
                break;
            }
        }
        if (Check_Win()){
            document.getElementById('winModal').style.display = 'block';
            modal = 4;
        }
        else if (Check_Lose()){
            document.getElementById('loseModal').style.display = 'block';
            modal = 4;
        } 
    }
    else{
        if (first_piece){
            first_piece.classList.remove("selected");
        }
        first_selected = false
        first_piece = null;
        first_position = [];
        valid_moves = [];
    }
});

//Checks if there is only one piece left
function Check_Win(){
    let win = 0;
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[i].length; j++){
            if (matrix[i][j] == 1){
                win++;
            }
        }
    }
    if (win == 1){
        return true;
    }
    else{
        return false;
    }
}

//Corrigir
function Check_Lose(){ //Corrigir
    let aux = 0;
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] == 1){
                if(is_diagonal){
                    valid_moves = Valid_Diagonal_Moves(j, i);
                }
                else{
                    valid_moves = Valid_Normal_Moves(j, i);
                }
                if (valid_moves.length > 0){
                    aux++;
                }
            }
        }  
    }
    if (aux != 0){
        return false;
    }
    else{
        return true;
    }
}
// Restart, Rules Home and Back Buttons Event Listeners
document.addEventListener("click", function (event) {
    const target = event.target;
    switch(target.id){
        case ('confirmNo'):{ // Detects when the user clicks on the "No" button in the restart window
            if (modal == 4){ //menu
                document.getElementById('winModal').style.display = 'none';
                document.getElementById('loseModal').style.display = 'none';
                window.location.href = "../menu/resta1_menu.html";
            }
            else{
                document.getElementById('restartModal').style.display = 'none';
                document.getElementById('backModal').style.display = 'none';
                document.getElementById('homeModal').style.display = 'none';
            }
            break;
        }
        case ('confirmYes'): { // Detects when the user clicks on the "Yes" button in the restart window
            if (modal == 1){
                document.getElementById('restartModal').style.display = 'none';
                main();
            }
            else if (modal == 2){
                document.getElementById('homeModal').style.display = 'none';
                window.location.href = "../../logicamente/logicamente.html";
            }
            else if (modal == 3){
                document.getElementById('backModal').style.display = 'none';
                window.location.href = "../menu/resta1_menu.html";
            }
            else if (modal == 4){//Restart
                document.getElementById('winModal').style.display = 'none';
                document.getElementById('loseModal').style.display = 'none';
                main();
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

function main(){
    matrix = Matrix_Shape();
    Create_Board();
}

main();

