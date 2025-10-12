localStorage.clear();
let size_sudoku = 0;
let dificulty_sudoku = 0;
document.getElementById("playButton").classList.add("active");

document.addEventListener("click", function (event) {
    switch(event.target.id){
        case ('4x4Button'):{ // 
            size_sudoku = 4;
            dificulty_sudoku = 1;
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
            dificulty_sudoku = 1;
            document.getElementById("easyButton").classList.add("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("hardButton").classList.remove("active");
            break;
        }
        case ('mediumButton'):{ // 
            dificulty_sudoku = 2;
            document.getElementById("easyButton").classList.remove("active");
            document.getElementById("mediumButton").classList.add("active");
            document.getElementById("hardButton").classList.remove("active");
            break;
        }
        case ('hardButton'):{ // 
            dificulty_sudoku = 3;
            document.getElementById("easyButton").classList.remove("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("hardButton").classList.add("active");
            break;
        }
        case ('playButton'):{
            if(size_sudoku == 0){
                document.getElementById('sizeModal').style.display = 'block';
            }
            else if (dificulty_sudoku == 0){
                document.getElementById('dificultyModal').style.display = 'block';
            }
            else{
                localStorage.setItem('dificulty_sudoku', dificulty_sudoku.toString());
                localStorage.setItem('size_sudoku', size_sudoku.toString());
                localStorage.setItem('showPeers', true.toString());
                window.location.href = "../jogo/sudoku_jogo.html";
            }
            break;
        }
        default: // Detects when the close button in clicken in a opened window
        {
        }
    }
});


