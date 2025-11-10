localStorage.clear();
let type_resta_learn = null;
let difficulty_resta1_learn = null;
document.getElementById("playButton").classList.add("active");

document.addEventListener("click", function (event) {
    switch(event.target.id){
        case ('homeButton'):{ // 
            window.location.href = "../../../logicamente/logicamente.html";
            break;
        }
        case ('backButton'):{ // 
            window.location.href = "../../menu/resta1_menu.html";
            break;
        }
        case('rulesButton'):{
            document.getElementById('rulesModal').style.display = 'block';
            break;
        }
        case ('ortogonalButton'):{
            type_resta_learn = "ortogonal";
            document.getElementById("diogonalButton").classList.remove("active");
            document.getElementById("ortogonalButton").classList.add("active");
            break;
        }
        case ('diogonalButton'):{
            type_resta_learn = "diagonal";
            document.getElementById("ortogonalButton").classList.remove("active");
            document.getElementById("diogonalButton").classList.add("active");
            break;
        }

        case ('easyButton'):{
            difficulty_resta1_learn = "easy";
            document.getElementById("hardButton").classList.remove("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("easyButton").classList.add("active");
            break;
        }
        case ('mediumButton'):{
            difficulty_resta1_learn = "medium";
            document.getElementById("easyButton").classList.remove("active");
            document.getElementById("hardButton").classList.remove("active");
            document.getElementById("mediumButton").classList.add("active");
            break;
        }
        case ('hardButton'):{
            difficulty_resta1_learn = "hard";
            document.getElementById("easyButton").classList.remove("active");
            document.getElementById("mediumButton").classList.remove("active");
            document.getElementById("hardButton").classList.add("active");
            break;
        }

        case ('playButton'):{
            if (type_resta_learn == null && difficulty_resta1_learn == null)
                document.getElementById('typeAndDifficultyModal').style.display = 'block';
            else if (difficulty_resta1_learn == null)
                document.getElementById('difficultyModal').style.display = 'block';
            else if (type_resta_learn == null)
                document.getElementById('typeModal').style.display = 'block';
            else
            {
                localStorage.setItem('type', type_resta_learn);
                localStorage.setItem('difficulty', difficulty_resta1_learn);
                window.location.href = "../jogo/resta1_aprendizagem_jogo.html";
            }
            break;
        }
        default: // Detects when the close button in clicken in a opened window
        {
            if (event.target.classList.contains('close')) { // Detects when the user clicks on a close button
                document.getElementById('rulesModal').style.display = 'none';
                document.getElementById('boardModal').style.display = 'none';
            }
            else if (event.target == document.getElementById('rulesModal') || event.target == document.getElementById('boardModal')) { // Detects when the user clicks outside the modal
                event.target.style.display = 'none';
            }
        }
    }
});