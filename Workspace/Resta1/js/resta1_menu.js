let type = null;
document.getElementById("playButton").classList.add("active");

document.addEventListener("click", function (event) {
    switch(event.target.id){
        case ('homeButton'):{ // 
            window.location.href = "aluno_menu.html";
            break;
        }
        case('rulesButton'):{
            document.getElementById('rulesModal').style.display = 'block';
            break;
        }
        case ('standardButton'):{
            type = "standard_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("standardButton").classList.add("active");
            break;
        }
        case ('squareButton'):{
            type = "square_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("squareButton").classList.add("active");
            break;
        }
        case ('europeanButton'):{
            type = "european_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("europeanButton").classList.add("active");
            break;
        }
        case ('asymmetricButton'):{
            type = "asymmetric_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("asymmetricButton").classList.add("active");
            break;
        }
        case ('germanButton'):{
            type = "german_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("germanButton").classList.add("active");
            break;
        }
        case ('diamondButton'):{
            type = "diamond_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("diamondButton").classList.add("active");
            break;
        }
        case ('starButton'):{
            type = "star_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("starButton").classList.add("active");
            break;
        }
        case ('piramidButton'):{
            type = "piramid_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("piramidButton").classList.add("active");
            break;
        }
        case ('trapezoidButton'):{
            type = "trapezoid_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("trapezoidButton").classList.add("active");
            break;
        }
        case ('rhombusButton'):{
            type = "rhombus_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("rhombusButton").classList.add("active");
            break;
        }
        case ('snowButton'):{
            type = "snow_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("snowButton").classList.add("active");
            break;
        }
        case ('hexagonalButton'):{
            type = "hexagonal_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("hexagonalButton").classList.add("active");
            break;
        }
        case ('triangleButton'):{
            type = "triangle_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("triangleButton").classList.add("active");
            break;
        }
        case ('playButton'):{
            if (type != null){
                localStorage.setItem('type', type);
                window.location.href = "resta1_jogo.html?type=" + type;
            }
            else{
                alert("Selecione um tabuleiro antes de jogar!");
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