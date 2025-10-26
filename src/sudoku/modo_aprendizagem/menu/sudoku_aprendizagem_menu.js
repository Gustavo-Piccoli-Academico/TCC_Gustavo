var menuAprendizagem;

class SudokuAprendizagemMenu{
    constructor() 
    {
        localStorage.clear();
        localStorage.setItem("selectedOption", '0');
        localStorage.setItem("selectedSize", '0');
        localStorage.setItem('style_sudoku', "numbers");
        localStorage.setItem('sudoku_errors', "false");
        localStorage.setItem('hints_sudoku', "0");
    }
    
    /**
     * @param {string} buttonId
     */
    clickOptionButton(buttonId) 
    {
        localStorage.setItem("selectedOption", buttonId);
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
        localStorage.setItem("selectedSize", buttonId);
        const sizeButtons = document.querySelectorAll(".numberButtonGroupButton");
        sizeButtons.forEach((button) => {
            button.classList.remove("active");
        });
        document.getElementById(buttonId).classList.add("active");
    }

    calculateHints() {
        const selectedSize = localStorage.getItem("selectedSize");
        const selectedOption = localStorage.getItem("selectedOption");
        if(selectedOption === '1' || selectedOption === '2' || selectedOption === '3') 
        {
            if(selectedSize !== 'c') // 4 ou 6
                localStorage.setItem('hints_sudoku', '0');
            else // 9
                localStorage.setItem('hints_sudoku', '1');
            return
        }

        if(selectedOption === '4' || selectedOption === '5' || selectedOption === '6') 
        {
            if(selectedSize === 'a')
                localStorage.setItem('hints_sudoku', '1');
            else if(selectedSize === 'b')
                localStorage.setItem('hints_sudoku', '2');
            else if(selectedSize === 'c')
                localStorage.setItem('hints_sudoku', '3');
        }
        else // selectedOption === '7'
        {
            if(selectedSize === 'a')
                localStorage.setItem('hints_sudoku', '2');
            else if(selectedSize === 'b')
                localStorage.setItem('hints_sudoku', '3');
            else if(selectedSize === 'c')
                localStorage.setItem('hints_sudoku', '4');
        }
    }

    clickPlayButton() {
        const selectedSize = localStorage.getItem("selectedSize");
        const selectedOption = localStorage.getItem("selectedOption");
        if (selectedSize == '0' && selectedOption == '0') 
            document.getElementById('difficultyAndSizeModal').style.display = 'block';
        else if (selectedSize == '0') 
            document.getElementById('sizeModal').style.display = 'block';
        else if (selectedOption == '0') 
            document.getElementById('difficultyModal').style.display = 'block';
        else
        {
            this.calculateHints();
            window.location.href = "../jogo/sudoku_aprendizagem_jogo.html";
        }
    }
}


function main(){
    menuAprendizagem = new SudokuAprendizagemMenu();
}

main();