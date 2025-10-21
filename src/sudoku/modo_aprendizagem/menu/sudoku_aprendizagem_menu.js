localStorage.clear();
let size_sudoku = 0;
let difficulty_sudoku = 0;
let sizeHints = 0;
let difficultyHints = 0;

/**
 * @param {string} buttonId
 */
function clickButton(buttonId) {
    if(buttonId === "4" || buttonId === "6" || buttonId === "9"){
        localStorage.setItem("selectedSize", buttonId);
        const numberButtons = document.querySelectorAll(".numberButtonGroupButton");
        numberButtons.forEach((button) => {
            if (button.id !== buttonId)
                button.classList.remove("active");
            else
                button.classList.add("active");
        });
        return;
    }

    if(buttonId === "playButton"){
        console.log("Play button clicked");
        const selectedSize = localStorage.getItem("selectedSize");
        if (!selectedSize) {
            document.getElementById('sizeModal').style.display = 'block';
            return;
        }
        // Verifica se o usuário selecionou um modo de aprendizagem
        const selectedOption = localStorage.getItem("selectedOption");
        if (!selectedOption) {
            document.getElementById('difficultyModal').style.display = 'block';
            return;
        }
        window.location.href = "../jogo/sudoku_aprendizagem_jogo.html";
        return;
    }

    localStorage.setItem("selectedOption", buttonId);
    const puzzleButtons = document.querySelectorAll(".buttonGroupButton");
    puzzleButtons.forEach((button) => {
        if (button.id !== buttonId)
            button.classList.remove("active");
        else
            button.classList.add("active");
    });


    
}