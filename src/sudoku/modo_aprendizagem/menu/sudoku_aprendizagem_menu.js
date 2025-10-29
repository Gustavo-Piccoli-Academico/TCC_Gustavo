var menuAprendizagem;

class SudokuAprendizagemMenu{
    constructor() 
    {
        localStorage.clear();
        localStorage.setItem("board_type", '0');
        localStorage.setItem("size_sudoku", '0');
        localStorage.setItem('style_sudoku', "numbers");
        localStorage.setItem('sudoku_errors', "false");
        localStorage.setItem('available_hints', "0");
    }
    
    /**
     * @param {string} buttonId
     */
    clickOptionButton(buttonId) 
    {
        localStorage.setItem("board_type", buttonId);
        const puzzleButtons = document.querySelectorAll(".buttonGroupButton");
        puzzleButtons.forEach((button) => {
            button.classList.remove("active");
        });
        document.getElementById(buttonId).classList.add("active");
    }
    
    /**
     * @param {string} buttonId
     */
    clickSizeButton(buttonId) 
    {
        localStorage.setItem("size_sudoku", buttonId);
        const sizeButtons = document.querySelectorAll(".numberButtonGroupButton");
        sizeButtons.forEach((button) => {
            button.classList.remove("active");
        });
        document.getElementById(buttonId).classList.add("active");
    }

    calculateHintsAndRemovedCells() {
        const selectedSize = localStorage.getItem("size_sudoku");
        const selectedOption = localStorage.getItem("board_type");
        if(selectedOption === '1' || selectedOption === '2' || selectedOption === '3') 
        {
            localStorage.setItem('removed_cells', '2');
            localStorage.setItem('available_hints', '1');
            return
        }

        if(selectedOption === '4' || selectedOption === '5' || selectedOption === '6') 
        {
            if(selectedSize === 'a')
            {
                localStorage.setItem('removed_cells', '2');
                localStorage.setItem('available_hints', '1');
            }
            else if(selectedSize === 'b')
            {
                localStorage.setItem('removed_cells', '3');
                localStorage.setItem('available_hints', '1');
            }
            else if(selectedSize === 'c')
            {   
                localStorage.setItem('removed_cells', '4');
                localStorage.setItem('available_hints', '2');
            }
        }

        else // selectedOption === '7'
        {
            if(selectedSize === 'a')
            {
                localStorage.setItem('removed_cells', '3');
                localStorage.setItem('available_hints', '1');
            }
            else if(selectedSize === 'b')
            {
                localStorage.setItem('removed_cells', '4');
                localStorage.setItem('available_hints', '2');
            }
            else if(selectedSize === 'c')
            {
                localStorage.setItem('removed_cells', '6');
                localStorage.setItem('available_hints', '3');
            }
        }
    }

    clickPlayButton() {
        const selectedSize = localStorage.getItem("size_sudoku");
        const selectedOption = localStorage.getItem("board_type");
        if (selectedSize == '0' && selectedOption == '0') 
            document.getElementById('difficultyAndSizeModal').style.display = 'block';
        else if (selectedSize == '0') 
            document.getElementById('sizeModal').style.display = 'block';
        else if (selectedOption == '0') 
            document.getElementById('difficultyModal').style.display = 'block';
        else
        {
            this.calculateHintsAndRemovedCells();
            window.location.href = "../jogo/sudoku_aprendizagem_jogo.html";
        }
    }
}


function main(){
    menuAprendizagem = new SudokuAprendizagemMenu();
}

main();