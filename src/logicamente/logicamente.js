localStorage.clear();

document.getElementById("sudokuButton").addEventListener("click", function() {
    window.location.href = "../sudoku/menu/sudoku_menu.html"; // Redireciona para a página Sudoku
});

document.getElementById("resta1Button").addEventListener("click", function() {
    window.location.href = "../resta1/menu/resta1_menu.html"; // Redireciona para a página resta 1
});

document.getElementById("tangramButton").addEventListener("click", function() {
    window.location.href = "../tangram/menu/tangram_menu.html"; // Redireciona para a página tangram
});
