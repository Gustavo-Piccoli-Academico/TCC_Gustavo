localStorage.clear();
let size_sudoku = 0;
let difficulty_sudoku = 0;
let sizeHints = 0;
let difficultyHints = 0;
document.getElementById("playButton").classList.add("active");

document.addEventListener("click", function (event) {
    switch(event.target.id){
        case ('4x4Button'):{ // 
            size_sudoku = 4;
            difficulty_sudoku = 1;
            sizeHints = 2;
            difficultyHints = 0;
            document.getElementById("6x6Button").classList.remove("active");
            document.getElementById("9x9Button").classList.remove("active");
            document.getElementById("4x4Button").classList.add("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("hardButton").classList.remove("active");
            document.getElementById("mediumButton").disabled = true;
            document.getElementById("hardButton").disabled = true;
            document.getElementById("easyButton").classList.add("active");
            break;
        }
        case ('6x6Button'):{ // 
            size_sudoku = 6;
            sizeHints = 4;
            document.getElementById("4x4Button").classList.remove("active");
            document.getElementById("9x9Button").classList.remove("active");
            document.getElementById("6x6Button").classList.add("active");
            document.getElementById("mediumButton").classList.remove("no-hover");
            document.getElementById("hardButton").classList.remove("no-hover");
            document.getElementById("mediumButton").disabled = false;
            document.getElementById("hardButton").disabled = false;
            break;
        }
        case ('9x9Button'):{ // 
            size_sudoku = 9;
            sizeHints = 6;
            document.getElementById("4x4Button").classList.remove("active");
            document.getElementById("6x6Button").classList.remove("active");
            document.getElementById("9x9Button").classList.add("active");
            document.getElementById("mediumButton").classList.remove("no-hover");
            document.getElementById("hardButton").classList.remove("no-hover");
            document.getElementById("mediumButton").disabled = false;
            document.getElementById("hardButton").disabled = false;
            break;
        }
        case ('easyButton'):{ // 
            difficulty_sudoku = 1;
            difficultyHints = 0;
            document.getElementById("easyButton").classList.add("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("hardButton").classList.remove("active");
            break;
        }
        case ('mediumButton'):{ // 
            difficulty_sudoku = 2;
            difficultyHints = 2;
            document.getElementById("easyButton").classList.remove("active");
            document.getElementById("mediumButton").classList.add("active");
            document.getElementById("hardButton").classList.remove("active");
            break;
        }
        case ('hardButton'):{ // 
            difficulty_sudoku = 3;
            difficultyHints = 4;
            document.getElementById("easyButton").classList.remove("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("hardButton").classList.add("active");
            break;
        }
        case ('playButton'):{
            if(size_sudoku == 0){
                document.getElementById('sizeModal').style.display = 'block';
            }
            else if (difficulty_sudoku == 0){
                document.getElementById('difficultyModal').style.display = 'block';
            }
            else{
                const availableHints = sizeHints + difficultyHints;
                localStorage.setItem('available_hints', availableHints.toString());
                localStorage.setItem('difficulty_sudoku', difficulty_sudoku.toString());
                localStorage.setItem('size_sudoku', size_sudoku.toString());
                localStorage.setItem('sudoku_peers', "true");
                localStorage.setItem('sudoku_errors', "false");
                localStorage.setItem('style_sudoku', "numbers");
                window.location.href = "../jogo/sudoku_aprendizagem_jogo.html";
            }
            break;
        }
        default: // Detects when the close button in clicken in a opened window
        {
        }
    }
});


