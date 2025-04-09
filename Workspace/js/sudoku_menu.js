let size = 0;
let dificulty = 0;
document.getElementById("playButton").classList.add("active");

document.addEventListener("click", function (event) {
    switch(event.target.id){
        case ('homeButton'):{ // 
            window.location.href = "logicamente.html";
            break;
        }
        case('rulesButton'):{
            document.getElementById('rulesModal').style.display = 'block';
            break;
        }
        case ('4x4Button'):{ // 
            size = 4;
            dificulty = 1;
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
            size = 6;
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
            size = 9;
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
            dificulty = 1;
            document.getElementById("easyButton").classList.add("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("hardButton").classList.remove("active");
            break;
        }
        case ('mediumButton'):{ // 
            dificulty = 2;
            document.getElementById("easyButton").classList.remove("active");
            document.getElementById("mediumButton").classList.add("active");
            document.getElementById("hardButton").classList.remove("active");
            break;
        }
        case ('hardButton'):{ // 
            dificulty = 3;
            document.getElementById("easyButton").classList.remove("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("hardButton").classList.add("active");
            break;
        }
        case ('playButton'):{
            if((size == 0) && (dificulty == 0)){
                alert("Selecione um tamanho e uma dificuldade para jogar!");
            }
            else if(size == 0){
                alert("Selecione um tamanho para jogar!");
            }
            else if (dificulty == 0){
                alert("Selecione uma dificuldade para jogar!");
            }
            else{
                localStorage.setItem('dificulty', dificulty);
                localStorage.setItem('size', size);
                window.location.href = "sudoku_jogo.html";
            }
            break;
        }
        default: // Detects when the close button in clicken in a opened window
        {
            if (event.target.classList.contains('close')) { // Detects when the user clicks on a close button
                document.getElementById('rulesModal').style.display = 'none';
            }
            else if (event.target == document.getElementById('rulesModal')) {
                event.target.style.display = 'none';
            }
        }
    }
});


