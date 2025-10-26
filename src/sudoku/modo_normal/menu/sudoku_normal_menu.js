var normalSudokuMenu;

class handlesButtonVisibility
{
    constructor() 
    {
        const numberButtons = document.querySelectorAll(".buttonGroup button");
        localStorage.setItem('style_sudoku', "numbers");
        localStorage.setItem('sudoku_peers', "true");  
        localStorage.setItem('sudoku_errors', "false");
        localStorage.setItem('size_sudoku', "0");
        localStorage.setItem('difficulty_sudoku', "0");
        this.sizeHints = 0;
        this.difficultyHints = 0;
    }

    /**
     * @param {string} [size]
     */
    sizeClick(size)
    {
        localStorage.setItem('size_sudoku', size);
        document.getElementById("4x4Button").classList.remove("active");
        document.getElementById("6x6Button").classList.remove("active");
        document.getElementById("9x9Button").classList.remove("active");
        if(size === '4')
        {
            this.sizeHints = 2;
            document.getElementById("4x4Button").classList.add("active");
            document.getElementById("mediumButton").classList.add("disabled");
            document.getElementById("hardButton").classList.add("disabled");
            this.dificultyClick('1');
        }
        else 
        {
            document.getElementById("mediumButton").classList.remove("disabled");
            document.getElementById("hardButton").classList.remove("disabled");
            if(size === '6')
            {
                this.sizeHints = 4;
                document.getElementById("6x6Button").classList.add("active");
            }
            else // 9
            {
                this.sizeHints = 8;
                document.getElementById("9x9Button").classList.add("active");
            }
        }        
    }

    /**
     * @param {string} size
     */
    dificultyClick(size)
    {
        localStorage.setItem('difficulty_sudoku', size);
        document.getElementById("easyButton").classList.remove("active");
        document.getElementById("mediumButton").classList.remove("active");
        document.getElementById("hardButton").classList.remove("active");
        if(size === '1')
        {
            this.difficultyHints = 2;
            document.getElementById("easyButton").classList.add("active");           
        }
        else if(size === '2')
        {
            this.difficultyHints = 4;
            document.getElementById("mediumButton").classList.add("active");
        }
        else // 3
        {
            this.difficultyHints = 6;
            document.getElementById("hardButton").classList.add("active");
        }
        
    }

    playClick()
    {
        if(localStorage.getItem("size_sudoku") == "0" && localStorage.getItem("difficulty_sudoku") == "0")
            document.getElementById('difficultyAndSizeModal').style.display = 'block';
        else if (localStorage.getItem("size_sudoku") == "0")
            document.getElementById('difficultyModal').style.display = 'block';
        else if(localStorage.getItem("difficulty_sudoku") == "0")
            document.getElementById('sizeModal').style.display = 'block';
        else
        {
            let availableHints = this.sizeHints + this.difficultyHints;
            localStorage.setItem('available_hints', availableHints.toString());
            
            window.location.href = "../jogo/sudoku_normal_jogo.html";
        }
    }
}
    
function main()
{
    normalSudokuMenu = new handlesButtonVisibility();
}

main();
